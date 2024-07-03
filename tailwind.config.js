const plugin = require('tailwindcss/plugin');

const { iconsPlugin } = require("@egoist/tailwindcss-icons");

// @ts-expect-error no type definitions for @daikin-oss/tailwind
const daikinPlugin = require("@daikin-oss/tailwind");

/**
 * @param {import('tailwindcss').Config} config
 * @returns {import('tailwindcss').Config}
 */
function defineConfig(config) {
    return config;
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
            'notification-status-positive': {
                body: '<path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#ffffff" />',
                width: 24,
                height: 24,
            },
            'notification-status-negative': {
                body: '<path d="M1 22H23L12 3L1 22ZM13 19H11V17H13V19ZM13 15H11V11H13V15Z" fill="#ffffff" />',
                width: 24,
                height: 24,
            },
            'notification-status-warning': {
                body: '<path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#ffffff" />',
                width: 24,
                height: 24,
            },
            'notification-status-alarm': {
                body: '<path d="M18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM13 16H11V14H13V16ZM13 12H11V8H13V12ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.89 22 12 22Z" fill="#ffffff" />',
                width: 24,
                height: 24,
            },
            'notification-status-information': {
                body: '<path d="M12 1.19995C6.03841 1.19995 1.20001 6.03835 1.20001 12C1.20001 17.9615 6.03841 22.7999 12 22.7999C17.9616 22.7999 22.8 17.9615 22.8 12C22.8 6.03835 17.9616 1.19995 12 1.19995ZM13.08 17.4H10.92V10.92H13.08V17.4ZM13.08 8.75995H10.92V6.59995H13.08V8.75995Z" fill="#ffffff" />',
                width: 24,
                height: 24,
            },
            'notification-close': {
                body: '<path fill-rule="evenodd" clip-rule="evenodd" d="M16.75 1L10 7.75L3.24887 1L1 3.25112L7.75 10L1 16.75L3.24887 19L10 12.25L16.75 19L19 16.75L12.2489 10L19 3.25112L16.75 1Z" fill="#A0A0A0"/>',
                width: 20,
                height: 20,
            },
            'input-group-error': {
                body: '<path d="M8 15.9999C3.58155 15.9999 0 12.4183 0 7.99988C0 3.58143 3.58155 -0.00012207 8 -0.00012207C12.4185 -0.00012207 16 3.58143 16 7.99988C16 12.4183 12.4185 15.9999 8 15.9999Z" fill="#FF4949"/><path d="M7.97043 2.85352C7.31776 2.85352 6.82391 3.19413 6.82391 3.74429V8.79045C6.82391 9.34119 7.31769 9.68065 7.97043 9.68065C8.60718 9.68065 9.11695 9.32698 9.11695 8.79045V3.74429C9.11689 3.20719 8.60718 2.85352 7.97043 2.85352Z" fill="white"/><path d="M7.97045 10.8175C7.34338 10.8175 6.83304 11.3278 6.83304 11.9554C6.83304 12.5819 7.34338 13.0923 7.97045 13.0923C8.59751 13.0923 9.10728 12.5819 9.10728 11.9554C9.10722 11.3278 8.59751 10.8175 7.97045 10.8175Z" fill="white"/>',
                width: 16,
                height: 16,
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

