import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { getStorybookEnv } from "./storybook-env";

function fromProjectDir(path: string): string {
  return fileURLToPath(new URL(path, import.meta.url));
}

const { STORYBOOK_ENV, STORYBOOK_FW } = getStorybookEnv();

const useBuiltPackage = STORYBOOK_ENV === "production";
const frameworkPath = {
  "web-components": "./framework-wc",
  react: "./framework-react",
}[STORYBOOK_FW];

console.info(
  `[storybook-vite] Using ${useBuiltPackage ? "built package" : "development code"} of ${STORYBOOK_FW} component`
);

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "#storybook",
        replacement: fromProjectDir("src/storybook"),
      },
      {
        find: "#storybook-framework",
        replacement: frameworkPath,
      },
      {
        find: /^#package\/(.+)$/,
        replacement: useBuiltPackage
          ? "@daikin-oss/design-system-web-components/$1"
          : fromProjectDir("src") + "/$1",
      },
    ],
  },
  plugins: [react()],
});
