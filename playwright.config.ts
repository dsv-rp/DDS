import { defineConfig } from "@playwright/test";
import { env } from "node:process";
import { getStorybookEnv } from "./storybook-env";

const { STORYBOOK_FW } = getStorybookEnv();

const command = {
  "web-components": "npm run storybook:ci-wc",
  react: "npm run storybook:ci-react",
}[STORYBOOK_FW];

export default defineConfig({
  testMatch: "*.visual.test.ts",
  webServer: {
    command,
    url: "http://127.0.0.1:6099",
    reuseExistingServer: !env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
  use: {
    // See `docker-compose.yml` for the `baseURL` and the `wsEndpoint`
    baseURL: "http://host.docker.internal:6099",
    connectOptions: {
      wsEndpoint: "ws://localhost:55744",
    },
  },
  // Default without platform suffix
  // https://github.com/microsoft/playwright/blob/v1.45.0/packages/playwright/src/common/config.ts#L169
  snapshotPathTemplate:
    "{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{ext}",
  expect: {
    toHaveScreenshot: {
      // Pixel-perfect
      maxDiffPixels: 0,
    },
  },
});