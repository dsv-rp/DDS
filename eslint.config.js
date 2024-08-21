import { fixupConfigRules } from "@eslint/compat";
import eslint from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import { configs as litConfig } from "eslint-plugin-lit";
import {
  configs as litA11yConfigLegacy,
  rules as litA11yRules,
} from "eslint-plugin-lit-a11y";
import { configs as wcConfig } from "eslint-plugin-wc";
import tseslint from "typescript-eslint";

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
  ...fixupConfigRules([
    wcConfig["flat/recommended"],
    wcConfig["flat/best-practice"],
  ]),
  litConfig["flat/recommended"],
  litA11yConfigFlatRecommended,
  prettierConfig,
  // Ignore files
  {
    ignores: ["dist", "storybook-static", "test-results"],
  },
  // CJS
  {
    files: ["**/*.cjs", "**/*.cts"],
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  // Base rules
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
  // Restrict imports
  {
    // Storybook files
    files: ["src/components/*/stories/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // Restrict importing `../example-component`.
            // In order to test the built components, we have to use `#package/` to reference them.
            {
              regex: "^\\.\\./[\\w-]+",
              message: "Use #package/ to import components.",
            },
            // Restrict importing `../../example-component/*`, allowing `../../example-component/stories/*`.
            {
              regex: "^\\.\\./\\.\\./[\\w-]+/(?!stories/)[\\w-]+",
              message: "Use #package/ to import components.",
            },
            // Restrict importing `#package/components/example-component/stories/*`.
            // Storybook files are not built as a library, so they cannot be referenced with `#package/`.
            {
              regex: "^#package/components/[\\w-]+/stories/",
              message: "Use ../../*/stories/* to import other Storybook files.",
            },
          ],
        },
      ],
    },
  },
  {
    // Component files, excluding Storybook files and test files
    files: ["src/components/*.ts"],
    ignores: ["*.visual.test.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            // The component code itself cannot use `#package/`.
            {
              regex: "^#package/",
              message: "Do not use #package/ in component files.",
            },
            {
              regex: "/stories/|^#storybook/",
              message: "Do not import Storybook files.",
            },
            {
              regex: "\\.test(\\.[\\w-]+)?$|^#tests/|/tests/",
              message: "Do not import test files.",
            },
          ],
        },
      ],
    },
  }
);
