import eslint from "@eslint/js";
import prettierPkg from "eslint-config-prettier";
import { configs as litConfig } from "eslint-plugin-lit";
import {
  configs as litA11yConfigLegacy,
  rules as litA11yRules,
} from "eslint-plugin-lit-a11y";
import { configs as wcConfig } from "eslint-plugin-wc";
import tseslint from "typescript-eslint";

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
  wcConfig["flat/recommended"],
  wcConfig["flat/best-practice"],
  litConfig["flat/recommended"],
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
      "wc/guard-super-call": "off", // Disabled as it's checked by TypeScript
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
