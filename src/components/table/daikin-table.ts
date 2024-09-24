import {
  tableColorBackground,
  tableColorText,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import {
  LitElement,
  css,
  html,
  nothing,
  unsafeCSS,
  type PropertyValues,
} from "lit";
import { customElement, property, state } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../checkbox/daikin-checkbox";
import "../dropdown-item/daikin-dropdown-item";
import "../dropdown/daikin-dropdown";
import "../pagination/daikin-pagination";
import "../text-input/daikin-text-input";

const FOCUSED_CLASS_NAME = [
  "focus-visible:outline",
  "focus-visible:outline-2",
  "focus-visible:-outline-offset-2",
  "focus-visible:outline-daikinBlue-700",
];

const cvaCell = cva(["flex", "w-full", "p-4"], {
  variants: {
    align: {
      left: [],
      right: ["justify-end"],
    },
    sort: {
      false: [],
      true: [
        "flex",
        "items-center",
        "w-full",
        "gap-2",
        ...FOCUSED_CLASS_NAME,

        "after:size-6",
        "after:text-daikinNeutral-800",
        "after:i-daikin-sort-chevron-up-and-down",
      ],
    },
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
      null: [],
    },
  },
});

const cvaRow = cva(
  ["border-b", "border-b-daikinNeutral-300", ...FOCUSED_CLASS_NAME],
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
 * The table provides four functions: checkboxes, search, sorting, and pagination, and you can select the functions you need. You can also add any components to the slot to further expand the functions.
 *
 * @fires change-check - When the checkbox is operated, it returns the array of `id`s that are currently checked.
 * @fires change-page - When the number of items per page or the total number of items on a page is changed, it returns the current page and the number of items currently displayed.
 * @fires change-sort - When the sort is changed, it returns the current sort key and the order (ascending or descending).
 * @fires search - When a search is performed, the keywords used in the search are returned.
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
   * Whether or not to give the table the function of search
   */
  @property({ type: Boolean, reflect: true, attribute: "has-search" })
  hasSearch: boolean = false;

  /**
   * Whether or not to give the table the function of pagination
   */
  @property({ type: Boolean, reflect: true, attribute: "has-pagination" })
  hasPagination: boolean = false;

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
   * Search keywords for the table
   */
  @property({ type: String, reflect: true })
  keyword: string | null = null;

  /**
   * Sort order of the table
   */
  @property({ type: String, attribute: "order-by" })
  orderBy: "asc" | "desc" | null = null;

  /**
   * Specify which page you are viewing using the table pagination
   */
  @property({ type: Number, reflect: true, attribute: "current-page" })
  currentPage: number = 1;

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
   * A pull-down menu on the table's pagination that allows you to select how many items are displayed at once
   */
  @property({ type: Array })
  ranges: (number | "All")[] = [5, 10, 25, 50, 100, "All"];

  /**
   * Number of items currently displayed
   */
  @property({ type: String, attribute: "selected-range" })
  selectedRange: (typeof this.ranges)[number] | "All" = "All";

  /**
   * Specify whether the table row is selected
   */
  @property({ type: String, attribute: "selected-row-id" })
  selectedRowId: string | null = null;

  @state()
  private _allItemCheckState: "unchecked" | "indeterminate" | "checked" =
    "unchecked";

  @state()
  private _replaceSelectedRange: number = 0;

  /**
   * An array that performs sorting and searching based on `rows`.
   * It does not manage checks and pagination.
   */
  @state()
  private _sortedAndSearchedRows: ({ id: string } & {
    [key in (typeof this.headers)[number]["key"]]: string;
  })[] = [];

  /**
   * An array that performs pagination based on `_sortedAndSearchedRows`.
   * It does not manage checks.
   */
  @state()
  private _showRows: ({ id: string } & {
    [key in (typeof this.headers)[number]["key"]]: string;
  })[] = [];

  private _updateCheck() {
    this.checkedIds = this.checkedIds.filter((checkedId) =>
      this._sortedAndSearchedRows.find(({ id }) => checkedId === id)
    );

    this._checkHeaderFunction();
  }

  private _updateCurrentPageRows() {
    this._showRows = this._sortedAndSearchedRows.filter((_, index) =>
      this.selectedRange === ("All" as const)
        ? true
        : index >= this.selectedRange * (this.currentPage - 1) &&
          index < this.selectedRange * this.currentPage
    );
  }

  private _updateSearch() {
    if (!this.keyword?.length) {
      return;
    }

    this._sortedAndSearchedRows = this._sortedAndSearchedRows.filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ({ id: _id, ...object }) =>
        Object.values(object)
          .join("")
          .toLowerCase()
          .includes((this.keyword ?? "").toLowerCase())
    );
  }

  private _updateSort() {
    this._sortedAndSearchedRows = this._sortedAndSearchedRows.sort((a, b) => {
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
      this._sortedAndSearchedRows.reverse();
    }
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

  private _emitChangePageEvent() {
    this.dispatchEvent(
      new CustomEvent("change-page", {
        detail: {
          currentPage: this.currentPage,
          selectedRange: this.selectedRange,
        },
      })
    );
  }

  private _emitSearchEvent() {
    this.dispatchEvent(
      new CustomEvent("search", {
        detail: { keyword: this.keyword },
      })
    );
  }

  private _resetRows() {
    this._sortedAndSearchedRows = this.rows;
  }

  // NOTE: About the functions that exist on the table and the processing order

  // There are four functions available on the table.
  // - Checkbox
  // - Search
  // - Sort
  // - Pagination

  // These can be used in any combination, but changing one of them may require another process to be carried out at the same time.
  // In this case, the processes are carried out in the following order:
  // 1. Search and Sort - These are carried out in any order, and are also grouped together in the variable. Check: `_sortedAndSearchedRows`
  // 2. Pagination - From the generated `_sortedAndSearchedRows`, a new array `_showRows` is generated with the display items narrowed down as specified by pagination.
  // 3. Checkbox - Since it has page-specific checkboxes, this is processed after pagination.
  private _updateAllProperties() {
    this._updateSort();
    this._updateSearch();
    this._updateCurrentPageRows();
    this._updateCheck();
  }

  private _updateTable() {
    this._resetRows();
    this._updateAllProperties();
  }

  private _handleSearchKeydown(e: KeyboardEvent): void {
    if (e.key !== "Enter") {
      return;
    }

    this._updateTable();
    this._emitSearchEvent();
  }

  private _handleSearchClick(): void {
    this._updateTable();
    this._emitSearchEvent();
  }

  private _handleSearchKeywordInput(e: InputEvent): void {
    this.keyword = (e.target as HTMLInputElement).value;
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

  private _handleRangeChange(e: Event & { detail: { value: string } }): void {
    if (e.detail.value === "All") {
      this.selectedRange = e.detail.value as "All";
    } else if (!isNaN(Number(e.detail.value))) {
      this.selectedRange = Number(e.detail.value);
    }

    this._updateTable();
    this._emitChangePageEvent();
  }

  private _handlePageChange(e: Event & { detail: { page: number } }) {
    this.currentPage = e.detail.page;

    this._updateTable();
    this._emitChangePageEvent();
  }

  private _checkHeaderFunction() {
    const checkedIdLengthInCurrentPage = this._showRows.filter(({ id }) =>
      this.checkedIds.find((checkedId) => checkedId === id)
    ).length;

    this._allItemCheckState =
      this._replaceSelectedRange <= this.checkedIds.length &&
      this._replaceSelectedRange === checkedIdLengthInCurrentPage
        ? "checked"
        : checkedIdLengthInCurrentPage
          ? "indeterminate"
          : "unchecked";
  }

  private _setReplaceSelectedRange() {
    if (!this.hasPagination || this.selectedRange === "All") {
      this._replaceSelectedRange = this._sortedAndSearchedRows.length;
    } else {
      this._replaceSelectedRange = this.selectedRange;
    }
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

    const search = html`<div class="w-max relative">
      <daikin-text-input
        placeholder="Search"
        value=${this.keyword ?? ""}
        @keydown=${this._handleSearchKeydown}
        @input=${this._handleSearchKeywordInput}
      ></daikin-text-input>
      <button
        class="flex justify-center items-center size-5 absolute top-0 right-2 bottom-0 m-auto i-daikin-search"
        aria-label="Search"
        @click=${this._handleSearchClick}
      ></button>
    </div>`;

    const pagination = () => {
      const topIndex =
        this.selectedRange === ("All" as const)
          ? 1
          : this.selectedRange * (this.currentPage - 1) + 1;
      const calculatedBottomIndex =
        this.selectedRange === ("All" as const)
          ? this.rows.length
          : this.selectedRange * this.currentPage;
      const buttonIndex =
        this._sortedAndSearchedRows.length < calculatedBottomIndex
          ? this._sortedAndSearchedRows.length
          : calculatedBottomIndex;

      return html`<div
        class="flex items-center justify-between gap-12 h-max text-[15px] overflow-x-auto overflow-y-hidden"
      >
        <div class="flex items-center justify-between flex-none gap-6">
          <span>
            ${`Showing results ${topIndex} to ${buttonIndex} of ${this._sortedAndSearchedRows.length} results`}
          </span>
          <div class="w-48">
            <daikin-dropdown
              value=${this.selectedRange}
              label="Results per page"
              label-position="left"
              @change=${this._handleRangeChange}
            >
              ${this.ranges.map(
                (range) =>
                  html`<daikin-dropdown-item value=${range}>
                    ${range}
                  </daikin-dropdown-item>`
              )}
            </daikin-dropdown>
          </div>
        </div>
        <daikin-pagination
          max=${Math.ceil(
            this._sortedAndSearchedRows.length / this._replaceSelectedRange
          )}
          value=${this.currentPage}
          @page-change=${this._handlePageChange}
        ></daikin-pagination>
      </div>`;
    };

    const table = html`<table
      class="w-full bg-[--table-color-background] table-fixed leading-[22px]"
    >
      <thead
        class="text-daikinNeutral-900 border-b border-b-daikinNeutral-800 font-bold"
      >
        <tr>
          ${this.hasCheckbox
            ? html`<td class="w-12 h-14 p-0">
                <span class="flex items-center justify-center w-full h-full">
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
              html`<th class="p-0">
                ${this.hasSort
                  ? html`
                      <button
                        type="button"
                        aria-label=${`Sort of ${label}`}
                        class=${cvaCell({
                          align,
                          sort: true,
                          selected: false,
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
                        selected: null,
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
                ? html`<td class="w-12 h-14 p-0">
                    <span
                      class="flex items-center justify-center w-full h-full"
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
    </table>`;

    return html`<div class="flex flex-col gap-6 w-full font-daikinSerif">
      ${this.hasSearch
        ? html`<div
            class="flex items-center justify-between gap-12 w-full px-6"
          >
            <div></div>
            ${search}
          </div>`
        : nothing}${table}
      ${this.hasPagination ? pagination() : nothing}
    </div>`;
  }

  protected override firstUpdated(): void {
    this._resetRows();

    this._setReplaceSelectedRange();
    this._updateAllProperties();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("selectedRange")) {
      this._setReplaceSelectedRange();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-table": DaikinTable;
  }
}

export default DaikinTable;
