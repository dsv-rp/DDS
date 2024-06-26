import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    globalSetup: "./src/tests/setup.ts",
    browser: {
      enabled: true,
      name: "chrome",
    },
  },
});
