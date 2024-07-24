import { defineConfig } from "@playwright/test";
import { env } from "node:process";
import { getStorybookEnv } from "./storybook-env";

// `PLAYWRIGHT_NO_CONTAINER` is for CIs that already runs on Playwright container
const useContainer = !env.PLAYWRIGHT_NO_CONTAINER;

const { STORYBOOK_FW } = getStorybookEnv();

const command = {
  "web-components": "npm run storybook:ci-wc",
  react: "npm run storybook:ci-react",
}[STORYBOOK_FW];

export default defineConfig({
  testMatch: "*.visual.test.ts",
  fullyParallel: true,
  webServer: {
    command,
    url: "http://127.0.0.1:6099",
    reuseExistingServer: !env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
  use: useContainer
    ? {
        // See `compose.yaml` for the `baseURL` and the `wsEndpoint`
        // We use `host.containers.internal` to support both Docker and Podman.
        baseURL: "http://host.containers.internal:6099",
        connectOptions: {
          wsEndpoint: "ws://localhost:55744",
        },
      }
    : {
        baseURL: "http://127.0.0.1:6099",
      },
  // Default without platform suffix
  // https://github.com/microsoft/playwright/blob/v1.45.0/packages/playwright/src/common/config.ts#L169
  snapshotPathTemplate:
    "{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{ext}",
  expect: {
    toHaveScreenshot: {
      // Almost pixel-perfect
      // The `threshold` is not 0, because the output is different between GitHub Actions and local, even though we are using a container.
      maxDiffPixels: 0,
      threshold: 0.05,
      // Disable animations
      animations: "disabled",
      caret: "hide",
    },
  },
});
