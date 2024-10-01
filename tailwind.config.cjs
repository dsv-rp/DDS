/* globals __filename */

const { createJiti } = require("jiti");
const jiti = createJiti(__filename, {
  interopDefault: true,
});

//eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
module.exports = /** @type {import("./build/tailwindcss")["default"]} */ (
  jiti("./build/tailwindcss")
);
