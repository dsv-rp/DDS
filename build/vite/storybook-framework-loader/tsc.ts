import type { Program } from "typescript";
import * as ts from "typescript";

export { ts, type Program };

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
