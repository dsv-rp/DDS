import react from "@vitejs/plugin-react";
import { env } from "node:process";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

function fromProjectDir(path: string): string {
  return fileURLToPath(new URL(path, import.meta.url));
}

const useBuiltPackage = env.STORYBOOK_ENV === "production";
console.info(
  `[storybook-vite] Using ${useBuiltPackage ? "built package" : "development code"}`
);

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "#storybook",
        replacement: fromProjectDir("src/storybook"),
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
