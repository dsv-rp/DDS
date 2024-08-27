import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import type { AnalyzerResult } from "web-component-analyzer";
import { ts, type Program } from "./tsc";

// We cannot just `import` web-component-analyzer as this package does not support ESM correctly.
const require = createRequire(import.meta.url);
const { analyzeSourceFile, transformAnalyzerResult } =
  require("web-component-analyzer") as typeof import("web-component-analyzer");

export type ComponentAttributeMetadataMap = Record<
  string,
  Record<string, "boolean" | "unknown" | { default: string }>
>;

export function analyzeComponentFile(
  filename: string,
  program: Program,
  warn: (str: string) => void
): AnalyzerResult | null {
  if (!existsSync(filename)) {
    warn(`The component file "${filename}" does not exist.`);
    return null;
  }

  const sourceFile = program.getSourceFile(filename);
  if (!sourceFile) {
    warn(`Cannot obtain SourceFile of "${filename}".`);
    return null;
  }

  return analyzeSourceFile(sourceFile, {
    program,
    ts,
  });
}

export function formatAnalyzerResultToMarkdown(
  program: Program,
  result: AnalyzerResult
): string {
  return transformAnalyzerResult("markdown", result, program, {
    inlineTypes: false,
    markdown: {
      headerLevel: 2,
    },
  });
}

export function collectComponentAttributeMetadata(
  result: AnalyzerResult
): ComponentAttributeMetadataMap {
  const map: ComponentAttributeMetadataMap = {};
  for (const definition of result.componentDefinitions) {
    const object = (map[definition.tagName] ??= {});
    for (const member of definition.declaration?.members ?? []) {
      const {
        attrName,
        meta: { type } = {},
        default: defaultValue,
        visibility,
      } = member;
      if (!attrName || visibility === "protected" || visibility === "private") {
        continue;
      }

      const strType = (
        typeof type === "object" ? type.kind : type
      )?.toLowerCase();
      const key = attrName.toLowerCase();
      object[key] =
        strType === "boolean"
          ? "boolean"
          : typeof defaultValue === "string" || defaultValue == null
            ? { default: defaultValue ?? "" }
            : "unknown";
    }
  }

  return map;
}
