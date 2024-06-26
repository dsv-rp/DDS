import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: "./src/index.ts",
      formats: ["es", "cjs"],
      fileName: "[format]/[name]",
    },
    rollupOptions: {
      output: {
        preserveModules: true,
        exports: "named",
      },
    },
  },
  plugins: [
    externalizeDeps(),
    dts({
      tsconfigPath: "tsconfig.lib.json",
      outDir: ["dist/es", "dist/cjs"],
      exclude: [
        "**/node_modules",
        "**/stories",
        "**/tests",
        "**/*.stories.*",
        "**/*.test.*",
      ],
    }),
  ],
});
