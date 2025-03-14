import { readFile } from "node:fs/promises";
import path from "node:path";

async function detectUsedTokensUnfiltered(filename: string): Promise<string[]> {
  const content = await readFile(filename, "utf-8");

  const tokens = Array.from(
    content.matchAll(/(?:--dds-|\bddt-)([A-Za-z\d-]+)/g)
  ).map((match) => match[1]);

  const externalFiles = Array.from(
    content.matchAll(/@tokenImports\s+(\S+)/g)
  ).map((match) => match[1]);
  for (const file of externalFiles) {
    tokens.push(
      ...(await detectUsedTokensUnfiltered(
        path.join(path.dirname(filename), file)
      ))
    );
  }

  return tokens;
}

export async function detectUsedTokens(filename: string): Promise<string[]> {
  return Array.from(new Set(await detectUsedTokensUnfiltered(filename))).sort();
}
