import fg from "fast-glob";
import { fileURLToPath } from "node:url";
import type { StorybookFrameworkName } from "../storybook-env";

const GLOB_DIR = "../src";
const GLOB_PATTERNS: readonly string[] = ["**/*.mdx", "**/*.stories.ts"];

export async function getAllStorybookFiles(
  framework: StorybookFrameworkName
): Promise<string[]> {
  const includePattern = {
    "web-components": "-wc-only.",
    react: "-react-only.",
  }[framework];

  const filepaths = await fg([...GLOB_PATTERNS], {
    absolute: true,
    cwd: fileURLToPath(new URL(GLOB_DIR, import.meta.url)),
  });

  return filepaths.filter(
    (filepath) =>
      !filepath.includes("-only.") || filepath.includes(includePattern)
  );
}
