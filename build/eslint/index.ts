import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import { configs as litConfig } from "eslint-plugin-lit";
import {
  configs as litA11yConfigLegacy,
  rules as litA11yRules,
} from "eslint-plugin-lit-a11y";
import { configs as wcConfig } from "eslint-plugin-wc";
import tseslint from "typescript-eslint";
import ddsRulesPlugin from "./rules";

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
  wcConfig["flat/recommended"],
  wcConfig["flat/best-practice"],
  litConfig["flat/recommended"],
  litA11yConfigFlatRecommended,
  prettierConfig,
  {
    plugins: { dds: ddsRulesPlugin },
    rules: {
      "dds/ban-missing-design-tokens": "error",
    },
  },
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

      "wc/guard-super-call": "off", // Disabled as it's checked by TypeScript
      "lit-a11y/anchor-is-valid": [
        "error",
        {
          allowHash: false,
          aspects: ["invalidHref", "preferButton"],
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
