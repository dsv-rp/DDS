import type { StorybookConfig } from "@storybook/web-components-vite";
import {
  getAllStorybookFiles,
  setStorybookFW,
  STORYBOOK_ADDONS,
  viteFinal,
} from "./main-common";

// Set `STORYBOOK_FW` environment variable to "web-components".
setStorybookFW("web-components");

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
