const plugin = require('tailwindcss/plugin');

const { iconsPlugin } = require("@egoist/tailwindcss-icons");

// @ts-expect-error no type definitions for @daikin-oss/tailwind
const daikinPlugin = require("@daikin-oss/tailwind");

/**
 * @param {import('tailwindcss').Config} config
 * @returns {import('tailwindcss').Config}
 */
function defineConfig(config) {
  return config
}

module.exports = defineConfig({
  content: ["./src/**/*.ts|js"],
  theme: {
    extend: {},
  },
  plugins: [
    daikinPlugin(),
    iconsPlugin({
      collections: {
        daikin: {
          icons: {
            "checkbox-checked": {
              body: '<path fill-rule="evenodd" clip-rule="evenodd" d="M5 11.21L0 6.21001L1.41 4.80001L5 8.38001L12.59 0.790009L14 2.21001L5 11.21Z" fill="currentColor" />',
              width: 16,
              height: 16,
              left: -1,
              top: -2,
            },
            "checkbox-indeterminate": {
              body: '<rect width="8" height="2" fill="currentColor" />',
              width: 16,
              height: 16,
              left: -4,
              top: -7,
            },
          },
        },
      },
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
          '.text-wrap': {
              // https://ics.media/entry/240411/
              "overflow-wrap": "anywhere",
              "word-break": "normal",
              "line-break": "strict",
          },
      });
  }),
  ],
});