/** @jsx jsx */
/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */

import darkTokens from "@daikin-oss/dds-tokens/json/daikin/Dark/tokens.json" with { type: "json" };
import baseTokens from "@daikin-oss/dds-tokens/json/daikin/Light/tokens.json" with { type: "json" };
import { Fragment } from "hono/jsx/jsx-runtime";
import { readFile } from "node:fs/promises";
import { TYPE_DESCRIPTION_MAP } from "./tokenDescription";
import {
  unifyTokenType,
  type SDTokenType,
  type UnifiedTokenType,
} from "./unifyTokenType";

const PAGE_CSS = `
  /* Preflight CSS from Tailwind CSS */

  *,
  ::after,
  ::before,
  ::backdrop,
  ::file-selector-button {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0 solid;
  }

  html,
  :host {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
    font-family: var(
      --default-font-family,
      ui-sans-serif,
      system-ui,
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
      "Noto Color Emoji"
    );
    font-feature-settings: var(--default-font-feature-settings, normal);
    font-variation-settings: var(--default-font-variation-settings, normal);
    -webkit-tap-highlight-color: transparent;
  }

  body {
    line-height: inherit;
  }

  hr {
    height: 0;
    color: inherit;
    border-top-width: 1px;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: inherit;
    font-weight: inherit;
  }

  a {
    color: inherit;
    -webkit-text-decoration: inherit;
    text-decoration: inherit;
  }

  b,
  strong {
    font-weight: bolder;
  }

  code,
  kbd,
  samp,
  pre {
    font-family: var(
      --default-mono-font-family,
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Monaco,
      Consolas,
      "Liberation Mono",
      "Courier New",
      monospace
    );
    font-feature-settings: var(--default-mono-font-feature-settings, normal);
    font-variation-settings: var(
      --default-mono-font-variation-settings,
      normal
    );
    font-size: 1em;
  }

  table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse;
  }

  [hidden]:where(:not([hidden="until-found"])) {
    display: none !important;
  }

  /* Our CSS */

  :root,
  body {
    width: 100%;
    height: 100%;

    --page-fg: #121212;
    --page-bg: #fafafa;
    --table-header-fg: inherit;
    --table-header-bg: #fafafa;
    --link-fg: #00689a;
    --code-bg: rgba(0, 0, 0, 0.05);
  }

  :root {
    background: var(--page-bg);
    color: var(--page-fg);
  }

  a {
    color: var(--link-fg);
  }

  .container {
    padding: 1rem;
    width: 100%;
    height: 100%;
    overflow: auto;

    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }

  .container > * {
    flex: 0 0 auto;
  }

  h1 {
    font-size: 2rem;
  }

  #table {
    white-space: nowrap;
    flex: 1 1 0;
  }

  thead th {
    position: sticky;
    top: -1rem;
    z-index: 1;
    background: var(--table-header-bg);
    color: var(--table-header-fg);
  }

  th,
  td {
    text-align: left;
    padding-right: 0.5rem;
    line-height: 2;
  }

  code {
    background: var(--code-bg);
    border-radius: 0.25rem;
    padding: 0 0.5rem;
  }

  .value-container {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    gap: 0.5rem;
  }

  .value-box {
    display: none;
    width: 0.75rem;
    height: 0.75rem;
    position: relative;
  }

  .value-box::before {
    display: inline-block;
    position: absolute;
    inset: 0;
    margin: auto;
    width: 100%;
    height: 100%;
  }

  [data-category="color"] .value-box {
    display: inline-block;
    background: var(--value);
    border: solid 1px black;
  }

  [data-category="borderWidth"] .value-box {
    display: inline-block;
  }

  [data-category="borderWidth"] .value-box::before {
    content: "";
    height: var(--value);
    background: black;
  }

  [data-category="spacing"] .value-box {
    display: inline-block;
    width: calc(var(--value) + 2px);
    border-left: solid 1px black;
    border-right: solid 1px black;
  }

  [data-category="spacing"] .value-box::before {
    content: "";
    height: 1px;
    background: black;
  }

  /* Tailwind CSS Usage */

  h2 {
    font-size: 1.5rem;
    margin-top: 1rem;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: bold;
    margin-top: 1.5rem;
  }

  p {
    margin: 0.5rem 0;
  }

  ul {
    margin-left: 1.25rem;
  }
`;

