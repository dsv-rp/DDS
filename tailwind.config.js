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
              "radio-checked": {
                body: `<svg width="49" height="14" viewBox="0 0 49 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7 0C3.136 0 0 3.136 0 7C0 10.864 3.136 14 7 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 7 0ZM7 12.6C3.906 12.6 1.4 10.094 1.4 7C1.4 3.906 3.906 1.4 7 1.4C10.094 1.4 12.6 3.906 12.6 7C12.6 10.094 10.094 12.6 7 12.6ZM7 10.5C8.933 10.5 10.5 8.933 10.5 7C10.5 5.067 8.933 3.5 7 3.5C5.067 3.5 3.5 5.067 3.5 7C3.5 8.933 5.067 10.5 7 10.5Z" fill="currentColor"/>
                </svg>`,
                top: -1,
                left: -1
              },
              "radio-unchecked": {
                body: `<svg width="49" height="14" viewBox="0 0 49 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 7C0 3.136 3.136 0 7 0C10.864 0 14 3.136 14 7C14 10.864 10.864 14 7 14C3.136 14 0 10.864 0 7ZM1.4 7C1.4 10.094 3.906 12.6 7 12.6C10.094 12.6 12.6 10.094 12.6 7C12.6 3.906 10.094 1.4 7 1.4C3.906 1.4 1.4 3.906 1.4 7Z" fill="currentColor"/>
                </svg>
                `,
                top: -1,
                left: -1
              },
            },
          },
      },
    }),
  ],
};
