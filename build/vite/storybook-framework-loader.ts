import { readFile } from "node:fs/promises";
import { resolve } from "node:path/posix";
import { normalizePath, type Plugin } from "vite";

/**
 * Loader plugin for `#storybook-framework`. \
 * Resolves a code that loads `metadata` from `frameworkPath` and export it with component description loaded from the component file.
 *
 * @param frameworkPath Actual path for framework-specific exports. (e.g. `./framework-wc`)
 * @returns A plugin
 */
export function storybookFrameworkLoader(frameworkPath: string): Plugin {
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
      const componentId = resolve(storiesId, "../..", `${basename}.ts`);

      // load component file
      const componentCode = await readFile(componentId, "utf-8").catch(() => {
        this.warn(`Failed to read ${componentId}`);
        return null;
      });

      // extract TSDoc content of first exported class
      const componentTSDoc = componentCode?.match(
        /\/\*\*([\s\S]+?)\*\/\s*(?:@[^\n]+\s*)?export class\s/
      )?.[1];

      // remove leading "  * " from comment lines
      const componentDescription =
        componentTSDoc
          ?.trim()
          .replace(/^\s*\* ?/gm, "")
          .trim() ?? "";

      // prepare additional metadata
      const additionalMetadata = {
        parameters: {
          docs: {
            description: {
              component: componentDescription,
            },
          },
        },
      };

      return `
import { metadata as fwMetadata } from ${JSON.stringify(frameworkPath)};

export const metadata = {
  ...fwMetadata,
  ...(${JSON.stringify(additionalMetadata)}),
};
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
      await Promise.all(metadataMods.map((mod) => server.reloadModule(mod)));
    },
  };
}
