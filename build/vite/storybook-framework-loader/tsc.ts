// We use TypeScript of web-component-analyzer's dependency to avoid compatibility issues.
import { createRequire } from "module";
import type { Program } from "../../../node_modules/web-component-analyzer/node_modules/typescript";

// We cannot use import as TypeScript of web-component-analyzer's dependency does not support ESM correctly.
const require = createRequire(import.meta.url);
export const ts =
  require("../../../node_modules/web-component-analyzer/node_modules/typescript") as typeof import("../../../node_modules/web-component-analyzer/node_modules/typescript");

export { type Program };

export function createTSProgram(
  projectDir: string,
  oldProgram?: Program
): Program {
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
