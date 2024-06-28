const daikinPlugin = require("@daikin-oss/tailwind");
const { iconsPlugin } = require("@egoist/tailwindcss-icons");
const { loadIcons } = require("./build/tailwindcss/loadIcons.cjs");

/**
 * @param {import("tailwindcss").Config} config
 * @returns {import("tailwindcss").Config}
 */
function defineConfig(config) {
  return config;
}

module.exports = defineConfig({
  content: [
    "./src/**/*.{js,ts}",
    "!./src/**/*.stories.{js,ts}",
    "!./src/**/*.test.{js,ts}",
    "!**/stories/**",
    "!**/storybook/**",
    "!**/tests/**",
  ],
  plugins: [
    daikinPlugin(),
    iconsPlugin({
      collections: {
        daikin: {
          icons: loadIcons("./icons"),
        },
      },
      extraProperties: {
        width: "100%",
        height: "100%",
      },
    }),
  ],
});
