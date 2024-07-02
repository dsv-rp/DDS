const fs = require("node:fs");
const path = require("node:path");

/**
 * @typedef {Required<Required<import("@egoist/tailwindcss-icons").IconsPluginOptions>["collections"]>[string]} IconSet
 * @typedef {Required<IconSet>["icons"][string]} IconData
 */

/**
 * @param {string} filename
 * @param {string} content
 * @returns {IconData}
 */
function parseSVG(filename, content) {
  const match = content.match(/^<svg [^>]*viewBox="([^"]+)"/);
  if (!match) {
    throw new Error(`SVG viewBox missing in ${filename}`);
  }

  const [left, top, width, height] = match[1]
    .split(/\s+/)
    .map((value) => Number(value));

  let body = content.match(/^<svg [^>]+>([\s\S]+)<\/svg>\s*/)?.[1].trim();
  if (!body) {
    throw new Error(`SVG body missing in ${filename}`);
  }

  // perform some minification
  body = body.trim().replace(/\s+/g, " ").replace(/>\s+</g, "><");

  return {
    left,
    top,
    width,
    height,
    body,
  };
}

/**
 * @param {string} dir
 * @returns {Record<string, IconData>}
 */
function loadIcons(dir) {
  /** @type {[string, IconData][]} */
  const icons = [];

  const filenames = fs.readdirSync(dir).sort();
  for (const filename of filenames) {
    if (!filename.endsWith(".svg")) {
      continue;
    }

    const content = parseSVG(
      filename,
      fs.readFileSync(path.resolve(dir, filename), "utf-8")
    );

    const key = filename.replace(/\.svg$/, "");
    icons.push([key, content]);
  }

  return Object.fromEntries(icons);
}

module.exports = { loadIcons };
