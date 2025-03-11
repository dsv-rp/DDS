import darkTokens from "@daikin-oss/dds-tokens/json/daikin/Dark/tokens.json" with { type: "json" };
import baseTokens from "@daikin-oss/dds-tokens/json/daikin/Light/tokens.json" with { type: "json" };
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

/** Token type of style-dictionary */
type SDTokenType =
  | "border"
  | "color"
  | "dimension"
  | "fontFamily"
  | "fontSize"
  | "fontWeight"
  | "lineHeight"
  | "shadow"
  | "typography";

type UnifiedTokenType =
  | SDTokenType
  | "borderRadius"
  | "borderWidth"
  | "spacing"
  | "sizing";

const TYPE_NAME_MAP = {
  border: "Border",
  borderRadius: "Border Radius",
  borderWidth: "Border Width",
  color: "Color",
  dimension: "Dimension",
  fontFamily: "Font Family",
  fontSize: "Font Size",
  fontWeight: "Font Weight",
  lineHeight: "Line Height",
  shadow: "Shadow",
  sizing: "Sizing",
  spacing: "Spacing",
  typography: "Typography",
} satisfies Record<UnifiedTokenType, string>;

function fromProjectDir(path: string): string {
  return fileURLToPath(new URL(`../../../${path}`, import.meta.url));
}

function unifyTokenType(
  sdType: SDTokenType,
  tsType: string | null
): UnifiedTokenType {
  switch (tsType) {
    case "borderWidth":
    case "borderRadius":
    case "sizing":
    case "spacing":
      return tsType;

    default:
      return sdType;
  }
}

function escapeHTML(str: string): string {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function dumpTokenValue(value: string | null): string {
  if (!value) {
    return "";
  }

  return `<span class="value-container" style="--value:${escapeHTML(value)}"><span class="value-box"></span><span class="value">${escapeHTML(value)}</span></span>`;
}

export async function generateTokensHTML(): Promise<string> {
  const template = await readFile(
    fileURLToPath(new URL("template.html", import.meta.url)),
    "utf-8"
  );

  const tokensVersion = (
    JSON.parse(
      await readFile(
        fromProjectDir("node_modules/@daikin-oss/dds-tokens/package.json"),
        "utf-8"
      )
    ) as { version: string }
  ).version;

  const tokenList = Object.entries(baseTokens)
    .map(([name, [baseValue, sdType, tsType]]) => ({
      name,
      baseValue: baseValue as string,
      darkValue:
        (
          darkTokens as unknown as Partial<
            Record<string, [string, unknown, unknown]>
          >
        )[name]?.[0] ?? null,
      type: unifyTokenType(sdType as SDTokenType, tsType),
      typeName: TYPE_NAME_MAP[unifyTokenType(sdType as SDTokenType, tsType)],
    }))
    .toSorted(
      (a, b) =>
        a.typeName.localeCompare(b.typeName) || a.name.localeCompare(b.name)
    );

  let table = "";
  for (const token of tokenList) {
    table += `          <tr id="token-${escapeHTML(token.name)}" data-id="${escapeHTML(token.name)}" data-category="${escapeHTML(token.type)}">`;
    table += `<td class="cell-token-name"><code>${escapeHTML(token.name.replaceAll("-", "."))}</code></td>`;
    table += `<td class="cell-css-var-name"><code>--dds-${escapeHTML(token.name)}</code></td>`;
    table += `<td class="cell-category">${escapeHTML(token.typeName)}</td>`;
    table += `<td class="cell-value-base">${dumpTokenValue(token.baseValue)}</td>`;
    table += `<td class="cell-value-dark">${dumpTokenValue(token.darkValue)}</td>`;
    table += `</tr>\n`;
  }
  table = table.trim();

  let html = template;
  html = html.replaceAll("{{ DDS_TOKENS_VERSION }}", tokensVersion);
  html = html.replaceAll("{{ TOKENS_TABLE_BODY }}", table);
  return html;
}
