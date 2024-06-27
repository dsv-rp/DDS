const daikinPlugin = require("@daikin-oss/tailwind");

/**
 * @param {import("tailwindcss").Config} config
 * @returns {import("tailwindcss").Config}
 */
function defineConfig(config) {
  return config;
}

module.exports = defineConfig({
  content: [
    "./src/**/*.{js,ts}",
    "!./src/**/*.stories.{js,ts}",
    "!./src/**/*.test.{js,ts}",
  ],
  plugins: [daikinPlugin()],
});
