/** @type {import('tailwindcss').Config} */
const daikinPlugin = require('@daikin-oss/tailwind');

module.exports = {
    content: ['./src/**/*.ts|js'],
    theme: {
        extend: {}
    },
    plugins: [daikinPlugin()]
};
