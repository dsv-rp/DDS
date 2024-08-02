import fg from "fast-glob";
import { env } from "node:process";
import { defineConfig, type UserConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig(async ({ mode }): Promise<UserConfig> => {
  const isDev = mode === "development";
  const suffix = isDev ? "-dev" : "";

  // This is required to set `import.meta.env.DEV/PROD` correctly.
  env.NODE_ENV = isDev ? "development" : "production";

  // We have to enumerate index.ts files because rollup eliminates index files in subdirectories.
  const entry = (
    await fg("./src/**/index.ts", {
      ignore: ["**/storybook/**", "**/tests/**"],
    })
  ).toSorted();

  return {
    build: {
      minify: false,
      emptyOutDir: !isDev,
      cssMinify: "lightningcss",
      lib: {
        entry,
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
        outDir: [`dist/es${suffix}`, `dist/cjs${suffix}`],
        exclude: ["**/node_modules"],
      }),
    ],
  };
});
