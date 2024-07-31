import fg from "fast-glob";
import fsp from "node:fs/promises";
import { basename } from "node:path";

export async function createLinkMap(
  projectDir: string
): Promise<Map<string, string>> {
  const linkMap = new Map<string, string>();
  const files = await fg("src/components/**/daikin-*.stories.ts", {
    cwd: projectDir,
    absolute: true,
  });
  for (const file of files) {
    const componentName = basename(file, ".stories.ts");
    const content = await fsp.readFile(file, "utf-8");
    const pageName = /\n\s+title: "([^"]+)",\n/.exec(content)?.[1];
    if (!pageName) {
      continue;
    }

    const href = `?path=/docs/${pageName.toLowerCase().replace(/[^a-z\d]/g, "-")}--docs`;
    linkMap.set(componentName, href);
  }

  return linkMap;
}

export function linkify(
  markdown: string,
  linkMap: ReadonlyMap<string, string>,
  linkExcludes: readonly string[]
): string {
  function linkifyInternal(code: string) {
    return code.replace(/`([^`\n]+)`/g, (all, name: string) => {
      const href = linkMap.get(name);
      return href && !linkExcludes.includes(name) ? `[${name}](${href})` : all;
    });
  }

  // Make component names in inline code outside of code blocks into links.
  return markdown
    .split(/(```[\s\S]+?```)/)
    .map((value, i) => (i % 2 === 0 ? linkifyInternal(value) : value))
    .join("");
}
