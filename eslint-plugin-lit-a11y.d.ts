declare module "eslint-plugin-lit-a11y" {
  import { ESLint, Linter } from "eslint";

  export declare const rules: Record<string, Rule.RuleModule>;
  export declare const configs: {
    recommended: ESLint.ConfigData<Linter.RulesRecord>;
  };
}
