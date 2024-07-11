import type { StorybookConfig } from "@storybook/web-components-vite";
import { env } from "node:process";
import {
  getAllStorybookFiles,
  STORYBOOK_ADDONS,
  viteFinal,
} from "./main-common";

// Storybook loads root main.ts (this file) somehow when launching react version.
if (!env.STORYBOOK_MAIN_LOADED) {
  env.STORYBOOK_FW = "web-components";
  env.STORYBOOK_MAIN_LOADED = "1";
}

const config: StorybookConfig = {
  stories: getAllStorybookFiles("web-components"),
  addons: STORYBOOK_ADDONS,
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
  viteFinal,
};

export default config;
