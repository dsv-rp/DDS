import type { StorybookConfig } from "@storybook/react-vite";
import { env } from "node:process";
import { getAllStorybookFiles, STORYBOOK_ADDONS } from "../main-common";

if (!env.STORYBOOK_MAIN_LOADED) {
  env.STORYBOOK_FW = "react";
  env.STORYBOOK_MAIN_LOADED = "1";
}

const config: StorybookConfig = {
  stories: getAllStorybookFiles("react"),
  addons: STORYBOOK_ADDONS,
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
