import fg from "fast-glob";
import { fileURLToPath } from "node:url";
import type { StorybookFrameworkName } from "../storybook-env";

const GLOB_DIR = "../src";
const GLOB_PATTERNS: readonly string[] = ["**/*.mdx", "**/*.stories.ts"];

export function getAllStorybookFiles(
  framework: StorybookFrameworkName
): string[] {
  const includePattern = {
    "web-components": "-wc-only.",
    react: "-react-only.",
  }[framework];

  // We cannot use async version since Storybook's test runner does not support async `stories` option
  const filepaths = fg.sync([...GLOB_PATTERNS], {
    absolute: true,
    cwd: fileURLToPath(new URL(GLOB_DIR, import.meta.url)),
  });

  return filepaths.filter(
    (filepath) =>
      !filepath.includes("-only.") || filepath.includes(includePattern)
  );
}
