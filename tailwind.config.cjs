const { env } = require("node:process");
const plugin = require("tailwindcss/plugin");
const daikinPlugin = require("@daikin-oss/tailwind");
const { iconsPlugin } = require("@egoist/tailwindcss-icons");
const { loadIcons } = require("./build/tailwindcss/icons.cjs");
const { colorTokens } = require("./color-tokens.json");

/**
 * @param {import("tailwindcss").Config} config
 * @returns {import("tailwindcss").Config}
 */
function defineConfig(config) {
  return config;
}

/**
 * `flattenColorPalette` from TailwindCSS v3.4.10. MIT Licensed.
 * @see https://github.com/tailwindlabs/tailwindcss/blob/main/src/util/flattenColorPalette.js
 * @param {Record<string, string | Record<string, string>> | undefined} colors
 * @returns {Record<string, string>}
 */
function flattenColorPalette(colors) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values == "object"
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === "DEFAULT" ? "" : `-${number}`)]: hex,
          }))
        : [{ [String(color)]: values }]
    )
  );
}

/**
 * `toColorValue` from TailwindCSS v3.4.10. MIT Licensed.
 * @see https://github.com/tailwindlabs/tailwindcss/blob/main/src/util/toColorValue.js
 * @param {string | ((arg: unknown) => string)} maybeFunction
 * @returns {string}
 */
function toColorValue(maybeFunction) {
  return typeof maybeFunction === "function"
    ? maybeFunction({})
    : maybeFunction;
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
      colors: {
        system: colorTokens,
      },
      boxShadow: {
        notification: "0px -2px 19px 0px rgba(0, 0, 0, 0.1)",
        dropdown: "0px 0px 8px 0px #00000033",
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
    plugin(({ addVariant, matchUtilities, matchVariant, theme }) => {
      addVariant("aria-controllable", [
        // We don't know why, but `:read-only` was applied to checkboxes with and without `readonly` attribute, so we use `aria-readonly` instead.
        '&:enabled:not([aria-readonly="true"])',
      ]);

      // Variants for link buttons
      addVariant("link-enabled", ["&:is(:any-link, :enabled)"]); // Matches to <a> with href and <button>
      addVariant("link-disabled", ["&:not(:any-link, :enabled)"]); // Matches to <a> without href, <span>, and <button disabled>

      addVariant("unchecked", ["&:not(:checked)"]);

      addVariant("link-enabled", ["&:is(:any-link, :enabled)"]); // Matches to <a> with href and <button>
      addVariant("link-disabled", ["&:not(:any-link, :enabled)"]); // Matches to <a> without href, <span>, and <button disabled>

      matchVariant("part", (value) => `&::part(${value})`);

      addVariant("floating-unready", ["&:not([data-floating-ready])"]);

      matchVariant(
        "slotted",
        (value) => [
          // `::slotted` is equivalent to `::slotted(*)`
          `&::slotted(${value})`,
        ],
        {
          values: {
            // `DEFAULT` is used when the option is not specified (e.g. "slotted:text-white")
            DEFAULT: "*",
          },
        }
      );

      // Sets a CSS variable (for color).
      matchUtilities(
        {
          "var-color": (value, { modifier }) => {
            if (!modifier) {
              return {};
            }

            return {
              [`--${modifier}`]: toColorValue(value),
            };
          },
        },
        {
          modifiers: "any",
          values: flattenColorPalette(theme("colors")),
          type: ["color", "any"],
        }
      );

      // Defines a CSS variable with priority control. Use this together with `var-color`.
      // Usage: `define-[--color-error,--color-focus,--color-base]/color-border`
      //        => `--color-border: var(--color-error, var(--color-focus, var(--color-base)));`
      matchUtilities(
        {
          define: (value, { modifier }) => {
            if (!modifier) {
              return {};
            }

            return {
              [`--${modifier}`]: value
                // `[--color-error,--color-focus,--color-base]` will be passed as `var(--color-error,--color-focus,--color-base)`
                .replace(/^var\((.+)\)$/, "$1")
                .split(",")
                .reduceRight(
                  (acc, cur) =>
                    acc
                      ? `var(${cur}, ${acc})`
                      : // rightmost
                        cur.startsWith("--")
                        ? `var(${cur})`
                        : cur,
                  ""
                ),
            };
          },
        },
        {
          modifiers: "any",
          values: {},
        }
      );

      // Sets a CSS variable (for color).
      matchUtilities(
        { "icon-size": (value) => ({ "--dds-icon-size": `${value}` }) },
        { values: theme("width"), supportsNegativeValues: false }
      );
    }),
  ],
});
