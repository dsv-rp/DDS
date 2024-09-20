// Run `npx vite` and visit http://localhost:5173/sandbox-data-table

import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { guard } from "lit/directives/guard.js";
import { repeat } from "lit/directives/repeat.js";
import tailwindStyles from "../tailwind.css?inline";

@customElement("example-data-table")
export class ExampleDataTable<
  T extends { id: number | string },
> extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
    }
  `;

  @property({ type: Number, reflect: true })
  currentPage = 0;

  @property({ type: Number, reflect: true })
  itemsPerPage = 20;

  @property({ type: Array, attribute: false })
  rows: Extract<keyof T, string | number>[] = [];

  @property({ type: Array, attribute: false })
  items: T[] = [];

  @state()
  filteredItems: T[] = [];

  updateFilteredItems() {
    this.filteredItems = this.items.slice(
      this.currentPage * this.itemsPerPage,
      this.currentPage * this.itemsPerPage + this.itemsPerPage
    );
    this.dispatchEvent(
      new CustomEvent("update", {
        detail: {
          items: this.filteredItems,
        },
        bubbles: true,
      })
    );
  }

  constructor() {
    super();
    this.updateFilteredItems();
  }

  override updated(changedProperties: PropertyValues): void {
    if (
      changedProperties.has("items") ||
      changedProperties.has("rows") ||
      changedProperties.has("itemsPerPage") ||
      changedProperties.has("currentPage")
    ) {
      this.updateFilteredItems();
    }
  }

  override render() {
    console.log("RENDER TABLE");

    const createRow = (item: T) =>
      this.rows.map(
        (row) =>
          html`<td>
            <slot name=${`cell:${item.id}:${row}`}>${item[row]}</slot>
          </td>`
      );

    return html`<label>
        Page:
        <input
          class="border"
          type="number"
          .value=${String(this.currentPage)}
          min="0"
          @change=${(e: Event) => {
            this.currentPage = Number((e.target as HTMLInputElement).value);
            this.updateFilteredItems();
          }}
        />
      </label>
      <label>
        ItemsPerPage:
        <input
          class="border"
          type="number"
          .value=${String(this.itemsPerPage)}
          min="1"
          @change=${(e: Event) => {
            this.itemsPerPage = Number((e.target as HTMLInputElement).value);
            this.updateFilteredItems();
          }}
        />
      </label>
      <table>
        <thead>
          <tr>
            ${repeat(
              this.rows,
              (row) => row,
              (row) => html`<th><slot name=${`head:${row}`}>${row}</slot></th>`
            )}
          </tr>
        </thead>
        <tbody>
          ${repeat(
            this.filteredItems,
            (item) => item.id,
            (item) =>
              html`<tr>
                ${createRow(item)}
              </tr>`
          )}
        </tbody>
      </table>`;
  }
}

type Item = { id: number; col1: string; col2: string };

@customElement("example-data-table-renderer")
export class ExampleDataTableRenderer extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
    }
  `;

  @property({ type: Number, reflect: true })
  numItems = 100000;

  @state()
  rows = ["col1", "col2"];

  @state()
  items: readonly Item[] = [];

  @state()
  activeItems: readonly Item[] = [];

  @state()
  lastClicked = "";

  handleButtonClick(event: Event): void {
    this.lastClicked = (event.target as HTMLElement).slot;
  }

  override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("numItems")) {
      this.items = new Array(this.numItems).fill(0).map((_, index) => ({
        id: index,
        col1: `Example Column 1 at Row ${index + 1}`,
        col2: `Example Column 2 at Row ${index + 1}`,
      }));
    }
  }

  override render() {
    console.log("RENDER RENDERER");

    return html`
      <label>
        Items:
        <input
          class="border"
          type="number"
          .value=${String(this.numItems)}
          min="0"
          @change=${(e: Event) =>
            (this.numItems = Number((e.target as HTMLInputElement).value))}
        />
      </label>
      <div>Last Clicked: <code>${this.lastClicked || "none"}</code></div>
      <div>
        <example-data-table
          .rows=${this.rows}
          .items=${this.items}
          @update=${(event: CustomEvent<{ items: Item[] }>) => {
            this.activeItems = event.detail.items;
          }}
        >
          ${guard(this.activeItems, () =>
            repeat(
              this.activeItems,
              ({ id }) => id,
              ({ id, col2 }) =>
                html`<button
                  class="border px-2 bg-blue-100"
                  slot=${`cell:${id}:col2`}
                  @click=${this.handleButtonClick}
                >
                  ${col2}
                </button>`
            )
          )}
        </example-data-table>
      </div>
    `;
  }
}
