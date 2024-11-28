import { resolve } from "node:path/posix";
import { normalizePath, type Plugin } from "vite";
import type { StorybookFrameworkName } from "../../../storybook-env";
import { createComponentDescription } from "./description";
import { createLinkMap } from "./linkify";
import { createTSProgram } from "./tsc";
import {
  analyzeComponentFile,
  collectComponentAttributeMetadata,
  formatAnalyzerResultToMarkdown,
} from "./wca";

/**
 * Loader plugin for `#storybook-framework`. \
 * Resolves a code that loads `metadata` from `frameworkPath` and export it with component description loaded from the component file.
 *
 * @param framework Framework name. Can be `"web-components"` or `"react"`.
 * @param frameworkPath Actual path for framework-specific exports. (e.g. `./framework-wc`)
 * @returns A plugin
 */
export function storybookFrameworkLoader(
  framework: StorybookFrameworkName,
  frameworkPath: string
): Plugin {
  const projectDir = resolve(import.meta.dirname, "../../..");
  let program = createTSProgram(projectDir);
  let linkMapPromise = createLinkMap(projectDir);

  return {
    name: "storybook-docs-loader",
    resolveId(id, importer) {
      if (id !== "#storybook-framework" || !importer) {
        return;
      }

      // e.g. "<dir>/stories/daikin-button.stories.ts?storybookMetadata"
      return `${importer}?storybookMetadata`;
    },
    async load(id) {
      if (!id.endsWith("?storybookMetadata")) {
        return;
      }

      // get storybook filepath ("<dir>/stories/daikin-button.stories.ts")
      const storiesId = normalizePath(id.replace("?storybookMetadata", ""));
      // extract basename ("<dir>/stories/daikin-button.stories.ts" -> "daikin-button")
      const basename = storiesId
        .replace(/.*\//, "")
        .replace(/\.stories.tsx?$/, "");
      // get component filepath ("<dir>/daikin-button.ts")
      const componentFilepath = resolve(storiesId, "../..", `${basename}.ts`);
      // analyze component using web-component-analyzer (wca)
      const analyzerResult = analyzeComponentFile(
        componentFilepath,
        program,
        this.warn.bind(this)
      );
      // render analysis result to markdown
      const wcaMarkdown = analyzerResult
        ? formatAnalyzerResultToMarkdown(program, analyzerResult)
        : "";
      // adjust the rendered markdown for Storybook
      const componentDescription = createComponentDescription(
        wcaMarkdown,
        await linkMapPromise,
        [basename]
      );

      // create a map of attributes and types using analysis result
      const componentAttributeMetadataMap = analyzerResult
        ? collectComponentAttributeMetadata(analyzerResult)
        : {};
      const ddsMetadata = {
        componentAttributeMetadataMap,
      };

      return `
import { getCodeTransformerForFramework } from "#storybook";
import { defu } from "defu";
import { metadata as fwMetadata } from ${JSON.stringify(frameworkPath)};

export const metadata = defu(fwMetadata, {
  parameters: {
    docs: {
      description: {
        component: ${JSON.stringify(componentDescription)},
      },
      source: {
        transform: getCodeTransformerForFramework(${JSON.stringify(framework)}),
      },
    },
    _ddsMetadata: ${JSON.stringify(ddsMetadata)},
  },
});
      `;
    },
    // Storybook docs are written in the component file but they're read from `?storybookMetadata` virtual module.
    // We have to update the virtual modules manually when the component file updated.
    async handleHotUpdate({ server, file }) {
      const mod = server.moduleGraph.getModuleById(file);
      if (!mod) {
        return;
      }

      // Follow component file (`mod`) -> framework file -> virtual module
      // It is possible that `mod` is not a component file, but in that case, the framework file or virtual module cannot be found, so there is no problem because nothing is updated.
      const metadataMods = Array.from(mod.importers)
        .filter((mod) => /\/framework-\w+\.tsx?$/.test(mod.file ?? ""))
        .flatMap((frameworkMod) => Array.from(frameworkMod.importers))
        .filter((mod) => mod.id?.endsWith("?storybookMetadata"));
      if (metadataMods.length === 0) {
        return;
      }

      // Update Link Map
      linkMapPromise = createLinkMap(projectDir);

      // Recreate TS program to reflect changes.
      program = createTSProgram(projectDir, program);
      await Promise.all(metadataMods.map((mod) => server.reloadModule(mod)));
    },
  };
}
