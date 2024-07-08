declare module "eslint-plugin-lit-a11y" {
  import { ESLint } from "eslint";

  export declare const rules: Record<string, Rule.RuleModule>;
  export declare const configs: {
    recommended: ESLint.ConfigData;
  };
}
