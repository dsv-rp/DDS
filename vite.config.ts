import { env } from "node:process";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";
  const suffix = isDev ? "-dev" : "";

  // This is required to set `import.meta.env.DEV/PROD` correctly
  env.NODE_ENV = isDev ? "development" : "production";

  return {
    build: {
      minify: false,
      emptyOutDir: !isDev,
      cssMinify: "lightningcss",
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: `[format]${suffix}/[name]`,
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
        outDir: [`dist/es${suffix}/src`, `dist/cjs${suffix}/src`],
        exclude: ["**/node_modules"],
      }),
    ],
  };
});
