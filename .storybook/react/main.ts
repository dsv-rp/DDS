import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: [
    "../../src/**/*.mdx",
    "../../src/**/*-react.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    // react-docgen has interoperability issue with lit's decorators
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
