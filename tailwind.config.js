const { iconsPlugin } = require('@egoist/tailwindcss-icons');

/**
 * @param {import('tailwindcss').Config} config
 * @returns {import('tailwindcss').Config}
 */
function defineConfig(config) {
  return config
}

const plugin = require('tailwindcss/plugin');

// @ts-expect-error no type definitions for @daikin-oss/tailwind
const daikinPlugin = require('@daikin-oss/tailwind');

module.exports = defineConfig({
    content: ['./src/**/*.ts|js'],
    theme: {
        extend: {},
    },
    plugins: [
        daikinPlugin(),
        iconsPlugin({
            collections: {
                daikin: {
                    icons: {
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

