/**
 * @param {import('tailwindcss').Config} config
 * @returns {import('tailwindcss').Config}
 */
function defineConfig(config) {
  return config;
}

const plugin = require("tailwindcss/plugin");

// @ts-expect-error no type definitions for @daikin-oss/tailwind
const daikinPlugin = require("@daikin-oss/tailwind");

module.exports = defineConfig({
  content: ["./src/**/*.ts|js"],
  theme: {
    extend: {},
  },
  plugins: [
    daikinPlugin(),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".text-wrap": {
          // https://ics.media/entry/240411/
          "overflow-wrap": "anywhere",
          "word-break": "normal",
          "line-break": "strict",
        },
      });
    }),
  ],
});
