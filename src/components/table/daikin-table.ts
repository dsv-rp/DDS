import {
  tableColorBackground,
  tableColorText,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaCell = cva(["py-4", "min-w-24", "max-w-60"], {
  variants: {
    align: {
      left: ["pl-6", "pr-8", "text-left"],
      right: ["pl-6", "pr-6", "text-right"],
    },
  },
});

/**
 * The table component is a component that can display multiple data objects in a tabular format.
 *
 * It is modeled on the HTML `<table>` element. However, unlike a normal `<table>` element, this component does not require its child elements to have cells. Instead, it can be made to function as a table by giving the properties `headers` and `rows` appropriate arrays.
 *
 * @example
 *
 * ```html
 * <daikin-table
 *   .headers="[
 *     { key: 'name', label: 'Name', align: 'left' },
 *     { key: 'season', label: 'Season', align: 'left' },
 *     { key: 'price', label: 'Price', align: 'right' },
 *   ]"
 *   .rows="[
 *     { id: '1', name: 'Apple', season: 'Autumn', price: '$2' },
 *     { id: '2', name: 'Peach', season: 'Summer', price: '$4' },
 *     { id: '3', name: 'Orange', season: 'Winter', price: '$1' },
 *     { id: '4', name: 'Strawberry', season: 'Spring', price: '$4' },
 *   ]"
 * ></daikin-table>
 * ```
 */
@customElement("daikin-table")
export class DaikinTable extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --table-color-text: ${unsafeCSS(tableColorText)};
      --table-color-background: ${unsafeCSS(tableColorBackground)};

      display: block;
      width: max-content;
    }
  `;

  /**
   * Headers of the table.
   * The value of `key` corresponds to the key, excluding the id of rows.
   * As a whole array, the value of `key` must be unique.
   */
  @property({ type: Array, attribute: false })
  headers: { key: string; label: string; align: "left" | "right" }[] = [];

  /**
   * Rows of the table.
   * An array that uses the element `key` in the column as the key and stores the corresponding value.
   * As a whole array, the value of `id` should be unique.
   */
  @property({ type: Array, attribute: false })
  rows: ({ id: string } & {
    [key in (typeof this.headers)[number]["key"]]: string;
  })[] = [];

  override render() {
    if (import.meta.env.DEV) {
      if (
        this.headers.length !==
        [...new Set(this.headers.map(({ key }) => key))].length
      ) {
        console.warn("The `key` values in `headers` are duplicated");
      }

      if (
        this.rows.length !== [...new Set(this.rows.map(({ id }) => id))].length
      ) {
        console.warn("The `id` values in `rows` are duplicated");
      }
    }

    return html`<table
      class="bg-[--table-color-background] font-daikinSerif table-fixed text-[15px] leading-[22px]"
    >
      <thead class="text-[#212121] border-b border-b-black font-medium">
        <tr>
          ${this.headers.map(
            ({ label, align }) =>
              html`<th class=${cvaCell({ align })}>${label}</th>`
          )}
        </tr>
      </thead>
      <tbody class="text-[--table-color-text]">
        ${this.rows.map(
          (row) =>
            html`<tr class="border-b border-b-[#EBEBEB]">
              ${this.headers.map(
                ({ key, align }) =>
                  html`<td class=${cvaCell({ align })}>${row[key]}</td>`
              )}
            </tr>`
        )}
      </tbody>
    </table>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-table": DaikinTable;
  }
}

export default DaikinTable;
