import { banMissingDesignTokensRule } from "./ban-missing-design-tokens";

const plugin = {
  meta: {
    name: "eslint-plugin-dds",
    version: "1.0.0",
  },
  rules: {
    "ban-missing-design-tokens": banMissingDesignTokensRule,
  },
};

export default plugin;
