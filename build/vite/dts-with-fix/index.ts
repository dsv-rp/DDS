import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type Plugin, normalizePath } from "vite";
import dts, { type PluginOptions } from "vite-plugin-dts";

/**
 * Returns absolute path from project root.
 * @param filepath relative filepath
 * @returns Absolute path
 */
function fromProjectDir(filepath: string): string {
  return fileURLToPath(new URL(`../../../${filepath}`, import.meta.url));
}

/**
 * Removes ".d.ts" or ".d.*ts" extension from specified filename.
 * If the filename does not have such extension, an error will be thrown.
 *
 * @example
 * trimDTSExtension("path/to/file.d.ts"); // -> "path/to/file"
 * trimDTSExtension("path/to/file.d.cts"); // -> "path/to/file"
 * trimDTSExtension("path/to/file.js"); // Throws an error.
 */
function trimDTSExtension(filename: string): string {
  const replaced = filename.replace(/\.d\.[cm]?ts$/, "");
  if (replaced === filename) {
    throw new Error(`Cannot trim dts extension from ${filename}`);
  }
  return replaced;
}

/**
 * Converts ".js", ".cjs", or ".cts" extension to corresponding ".d.ts"-like extension for specified filename.
 * If the filename does not have such extension, an error will be thrown.
 *
 * @example
 * toDTSExtension("path/to/file.js"); // -> "path/to/file.d.ts"
 * toDTSExtension("path/to/file.cjs"); // -> "path/to/file.d.cts"
 * toDTSExtension("path/to/file.ts"); // Throws an error.
 */
function toDTSExtension(filename: string): string {
  const replaced = filename.replace(/\.([cm]?)js$/, ".d.$1ts");
  if (replaced === filename) {
    throw new Error(`Cannot generate dts filepath for ${filename}`);
  }
  return replaced;
}

/**
 * Resolves relative `import` with Node.js-like algorithm.
 *
 * @param implementationFilenameSet A set of implementation filenames relative to the dist directory.
 * @param specifier Import specifier.
 * @param from Relative declaration filename that does import.
 * @param extension Implementation file extension. Can be ".js", ".cjs", or ".mjs".
 * @param sourceFileExists A callback to check whether the source file exists for specified dist filename.
 * @returns Resolved implementation filename
 */
function resolveImport(
  implementationFilenameSet: ReadonlySet<string>,
  specifier: string,
  from: string,
  extension: string,
  sourceFileExists: (prefix: string) => boolean
): string {
  const specifierTrimmed = specifier.replace(/\.([cm]?)[jt]s$/, "");
  const base = path.posix.join(path.posix.dirname(from), specifierTrimmed);

  // Look for corresponding implementation file.
  for (const implementationFileSuffix of [extension, `/index${extension}`]) {
    if (implementationFilenameSet.has(`${base}${implementationFileSuffix}`)) {
      return `${specifierTrimmed}${implementationFileSuffix}`;
    }
  }

  // Type-only file that does not have corresponding implementation file.
  // Look for corresponding source file.
  for (const suffix of ["", "/index"]) {
    if (sourceFileExists(`${base}${suffix}`)) {
      return `${specifierTrimmed}${suffix}${extension}`;
    }
  }

  // Source file not found.
  throw new Error(`Cannot resolve import of ${specifier} from ${from}`);
}

/**
 * A wrapped `vite-plugin-dts` plugin that fixes `import` declarations.
 * This wrapper does following things:
 *
 * - Resolves all relative imports (including `export ... from "..."`) so that the import specifier includes extension. \
 *   This is needed for those who uses `Node16` module / moduleResolution option.
 *
 *   Example:
 *
 *   ```diff
 *   - import { Example } from "./path/to/file";
 *   + import { Example } from "./path/to/file.cjs";
 *
 *   - import { Example } from "./path/to/dir";
 *   + import { Example } from "./path/to/dir/index.js";
 *   ```
 *
 * - Modifies filename to use appropriate extension. \
 *   This is especially necessary for type declarations of .cjs files.
 *
 *   Example:
 *
 *   ```diff
 *   - path/to/file.d.ts
 *   + path/to/file.d.cts
 *   ```
 *
 * @param dtsOptions Options passed to `vite-plugin-dts`.
 * @returns Vite plugins.
 */