const PAGE_JS = `
  const sp = new URLSearchParams(location.search);

  const filter = sp.get("filter")?.split(",") ?? [];
  if (filter.length) {
    for (const row of document.querySelectorAll("tr[data-id]")) {
      if (filter.includes(row.dataset.id)) {
        continue;
      }

      row.hidden = true;
    }
  }

  if (sp.get("iframe") === "1") {
    const openInNewWindow = document.querySelector("a#open-in-new-window");
    openInNewWindow.href = \`\${location.pathname}\${filter.length ? \`?filter=\${filter.join(",")}\` : ""}\`;
    openInNewWindow.hidden = false;
  }
`;

interface TokenData {
  name: string;
  baseValue: string;
  darkValue: string | null;
  type: UnifiedTokenType;
  typeName: string;
}

function fromProjectDir(path: string): string {
  return path;
}

function headingToId(heading: string): string {
  return heading.toLowerCase().replace(/\s+/g, "-");
}

function TokenValue({ value }: { value: string | null }) {
  if (!value) {
    return <Fragment />;
  }

  return (
    <span class="value-container" style={{ "--value": value }}>
      <span class="value-box"></span>
      <span class="value">{value}</span>
    </span>
  );
}

function TokenPage({
  tokensVersion,
  tokens,
}: {
  tokensVersion: string;
  tokens: readonly TokenData[];
}) {
  const tailwindCategories = Object.values(TYPE_DESCRIPTION_MAP).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>DDS Design Tokens v{tokensVersion}</title>
        <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }}></style>
      </head>
      <body>
        <div class="container">
          <h1 id="title">DDS Design Tokens v{tokensVersion}</h1>
          <a id="open-in-new-window" target="_blank" href="#" hidden>
            Open in new window
          </a>
          <table id="table">
            <thead>
              <th>Token Name</th>
              <th>CSS Variable Name</th>
              <th>Category</th>
              <th>Value</th>
              <th>Value (Dark Mode)</th>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr
                  id={token.name}
                  data-id={token.name}
                  data-category={token.type}
                >
                  <td class="cell-token-name">
                    <code>{token.name.replaceAll("-", ".")}</code>
                  </td>
                  <td class="cell-css-var-name">
                    <code>--dds-{token.name}</code>
                  </td>
                  <td class="cell-category">
                    <a href={`#${headingToId(token.typeName)}`}>
                      {token.typeName}
                    </a>
                  </td>
                  <td class="cell-value-base">
                    <TokenValue value={token.baseValue} />
                  </td>
                  <td class="cell-value-dark">
                    <TokenValue value={token.darkValue} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <h2 id="tailwindcss">Tailwind CSS Usage</h2>
            {tailwindCategories.map((category) => (
              <Fragment key={category.name}>
                <h3 id={headingToId(category.name)}>{category.name}</h3>
                <p>{category.description}</p>
                <ul>
                  {category.tailwindUsages.map((item) => (
                    <li key={item.exampleClass}>
                      {item.url && (
                        <Fragment>
                          <a href={item.url} target="_blank">
                            {item.url.replace(/.+\//, "")}
                          </a>
                          {" - "}
                        </Fragment>
                      )}
                      e.g. <code>{item.exampleClass}</code>
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </div>
        </div>
        <style dangerouslySetInnerHTML={{ __html: PAGE_JS }}></style>
      </body>
    </html>
  );
}

export async function generateTokensHTML(): Promise<string> {
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
      typeName:
        TYPE_DESCRIPTION_MAP[unifyTokenType(sdType as SDTokenType, tsType)]
          .name,
    }))
    .sort(
      (a, b) =>
        a.typeName.localeCompare(b.typeName) || a.name.localeCompare(b.name)
    );

  const rendered = (
    <TokenPage tokens={tokenList} tokensVersion={tokensVersion} />
  );

  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  return rendered.toString();
}
