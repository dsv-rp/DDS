/** @type {import('tailwindcss').Config} */
const daikinPlugin = require('@daikin-dsv/tailwind');

module.exports = {
    content: ['./src/**/*.ts|js'],
    theme: {
        extend: {}
    },
    plugins: [daikinPlugin()]
};