export function dtsWithFix(dtsOptions: PluginOptions): Plugin[] {
  const srcDir = fromProjectDir("src");
  const outDir = fromProjectDir("dist");

  const sourceFileExists = (relativePathWithoutExtension: string): boolean => {
    // Remove module directory (e.g. `cjs/`, `es-dev/`) from path.
    const basename = relativePathWithoutExtension.replace(
      /^(?:cjs|es)(?:-dev)?\//,
      ""
    );
    if (basename === relativePathWithoutExtension) {
      throw new Error(
        `Cannot trim module directory from ${relativePathWithoutExtension}`
      );
    }

    // Look for source file in the filesystem.
    // "" is for .json files.
    for (const extension of ["", ".ts", ".tsx"]) {
      const filepath = path.join(srcDir, `${basename}${extension}`);
      if (fs.existsSync(filepath)) {
        return true;
      }
    }

    return false;
  };

  const implementationFilenameSet = new Set<string>();

  return [
    {
      name: "fix-dts-source-collector",
      apply: "build",
      enforce: "pre",
      generateBundle(_options, bundle) {
        // Collect output files (= implementation files).
        for (const key of Object.keys(bundle)) {
          implementationFilenameSet.add(
            // Here, we normalize filepath by applying `path.relative` and `normalizePath`, though `key` is already relative.
            // Example: `cjs-dev/path/to/file.cjs`
            normalizePath(path.relative(outDir, path.join(outDir, key)))
          );
        }
      },
    },
    dts({
      ...dtsOptions,
      beforeWriteFile: (filepath, content) => {
        const implementationExtension = /\/cjs(?:-dev)?\//.test(filepath)
          ? ".cjs"
          : /\/es(?:-dev)?\//.test(filepath)
            ? ".js"
            : null;
        if (!implementationExtension) {
          throw new Error(`Cannot detect extension for ${filepath}`);
        }

        /** @example "cjs-dev/path/to/file.d.ts" */
        const relativePath = normalizePath(path.relative(outDir, filepath));
        /** @example "cjs-dev/path/to/file" */
        const relativePathPrefix = trimDTSExtension(relativePath);
        /** @example "cjs-dev/path/to/file.cjs" */
        const implementationFilepath = `${relativePathPrefix}${implementationExtension}`;

        // Ensure that the source file exists.
        if (!sourceFileExists(relativePathPrefix)) {
          throw new Error(`Source file not found for ${filepath}`);
        }

        // Correct .d.ts extension
        /** @example "cjs-dev/path/to/file.d.cts" */
        const newFilename = toDTSExtension(implementationFilepath);
        /** @example "/<projectDir>/cjs-dev/path/to/file.d.cts" */
        const newFilepath = path.join(outDir, newFilename);
        // Correct import specifiers (paths).
        const newContent = content.replaceAll(
          /(\sfrom\s+)("[^"]+"|'[^']+')/g,
          (all, prefix: string, literal: string) => {
            const importPath = literal.slice(1, -1);
            if (!importPath.startsWith("./") && !importPath.startsWith("../")) {
              // Not a relative import.
              return all;
            }

            // Resolve import to add extension.
            const resolved = resolveImport(
              implementationFilenameSet,
              literal.slice(1, -1),
              newFilename,
              implementationExtension,
              sourceFileExists
            );
            return `${prefix}"${resolved}"`;
          }
        );

        return {
          filePath: newFilepath,
          content: newContent,
        };
      },
    }),
  ];
}
