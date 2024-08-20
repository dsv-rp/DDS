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
import "../icon/daikin-icon";
import "../pagination/daikin-pagination";
import "../text-input/daikin-text-input";

const cvaCellContainer = cva(["flex", "items-center", "w-full", "gap-2"], {
  variants: {
    align: {
      left: [],
      right: ["justify-end"],
    },
  },
});

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
 * The table provides four functions: checkboxes, search, sorting, and pagination, and you can select the functions you need. You can also add any components to the slot to further expand the functions.
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

  /**
   * Whether or not to give the table the function of checkbox
   */
  @property({ type: Boolean, reflect: true })
  hasCheckbox: boolean = false;

  /**
   * Whether or not to give the table the function of search
   */
  @property({ type: Boolean, reflect: true })
  hasSearch: boolean = false;

  /**
   * Whether or not to give the table the function of pagination
   */
  @property({ type: Boolean, reflect: true })
  hasPagination: boolean = false;

  /**
   * Whether or not to give the table the function of sort
   */
  @property({ type: Boolean })
  hasSort: boolean = false;

  /**
   * An array of `id`s for the `rows` that have been checked
   */
  @property({ type: Array, attribute: "checked-ids" })
  checkedIds: string[] | undefined = [];

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
  @property({ type: Number, reflect: true })
  currentPage: number | null = 1;

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

  @property({ type: String, attribute: "selected-range" })
  selectedRange: (typeof this.ranges)[number] | "All" = "All";

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

  // There are two basic functions used in these processes. The roles of each function and the naming conventions are as follows.
  // 1. `_update[Function name]()` - Common processing that needs to be fired in conjunction with another event
  // 2. `_emit[Function name]Event()` - Processing that returns a value in response to an event
  // The above generalized processing and event-specific processing are executed together in a function starting with `_handle`.

  private _updateCheck() {
    this.checkedIds =
      this.checkedIds?.filter((checkedId) =>
        this._sortedAndSearchedRows.find(({ id }) => checkedId === id)
      ) ?? [];

    this._checkHeaderFunction();
  }

  private _updateCurrentPageRows() {
    this._showRows = this._sortedAndSearchedRows.filter((_, index) =>
      this.selectedRange === ("All" as const)
        ? true
        : index >= this.selectedRange * ((this.currentPage ?? 1) - 1) &&
          index < this.selectedRange * (this.currentPage ?? 1)
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

    this._updateSort();
    this._updateSearch();
    this._updateCurrentPageRows();
    this._updateCheck();
  }

  private _handleSearchKeydown(e: KeyboardEvent): void {
    if (e.key !== "Enter") {
      return;
    }

    this._resetRows();
    this._emitSearchEvent();
  }

  private _handleSearchClick(): void {
    this._resetRows();
    this._emitSearchEvent();
  }

  private _handleSearchKeywordInput(e: InputEvent): void {
    this.keyword = (e.target as HTMLInputElement).value;
  }

  private _handleRowHeaderChange(): void {
    switch (this._allItemCheckState) {
      case "unchecked":
      case "indeterminate":
        this._allItemCheckState = "checked";
        this.checkedIds = this.checkedIds
          ? [
              ...new Set([
                ...this.checkedIds,
                ...this._showRows.map(({ id }) => id),
              ]),
            ]
          : this._showRows.map(({ id }) => id);
        break;

      case "checked":
        this._allItemCheckState = "unchecked";
        this.checkedIds = this.checkedIds?.filter(
          (checkedId) => !this._showRows.find(({ id }) => checkedId === id)
        );
        break;
    }

    this._emitChangeCheckEvent();
  }

  private _handleRowItemChange(id: string): void {
    if (this.checkedIds?.includes(id)) {
      this.checkedIds = this.checkedIds.filter((checkedId) => checkedId !== id);
    } else {
      this.checkedIds = this.checkedIds ? [...this.checkedIds, id] : [id];
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

    this._resetRows();

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

    this._resetRows();
    this._emitChangePageEvent();
  }

  private _handlePageChange(e: Event & { detail: { page: number } }) {
    this.currentPage = e.detail.page;

    this._resetRows();
    this._emitChangePageEvent();
  }

  private _checkHeaderFunction() {
    const checkedIdLengthInCurrentPage = this._showRows.filter(({ id }) =>
      this.checkedIds?.find((checkedId) => checkedId === id)
    ).length;

    this._allItemCheckState =
      Number(this._replaceSelectedRange) <= (this.checkedIds?.length ?? 0) &&
      Number(this._replaceSelectedRange) === checkedIdLengthInCurrentPage
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

    const search = html`<div class="w-max relative">
      <daikin-text-input
        placeholder="Search"
        value=${this.keyword ?? ""}
        @keydown=${this._handleSearchKeydown}
        @input=${this._handleSearchKeywordInput}
      ></daikin-text-input>
      <button
        class="flex justify-center items-center w-6 h-6 absolute top-0 right-2 bottom-0 m-auto"
        aria-label="Search"
        @click=${this._handleSearchClick}
      >
        <daikin-icon icon="search" size="l"></daikin-icon>
      </button>
    </div>`;

    const table = html`<table
      class="w-full bg-[--table-color-background] table-fixed text-[15px] leading-[22px]"
    >
      <thead class="text-[#212121] border-b border-b-black font-medium">
        <tr>
          ${this.hasCheckbox
            ? html`<th class="w-12 py-4 pl-6 text-left">
                <span class="flex">
                  <daikin-checkbox
                    name="allItem"
                    .checkState=${this._allItemCheckState}
                    label="Select all"
                    label-position="hidden"
                    @change=${this._handleRowHeaderChange}
                  ></daikin-checkbox
                ></span>
              </th>`
            : nothing}
          ${this.headers.map(
            ({ key, label, align }) =>
              html`<th class=${this.hasSort ? "" : cvaCell({ align })}>
                ${this.hasSort
                  ? html`
                      <button
                        type="button"
                        aria-label=${`Sort of ${label}`}
                        class=${cvaCell({ align }) +
                        " " +
                        cvaCellContainer({ align })}
                        @click=${() => this._handleClickSort(key)}
                      >
                        <span>${label}</span>
                        <daikin-icon
                          icon=${this.sortedKey === key
                            ? this.orderBy === "asc"
                              ? "sort-chevron-up"
                              : this.orderBy === "desc"
                                ? "sort-chevron-down"
                                : "sort-chevron-up-and-down"
                            : "sort-chevron-up-and-down"}
                          size="s"
                        ></daikin-icon>
                      </button>
                    `
                  : html`<span>${label}</span>`}
              </th>`
          )}
        </tr>
      </thead>
      <tbody class="text-[--table-color-text]">
        ${this._showRows.map(
          ({ id, ...row }) =>
            html`<tr class="border-b border-b-[#EBEBEB]">
              ${this.hasCheckbox
                ? html`<td class="py-4 pl-6 align-middle">
                    <span class="flex">
                      <daikin-checkbox
                        name=${id}
                        .checkState=${this.checkedIds?.includes(id)
                          ? "checked"
                          : "unchecked"}
                        label="Select row"
                        label-position="hidden"
                        @change=${() => this._handleRowItemChange(id)}
                      ></daikin-checkbox>
                    </span>
                  </td>`
                : null}
              ${this.headers.map(
                ({ key, align }) =>
                  html`<td class=${cvaCell({ align })}>${row[key]}</td>`
              )}
            </tr>`
        )}
      </tbody>
    </table>`;

    const pagination = () => {
      const topIndex =
        this.selectedRange === ("All" as const)
          ? 1
          : this.selectedRange * ((this.currentPage ?? 1) - 1) + 1;
      const calculatedBottomIndex =
        this.selectedRange === ("All" as const)
          ? this.rows.length
          : this.selectedRange * (this.currentPage ?? 1);
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
          value=${this.currentPage ?? 1}
          @page-change=${this._handlePageChange}
        ></daikin-pagination>
      </div>`;
    };

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

    if (this.keyword) {
      this._updateSearch();
    }
    if (this.sortedKey) {
      this._updateSort();
    }
    if (this.selectedRange === "All") {
      this._showRows = this._sortedAndSearchedRows;
      this._replaceSelectedRange = this._sortedAndSearchedRows.length;
    } else {
      this._replaceSelectedRange = this.selectedRange;
      this._updateCurrentPageRows();
    }

    this._updateCheck();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("selectedRange")) {
      if (this.selectedRange === "All") {
        this._replaceSelectedRange = this._sortedAndSearchedRows.length;
      } else {
        this._replaceSelectedRange = this.selectedRange;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-table": DaikinTable;
  }
}

export default DaikinTable;
