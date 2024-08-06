import eslint from "@eslint/js";
import prettierPkg from "eslint-config-prettier";
import { configs as litConfig } from "eslint-plugin-lit";
import {
  configs as litA11yConfigLegacy,
  rules as litA11yRules,
} from "eslint-plugin-lit-a11y";
import { configs as wcConfig } from "eslint-plugin-wc";
import tseslint from "typescript-eslint";

/**
 * Workaround the issue of incompatibility between the types of `Config` between eslint and eslint-typescript.
 * We should wait for typescript-eslint v8.0.2, which will have a fix for this issue.
 * https://github.com/typescript-eslint/typescript-eslint/issues/9724
 * @param {import("eslint").Linter.Config} type
 * @returns {Omit<import("eslint").Linter.Config, "languageOptions">}
 */
function asCompatibleConfig(type) {
  return type;
}

const { rules: prettierRules } = prettierPkg;

// convert eslint-plugin-lit-a11y's recommended config into a flat one
const litA11yConfigFlatRecommended = {
  plugins: {
    "lit-a11y": { rules: litA11yRules },
  },
  rules: { ...litA11yConfigLegacy.recommended.rules },
};

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  asCompatibleConfig(wcConfig["flat/recommended"]),
  asCompatibleConfig(wcConfig["flat/best-practice"]),
  asCompatibleConfig(litConfig["flat/recommended"]),
  litA11yConfigFlatRecommended,
  { rules: prettierRules },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
      },
    },
    rules: {
      // This conflicts with lit's declarative event handler notation
      // https://lit.dev/docs/components/events/#understanding-this-in-event-listeners
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        {
          ignoreArrowShorthand: true,
        },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          allowBoolean: true,
          allowNumber: true,
        },
      ],
    },
  },
  {
    files: ["**/*.cjs", "**/*.cts"],
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    ignores: ["dist", "storybook-static", "test-results"],
  }
);
