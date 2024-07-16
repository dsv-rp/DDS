import type { StorybookConfig } from "@storybook/web-components-vite";
import fg from "fast-glob";
import { env } from "node:process";
import { fileURLToPath } from "node:url";
import type { InlineConfig } from "vite";
import type { StorybookFrameworkName } from "../storybook-env";

export const STORYBOOK_ADDONS: StorybookConfig["addons"] = [
  "@storybook/addon-a11y",
  "@storybook/addon-essentials",
  "@storybook/addon-interactions",
  "@storybook/addon-links",
];

const GLOB_DIR = "../src";
const GLOB_PATTERNS: readonly string[] = ["**/*.mdx", "**/*.stories.ts"];

export function getAllStorybookFiles(
  framework: StorybookFrameworkName
): string[] {
  const includePattern = {
    "web-components": "-wc-only.",
    react: "-react-only.",
  }[framework];

  // We cannot use async version since Storybook's test runner does not support async `stories` option.
  const filepaths = fg.sync([...GLOB_PATTERNS], {
    absolute: true,
    cwd: fileURLToPath(new URL(GLOB_DIR, import.meta.url)),
  });

  return filepaths.filter(
    (filepath) =>
      !filepath.includes("-only.") || filepath.includes(includePattern)
  );
}

export function setStorybookFW(framework: StorybookFrameworkName): void {
  // Storybook loads root main.ts (this file) somehow when launching react version.
  // Thus, it must be ignored after the second time.
  if (!env.STORYBOOK_MAIN_LOADED) {
    env.STORYBOOK_FW = framework;
    env.STORYBOOK_MAIN_LOADED = "1";
  }
}

export function viteFinal(config: InlineConfig): InlineConfig {
  return {
    ...config,
    // We have to pre-bundle all the dependencies since the page reload confuses Playwright.
    optimizeDeps: {
      ...config.optimizeDeps,
      entries: [...(config.optimizeDeps?.entries ?? []), "src/index.ts"],
      include: [
        ...(config.optimizeDeps?.include ?? []),
        "@storybook/blocks",
        "@daikin-oss/dds-tokens/js/aaf/Dark/variables.js",
        "@daikin-oss/dds-tokens/js/aaf/Light/variables.js",
        "@daikin-oss/dds-tokens/js/daikin/Dark/variables.js",
        "@daikin-oss/dds-tokens/js/daikin/Light/variables.js",
        "class-variance-authority",
        "lit",
        "lit/**/*.js",
        "@lit/react",
        "react",
      ],
      force: true,
    },
  };
}
