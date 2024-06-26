import { env } from "node:process";
import { defineConfig } from "@playwright/test";

const mode = env.STORYBOOK_FW === "react" ? "react" : "web-components";

export default defineConfig({
  testMatch: "*.visual.test.ts",
  webServer: {
    command:
      mode === "react"
        ? "npm run storybook:test-react"
        : "npm run storybook:test",
    url: "http://127.0.0.1:6099",
    reuseExistingServer: !env.CI,
    stdout: "ignore",
    stderr: "pipe",
  },
  use: {
    baseURL: "http://127.0.0.1:6099",
  },
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
});
