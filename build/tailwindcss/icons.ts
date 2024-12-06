import type { IconsPluginOptions } from "@egoist/tailwindcss-icons";
import fs from "node:fs";
import path from "node:path";

export type IconSet = Required<
  Required<IconsPluginOptions>["collections"]
>[string];

export type IconData = Required<IconSet>["icons"][string];

function parseSVG(filename: string, content: string): IconData {
  const match = /^<svg [^>]*viewBox="([^"]+)"/.exec(content);
  if (!match) {
    throw new Error(`SVG viewBox missing in ${filename}`);
  }

  const [left, top, width, height] = match[1]
    .split(/\s+/)
    .map((value) => Number(value));

  let body = /^<svg [^>]+>([\s\S]+)<\/svg>\s*/.exec(content)?.[1].trim();
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

export function loadIcons(dir: string): Record<string, IconData> {
  const icons: [string, IconData][] = [];

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
