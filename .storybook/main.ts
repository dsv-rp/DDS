import type { StorybookConfig } from "@storybook/web-components-vite";
import { env } from "node:process";
import { getAllStorybookFiles } from "./main-common";

env.STORYBOOK_FW = "web-components";

const config: StorybookConfig = {
  stories: getAllStorybookFiles("web-components"),
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: {
    name: "@storybook/web-components-vite",
    options: {
      builder: {
        viteConfigPath: "vite.config.storybook.ts",
      },
    },
  },
};

export default config;
