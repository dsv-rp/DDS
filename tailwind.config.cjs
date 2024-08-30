const { env } = require("node:process");
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
    // Exclude storybook codes (if not storybook environment)
    ...(env.VITE_IS_STORYBOOK
      ? []
      : ["!./src/**/*.stories.*", "!**/stories/**"]),
    // Exclude storybook utilities
    "!**/storybook/**",
    // Exclude test codes
    "!./src/**/*.test.*",
    // Exclude test utilities
    "!**/tests/**",
  ],
  theme: {
    extend: {
      boxShadow: {
        notification: "0px -2px 19px 0px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        "progress-bar-indeterminate": {
          // An animation where the block is outside the left area at the start and outside the right area at the end.
          // The block takes up 50% of the width of its parent element, and by specifying 200% at the end, it can be moved outside the right area.
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
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
    plugin(({ addVariant, matchVariant }) => {
      addVariant("aria-controllable", [
        // We don't know why, but `:read-only` was applied to checkboxes with and without `readonly` attribute, so we use `aria-readonly` instead.
        '&:enabled:not([aria-readonly="true"])',
      ]);

      addVariant("unchecked", ["&:not(:checked)"]);

      matchVariant("part", (value) => `&::part(${value})`);

      matchVariant(
        "slotted",
        (value) => [
          // `::slotted` is equivalent to `::slotted(*)`
          `&::slotted(${value})`,
          // `& > *` is for fallback contents. See https://github.com/w3c/csswg-drafts/issues/5482.
          `& > ${value}`,
        ],
        {
          values: {
            // `DEFAULT` is used when the option is not specified (e.g. "slotted:text-white")
            DEFAULT: "*",
          },
        }
      );
    }),
  ],
});
