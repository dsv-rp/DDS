const { iconsPlugin } = require("@egoist/tailwindcss-icons");

/** @type {import('tailwindcss').Config} */
const daikinPlugin = require("@daikin-oss/tailwind");

module.exports = {
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
  ],
};
