import {
  analyzeSourceFile,
  transformAnalyzerResult,
  type AnalyzerResult,
} from "@jackolope/web-component-analyzer";
import { existsSync } from "node:fs";
import { ts, type Program } from "./tsc";

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
        strType === "boolean" || defaultValue === false
          ? "boolean"
          : typeof defaultValue === "string" ||
              typeof defaultValue === "number" ||
              defaultValue == null
            ? { default: String(defaultValue ?? "") }
            : "unknown";
    }
  }

  return map;
}
