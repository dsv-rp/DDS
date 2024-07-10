import react from "@vitejs/plugin-react";
import { env } from "node:process";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { storybookFrameworkLoader } from "./build/vite/storybook-framework-loader";
import { getStorybookEnv } from "./storybook-env";

env.VITE_IS_STORYBOOK = "1";

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
  plugins: [
    react(),
    // "#storybook-framework" loader
    storybookFrameworkLoader(frameworkPath),
  ],
});
