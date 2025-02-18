import daikinPlugin from "@daikin-oss/tailwind";
import { iconsPlugin } from "@egoist/tailwindcss-icons";
import { env } from "node:process";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import { loadIcons } from "./icons";
import { tokensPlugin } from "./tokens";
import { flattenColorPalette, toColorValue } from "./utils";

export default {
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
    tokensPlugin({
      prefix: "ddt-",
      cssVarPrefix: "--dds-",
    }),
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
      // Variants for link buttons
      addVariant("link-enabled", ["&:is(:any-link, :enabled)"]); // Matches to <a> with href and <button>
      addVariant("link-disabled", ["&:not(:any-link, :enabled)"]); // Matches to <a> without href, <span>, and <button disabled>

      addVariant("unchecked", ["&:not(:checked)"]);

      addVariant("visible", ["&:not([hidden])"]);

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

      // Sets icon size.
      matchUtilities(
        { "icon-size": (value) => ({ "--ddc-icon-size": `${value}` }) },
        { values: theme("width"), supportsNegativeValues: false }
      );
    }),
  ],
} satisfies Config;
