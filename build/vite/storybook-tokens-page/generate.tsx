/** @jsx jsx */
/** @jsxRuntime automatic */
/** @jsxImportSource hono/jsx */

import darkTokens from "@daikin-oss/dds-tokens/json/daikin/Dark/tokens.json" with { type: "json" };
import baseTokens from "@daikin-oss/dds-tokens/json/daikin/Light/tokens.json" with { type: "json" };
import { Fragment } from "hono/jsx/jsx-runtime";
import { readFile } from "node:fs/promises";
import { TYPE_DESCRIPTION_MAP } from "./token-description";
import {
  unifyTokenType,
  type SDTokenType,
  type UnifiedTokenType,
} from "./unify-token-type";

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

  :root {
    --page-fg: #414141;
    --page-bg: #ffffff;
    --link-fg: #00689a;
    --code-bg: rgba(0, 0, 0, 0.04);
    --box-border: #000000;

    background: var(--page-bg);
    color: var(--page-fg);
  }

  :root.dark {
    --page-fg: #dcdcdc;
    --page-bg: #212121;
    --link-fg: #76cff4;
    --code-bg: rgba(255, 255, 255, 0.05);
    --box-border: #ffffff;

    color-scheme: dark;
  }

  :root, body {
    width: 100%;
    height: 100%;
  }

  a {
    color: var(--link-fg);
  }

  button {
    background: none;
    font-size: 1rem;
    color: var(--link-fg);
  }

  .container {
    width: 100%;
    max-width: 1000px;

    margin: auto;
    padding: 1rem;

    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }

  .container > * {
    flex: 0 0 auto;
  }

  .controls {
    display: flex;
    flex-flow: row wrap;
    gap: 0.75rem 2rem;
  }

  h1 {
    font-size: 2rem;
  }

  .table-container {
    width: 100%;
    max-height: calc(100dvh - 12rem);
    min-height: 8rem;
    overflow: auto;
  }

  @media (min-width: 1016px) {
    .table-container.expanded {
      width: calc(100svw - 2rem);
      margin: 0 calc(500px - 50svw);
    }

    .table-container.expanded table {
      margin: auto;
    }

    #expand-table {
      display: inline-block !important;
      margin-top: 1rem;
    }
  }

  .table-container table {
    white-space: nowrap;
    flex: 1 1 0;
  }

  .table-container thead th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--page-bg);
  }

  .table-container th,
  .table-container td {
    text-align: left;
    padding-right: 1.75rem;
    line-height: 2.5;
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
    border: solid 1px var(--box-border);
  }

  [data-category="borderWidth"] .value-box {
    display: inline-block;
  }

  [data-category="borderWidth"] .value-box::before {
    content: "";
    height: var(--value);
    background: var(--box-border);
  }

  [data-category="spacing"] .value-box {
    display: inline-block;
    width: calc(var(--value) + 2px);
    border-left: solid 1px var(--box-border);
    border-right: solid 1px var(--box-border);
  }

  [data-category="spacing"] .value-box::before {
    content: "";
    height: 1px;
    background: var(--box-border);
  }

  /* Tailwind CSS Usage */

  .tw-container h2 {
    font-size: 1.5rem;
    margin-top: 1.5rem;
    margin-bottom: -0.5rem;
  }

  .tw-container h3 {
    font-size: 1.125rem;
    font-weight: bold;
    margin-top: 2.5rem;
  }

  .tw-container p {
    margin: 1rem 0;
  }

  .tw-container ul {
    margin-left: 1.25rem;
  }

  .tw-container li:not(:last-of-type) {
    margin-bottom: 0.25rem;
  }
`;

const PAGE_JS = `
  const sp = new URLSearchParams(location.search);
  const filter = sp.get("filter")?.split(",") ?? [];
  const iframe = sp.get("iframe") === "1";

  if (filter.length) {
    for (const row of document.querySelectorAll("tr[data-id]")) {
      if (filter.includes(row.dataset.id)) {
        continue;
      }

      row.hidden = true;
    }

    if (!iframe) {
      const resetFilter = document.querySelector("a#reset-filter");
      resetFilter.href = location.pathname;
      resetFilter.hidden = false;
    }
  }

  if (iframe) {
    const openInNewWindow = document.querySelector("a#open-in-new-window");
    openInNewWindow.href = \`\${location.pathname}\${filter.length ? \`?filter=\${filter.join(",")}\` : ""}\`;
    openInNewWindow.hidden = false;
  }

  const expandTable = document.querySelector("button#expand-table");
  expandTable.addEventListener("click", () => {
    const tableContainer = document.querySelector(".table-container");
    tableContainer.classList.toggle("expanded");
  });

  const switchTheme = document.querySelector("button#switch-theme");
  switchTheme.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
  });
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
          <div class="controls">
            <a id="open-in-new-window" target="_blank" href="#" hidden>
              Open in new window
            </a>
            <a id="reset-filter" href="." hidden>
              Reset filter
            </a>
            <button id="switch-theme">Switch Theme</button>
          </div>
          <div>
            <div class="table-container">
              <table id="table">
                <thead>
                  <th class="cell-token-name">Token Name</th>
                  <th class="cell-css-var-name">CSS Variable Name</th>
                  <th class="cell-category">Category</th>
                  <th class="cell-value-light">Value</th>
                  <th class="cell-value-dark">Value (Dark)</th>
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
                      <td class="cell-value-light">
                        <TokenValue value={token.baseValue} />
                      </td>
                      <td class="cell-value-dark">
                        <TokenValue value={token.darkValue} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button id="expand-table" hidden>
              Expand table
            </button>
          </div>
          <div class="tw-container">
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
        <script dangerouslySetInnerHTML={{ __html: PAGE_JS }}></script>
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
  return "<!DOCTYPE html>" + rendered.toString();
}
