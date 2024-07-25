import type { StorybookConfig } from "@storybook/react-vite";
import {
  getAllStorybookFiles,
  setStorybookFW,
  STORYBOOK_ADDONS,
  viteFinal,
} from "../main-common";

// Set `STORYBOOK_FW` environment variable to "react".
setStorybookFW("react");

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
  viteFinal,
};

export default config;
