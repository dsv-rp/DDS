import {
  tableColorBackground,
  tableColorText,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../checkbox/daikin-checkbox";
import "../dropdown-item/daikin-dropdown-item";
import "../dropdown/daikin-dropdown";
import "../pagination/daikin-pagination";
import "../text-input/daikin-text-input";

const cvaCell = cva(["flex", "items-center", "w-full", "min-h-14", "p-4"], {
  variants: {
    align: {
      left: [],
      right: ["justify-end"],
    },
    sort: {
      false: [],
      true: [
        "items-center",
        "gap-2",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:-outline-offset-2",
        "focus-visible:outline-daikinBlue-700",

        "after:size-6",
        "after:text-daikinNeutral-800",
        "after:i-daikin-sort-chevron-up-and-down",
      ],
    },
  },
});

const cvaRow = cva(
  [
    "border-b",
    "border-b-daikinNeutral-300",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-daikinBlue-700",
  ],
  {
    variants: {
      selected: {
        false: [
          "bg-white",
          "hover:bg-daikinNeutral-100",
          "active:bg-daikinNeutral-200",
        ],
        true: [
          "bg-daikinBlue-50",
          "hover:bg-daikinBlue-50",
          "active:bg-daikinBlue-100",
        ],
      },
    },
  }
);

/**
 * The table component is a component that can display multiple data objects in a tabular format.
 *
 * It is modeled on the HTML `<table>` element. However, unlike a normal `<table>` element, this component does not require its child elements to have cells. Instead, it can be made to function as a table by giving the properties `headers` and `rows` appropriate arrays.
 *
 * If the contents of the table are plain text only, give them to the `rows` property. However, if you want to give contents other than text, such as buttons or images, you will need to prepare a element with the corresponding `slot` attribute. The value of this attribute must be structured as follows: ``slot=${`cell:${headers[i].key}:${rows[i].id}`}``
 *
 * The table provides tow functions: checkboxes and sorting, and you can select the functions you need. You can also add any components to the slot to further expand the functions.
 *
 * @fires change-check - When the checkbox is operated, it returns the array of `id`s that are currently checked.
 * @fires change-sort - When the sort is changed, it returns the current sort key and the order (ascending or descending).
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
 * >
 *   <button slot="cell:price:1">$2</button>
 *   <button slot="cell:price:2">$4</button>
 *   <button slot="cell:price:3">$1</button>
 *   <button slot="cell:price:4">$4</button>
 * </daikin-table>
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
      width: 100%;

      daikin-text-input {
        width: 254px;
        height: 42px;
      }
    }
  `;

  /**
   * Headers of the table.
   * The value of `key` corresponds to the key, excluding the id of rows.
   * As a whole array, the value of `key` must be unique. Also, only use alphanumeric characters, `$`, and `_` in the `key`.
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

  /**
   * Whether or not to give the table the function of checkbox
   */
  @property({ type: Boolean, reflect: true, attribute: "has-checkbox" })
  hasCheckbox: boolean = false;

  /**
   * Whether or not to give the table the function of sort
   */
  @property({ type: Boolean, reflect: true, attribute: "has-sort" })
  hasSort: boolean = false;

  /**
   * An array of `id`s for the `rows` that have been checked
   */
  @property({ type: Array, attribute: false })
  checkedIds: string[] = [];

  /**
   * Sort order of the table
   */
  @property({ type: String, attribute: "order-by" })
  orderBy: "asc" | "desc" | null = null;

  /**
   * Specify this when you want to customize the sort function.
   * The function must be ascending, and the return value must be `0`, `1` or `-1`.
   */
  @property({ attribute: false })
  sort:
    | {
        [key in (typeof this.headers)[number]["key"]]?: (
          columnA: (typeof this.rows)[number],
          columnB: (typeof this.rows)[number],
          key: Exclude<keyof (typeof this.rows)[number], "id">
        ) => 0 | 1 | -1;
      }
    | null = null;

  /**
   * The `key` of the currently sorted column
   */
  @property({ type: String, attribute: "sorted-key" })
  sortedKey: string | null = null;

  /**
   * Specify whether the table row is selected
   */
  @property({ type: String, attribute: "selected-row-id" })
  selectedRowId: string | null = null;

  @state()
  private _allItemCheckState: "unchecked" | "indeterminate" | "checked" =
    "unchecked";

  /**
   * An array that performs sorting and searching based on `rows`.
   * It does not manage checks and pagination.
   */
  @state()
  private _showRows: ({ id: string } & {
    [key in (typeof this.headers)[number]["key"]]: string;
  })[] = [];

  private _updateSort() {
    this._showRows = this._showRows.sort((a, b) => {
      if (!this.sortedKey) {
        return 0;
      }

      if (this.sort && !!this.sort[this.sortedKey]) {
        return this.sort[this.sortedKey]?.(a, b, this.sortedKey) ?? 0;
      } else {
        if (a[this.sortedKey] === b[this.sortedKey]) {
          return 0;
        } else if (a[this.sortedKey] > b[this.sortedKey]) {
          return 1;
        } else {
          return -1;
        }
      }
    });

    if (this.orderBy === "desc") {
      this._showRows.reverse();
    }
  }

  private _updateCheck() {
    this.checkedIds = this.checkedIds.filter((checkedId) =>
      this._showRows.find(({ id }) => checkedId === id)
    );

    this._checkHeaderFunction();
  }

  private _emitChangeCheckEvent() {
    this.dispatchEvent(
      new CustomEvent("change-check", {
        detail: {
          checkedIds: this.checkedIds,
        },
      })
    );
  }

  private _updateTable() {
    // Reset rows
    this._showRows = this.rows;

    this._updateSort();
    this._updateCheck();
  }

  private _handleCheckboxRowHeaderChange(): void {
    switch (this._allItemCheckState) {
      case "unchecked":
      case "indeterminate":
        this._allItemCheckState = "checked";
        this.checkedIds = [
          ...new Set([
            ...this.checkedIds,
            ...this._showRows.map(({ id }) => id),
          ]),
        ];
        break;

      case "checked":
        this._allItemCheckState = "unchecked";
        this.checkedIds = this.checkedIds.filter(
          (checkedId) => !this._showRows.find(({ id }) => checkedId === id)
        );
        break;
    }

    this._emitChangeCheckEvent();
  }

  private _handleCheckboxRowItemChange(id: string): void {
    if (this.checkedIds.includes(id)) {
      this.checkedIds = this.checkedIds.filter((checkedId) => checkedId !== id);
    } else {
      this.checkedIds = [...this.checkedIds, id];
    }

    this._checkHeaderFunction();
    this._emitChangeCheckEvent();
  }

  private _handleClickSort(key: string): void {
    if (this.sortedKey === key) {
      this.orderBy = this.orderBy === "asc" ? "desc" : "asc";
    } else {
      this.sortedKey = key;
      this.orderBy = "asc";
    }

    this._updateTable();
    this.dispatchEvent(
      new CustomEvent("change-sort", {
        detail: { key: this.sortedKey, orderBy: this.orderBy },
      })
    );
  }

  private _checkHeaderFunction() {
    const checkedIdLengthInCurrentPage = this._showRows.filter(({ id }) =>
      this.checkedIds.find((checkedId) => checkedId === id)
    ).length;

    this._allItemCheckState =
      this._showRows.length === checkedIdLengthInCurrentPage
        ? "checked"
        : checkedIdLengthInCurrentPage
          ? "indeterminate"
          : "unchecked";
  }

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

    const createRow = (
      item: { id: string } & {
        [key in (typeof this.headers)[number]["key"]]: string;
      }
    ) =>
      this.headers.map(
        ({ key, align }) =>
          html`<td class="p-0">
            <span class=${cvaCell({ align })}>
              <slot name=${`cell:${key}:${item.id}`}>${item[key]}</slot>
            </span>
          </td>`
      );

    return html`<div class="flex flex-col gap-6 w-full font-daikinSerif">
      <table
        class="w-full bg-[--table-color-background] table-fixed leading-[22px]"
      >
        <thead>
          <tr
            class="text-daikinNeutral-900 border-b border-b-daikinNeutral-800 font-bold"
          >
            ${this.hasCheckbox
              ? html`<td class="w-12 h-full p-0">
                  <span
                    class="flex items-center justify-center w-full min-h-14"
                  >
                    <daikin-checkbox
                      name="allItem"
                      .checkState=${this._allItemCheckState}
                      label="Select all"
                      label-position="hidden"
                      @change=${this._handleCheckboxRowHeaderChange}
                    ></daikin-checkbox>
                  </span>
                </td>`
              : nothing}
            ${this.headers.map(
              ({ key, label, align }) =>
                html`<th
                  class="h-full p-0"
                  aria-sort=${ifDefined(
                    this.hasSort && this.sortedKey === key
                      ? this.orderBy === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  )}
                >
                  ${this.hasSort
                    ? html`
                        <button
                          type="button"
                          class=${cvaCell({
                            align,
                            sort: true,
                          })}
                          @click=${() => this._handleClickSort(key)}
                        >
                          ${label}
                        </button>
                      `
                    : html`<span
                        class=${cvaCell({
                          align,
                          sort: false,
                        })}
                      >
                        ${label}
                      </span>`}
                </th>`
            )}
          </tr>
        </thead>
        <tbody class="text-[--table-color-text]">
          ${this._showRows.map(
            (row) =>
              html`<tr
                class=${cvaRow({ selected: this.selectedRowId === row.id })}
              >
                ${this.hasCheckbox
                  ? html`<td class="w-12 p-0">
                      <span
                        class="flex justify-center items-center w-full min-h-14"
                      >
                        <daikin-checkbox
                          name=${row.id}
                          .checkState=${this.checkedIds.includes(row.id)
                            ? "checked"
                            : "unchecked"}
                          label="Select row"
                          label-position="hidden"
                          @change=${() =>
                            this._handleCheckboxRowItemChange(row.id)}
                        ></daikin-checkbox>
                      </span>
                    </td>`
                  : nothing}
                ${createRow(row)}
              </tr>`
          )}
        </tbody>
      </table>
    </div>`;
  }

  protected override firstUpdated(): void {
    this._updateTable();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-table": DaikinTable;
  }
}

export default DaikinTable;
