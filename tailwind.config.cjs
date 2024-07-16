const plugin = require("tailwindcss/plugin");
const daikinPlugin = require("@daikin-oss/tailwind");
const { iconsPlugin } = require("@egoist/tailwindcss-icons");
const { loadIcons } = require("./build/tailwindcss/icons.cjs");

/**
 * @param {import("tailwindcss").Config} config
 * @returns {import("tailwindcss").Config}
 */
function defineConfig(config) {
  return config;
}

module.exports = defineConfig({
  content: [
    "./src/**/*.ts",
    "./src/**/*.json",
    "!./src/**/*.stories.*",
    "!./src/**/*.test.*",
    "!**/stories/**",
    "!**/storybook/**",
    "!**/tests/**",
  ],
  theme: {
    extend: {
      boxShadow: {
        notification: "0px -2px 19px 0px rgba(0, 0, 0, 0.1)",
      },
    },
  },
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
    plugin(({ addVariant }) => {
      addVariant("aria-controllable", [
        // We don't know why, but `:read-only` was applied to checkboxes with and without `readonly` attribute, so we use `aria-readonly` instead.
        '&:enabled:not([aria-readonly="true"])',
      ]);
    }),
  ],
});
