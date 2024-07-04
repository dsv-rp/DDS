const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
const glob = require("glob");
const discardComments = require("postcss-discard-comments");
const postcss = require("rollup-plugin-postcss");
const typescript = require("rollup-plugin-typescript2");

module.exports = {
  input: ["src/index.ts", ...glob.sync("src/?(components)/**/index.ts")],
  output: [
    {
      format: "es",
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].js",
      sourcemap: true,
      compact: false,
      dir: "dist",
    },
    {
      format: "cjs",
      preserveModules: true,
      preserveModulesRoot: "src",
      entryFileNames: "[name].js",
      sourcemap: true,
      compact: false,
      dir: "lib",
      exports: "auto",
    },
  ],
  plugins: [
    commonjs(),
    postcss({
      plugins: [discardComments({ removeAll: true })],
      // Extract CSS to a separate file
      extract: false,
      // Enable source maps for CSS
      sourceMap: true,
      // Minimize the CSS
      minimize: false,
    }),
    typescript(),
    nodeResolve({
      exportConditions: ["node.default", "node", "import", "default"],
    }),
  ],
};
