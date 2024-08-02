import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { ts, type Program } from "./tsc";

// We cannot just `import` web-component-analyzer as this package does not support ESM correctly.
const require = createRequire(import.meta.url);
const { analyzeSourceFile, transformAnalyzerResult } =
  require("web-component-analyzer") as typeof import("web-component-analyzer");

export function getComponentDescriptionAsMarkdown(
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
    ts,
  });

  return transformAnalyzerResult("markdown", result, program, {
    inlineTypes: false,
    markdown: {
      headerLevel: 2,
    },
  });
}
