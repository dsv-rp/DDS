import type { StorybookConfig } from "@storybook/react-vite";
import { env } from "node:process";

env.STORYBOOK_FW = "react";

const config: StorybookConfig = {
  stories: ["../../src/**/*.mdx", "../../src/**/*.stories.ts"],
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
    options: {
      builder: {
        viteConfigPath: "vite.config.storybook.ts",
      },
    },
  },
  typescript: {
    // "react-docgen" (not "react-docgen-typescript") has interoperability issue with lit's decorators
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
