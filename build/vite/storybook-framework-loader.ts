import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve } from "node:path/posix";
import { normalizePath, type Plugin } from "vite";

type TS =
  typeof import("../../node_modules/web-component-analyzer/node_modules/typescript");

// We cannot just `import` web-component-analyzer as this package does not support ESM correctly.
const require = createRequire(import.meta.url);
const { analyzeSourceFile, transformAnalyzerResult } =
  require("web-component-analyzer") as typeof import("web-component-analyzer");

// We use TypeScript of web-component-analyzer's dependency to avoid compatibility issues
const ts =
  require("../../node_modules/web-component-analyzer/node_modules/typescript") as TS;

type Program = ReturnType<TS["createProgram"]>;

function createTSProgram(projectDir: string, oldProgram?: Program): Program {
  const configFile = ts.findConfigFile(
    projectDir,
    ts.sys.fileExists,
    "tsconfig.lib.json"
  );
  if (!configFile) {
    throw Error("tsconfig.lib.json not found");
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { config } = ts.readConfigFile(configFile, ts.sys.readFile);
  const { options, fileNames } = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    projectDir
  );

  return ts.createProgram({
    rootNames: fileNames,
    options,
    oldProgram,
  });
}

function getComponentDescription(
  filename: string,
  program: Program,
  warn: (str: string) => void
): string | null {
  if (!existsSync(filename)) {
    warn(`The component file "${filename}" does not exist.`);
    return null;
  }

  const sourceFile = program.getSourceFile(filename);
  if (!sourceFile) {
    warn(`Cannot obtain SourceFile of "${filename}".`);
    return null;
  }

  const result = analyzeSourceFile(sourceFile, {
    program,
    ts: ts,
  });

  return (
    transformAnalyzerResult("markdown", result, program, {
      inlineTypes: false,
      markdown: {
        headerLevel: 2,
      },
    })
      // Remove component title (e.g. `## daikin-checkbox`)
      .replace(/^\s*#+ .+\n/, "")
      .trim()
  );
}

/**
 * Loader plugin for `#storybook-framework`. \
 * Resolves a code that loads `metadata` from `frameworkPath` and export it with component description loaded from the component file.
 *
 * @param frameworkPath Actual path for framework-specific exports. (e.g. `./framework-wc`)
 * @returns A plugin
 */
export function storybookFrameworkLoader(frameworkPath: string): Plugin {
  const projectDir = resolve(import.meta.dirname, "../..");
  let program = createTSProgram(projectDir);

  return {
    name: "storybook-docs-loader",
    resolveId(id, importer) {
      if (id !== "#storybook-framework" || !importer) {
        return;
      }

      // e.g. "<dir>/stories/daikin-button.stories.ts?storybookMetadata"
      return `${importer}?storybookMetadata`;
    },
    load(id) {
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
      const componentDescription = getComponentDescription(
        componentFilepath,
        program,
        this.warn.bind(this)
      );

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
      if (metadataMods.length === 0) {
        return;
      }

      // Recreate TS program to reflect changes.
      program = createTSProgram(projectDir, program);
      await Promise.all(metadataMods.map((mod) => server.reloadModule(mod)));
    },
  };
}
