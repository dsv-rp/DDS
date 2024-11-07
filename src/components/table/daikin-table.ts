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
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../checkbox/daikin-checkbox";
import type { DaikinCheckbox } from "../checkbox/daikin-checkbox";
import type { IconType } from "../icon";
import "../table-cell/daikin-table-cell";
import "../table-header-cell/daikin-table-header-cell";

export type HeaderType<T extends string = string> = {
  key: T;
  label: string;
  alignment?: "left" | "right" | "center";
  leftIcon?: IconType;
  sortable?: boolean;
};

const defaultSort = <T>(a: T, b: T, key: keyof T) =>
  String(a[key]).localeCompare(String(b[key]));

const cvaRow = cva(
  [
    "border-b",
    "border-b-system-element-divider-secondary",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-system-state-focus",
  ],
  {
    variants: {
      selected: {
        false: ["hover:bg-system-background-surface-hover"],
        true: [
          "bg-system-background-surface-selected",
          "hover:bg-system-background-surface-selectedHover",
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
 * The table provides tow functions: checkboxes and sorting, and you can select the functions you need.
 *
 * Hierarchy:
 * - `daikin-table` > `daikin-table-cell`
 * - `daikin-table` > `daikin-table-header-cell`
 *
 * @fires change-check - When the checkbox is operated, it returns the array of `id`s that are currently checked.
 * @fires change-sort - When the sort is changed, it returns the current sort key and the order (ascending or descending).
 *
 * @slot header:${headers[i].key} - A slot for the header cell of a table. Use this when you want to display something other than text, such as an icon. Use `daikin-table-header-cell` for the wrapper.
 * @slot cell:${headers[i].key}:${rows[j].id} - A slot for the data cell of a table. Use `daikin-table-cell` for the wrapper.
 *
 * @example
 *
 * ```html
 * <daikin-table
 *   .headers="[
 *     { key: 'name', label: 'Name' },
 *     { key: 'season', label: 'Season' },
 *     { key: 'price', label: 'Price', alignment: 'right', sortable: false },
 *   ]"
 *   .rows="[
 *     { id: '1', name: 'Apple', season: 'Autumn', price: '$2' },
 *     { id: '2', name: 'Peach', season: 'Summer', price: '$4' },
 *     { id: '3', name: 'Orange', season: 'Winter', price: '$1' },
 *     { id: '4', name: 'Strawberry', season: 'Spring', price: '$4' },
 *   ]"
 * >
 *   <daikin-table-cell slot="cell:name:1">
 *     Apple
 *     <span slot="subtitle">This is a autumn fruit.</span>
 *   </daikin-table-cell>
 *   <daikin-table-cell slot="cell:name:2">
 *     Peach
 *     <span slot="subtitle">This is a summer fruit.</span>
 *   </daikin-table-cell>
 *   <daikin-table-cell slot="cell:name:3">
 *     Orange
 *     <span slot="subtitle">This is a winter fruit.</span>
 *   </daikin-table-cell>
 *   <daikin-table-cell slot="cell:name:4">
 *     Strawberry
 *     <span slot="subtitle">This is a spring fruit.</span>
 *   </daikin-table-cell>
 * </daikin-table>
 * ```
 */
@customElement("daikin-table")
export class DaikinTable<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends { id: string } = any,
> extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * Headers of the table.
   * - key: The value of `key` corresponds to the key, excluding the id of rows. As a whole array, the value of `key` must be unique. Also, only use alphanumeric characters, `$`, and `_` in the `key`.
   * - label: This is the text that is displayed in the header cells.
   * - alignment: The direction in which the characters are aligned can be omitted. If it is omitted, the characters will be aligned to the left.
   * - leftIcon: In the header cell, you can optionally display an icon to the left of the text.
   * - sortable: If sortable (`sortable = true`), this specifies whether sorting is performed on this column. If `undefined`, this is considered to be `true`.
   */
  @property({ type: Array, attribute: false })
  headers: readonly HeaderType<Extract<keyof T, string>>[] = [];

  /**
   * Rows of the table.
   * An array that uses the element `key` in the column as the key and stores the corresponding value.
   * As a whole array, the value of `id` should be unique.
   */
  @property({ type: Array, attribute: false })
  rows: T[] = [];

  /**
   * Whether or not to enable selection of rows.
   * If `true`, a checkbox will be displayed to the left of each row.
   */
  @property({ type: Boolean, reflect: true })
  selectable: boolean = false;

  /**
   * Whether or not to enable sorting of the rows.
   * If `true`, a button for sorting will be displayed to the right of each header cell text.
   */
  @property({ type: Boolean, reflect: true })
  sortable: boolean = false;

  /**
   * An array of `id`s for the `rows` that have been checked.
   */
  @property({ type: Array, attribute: false })
  selection: string[] = [];

  /**
   * Sort order of the table.
   */
  @property({ type: String, reflect: true })
  order: "asc" | "desc" | null = null;

  /**
   * The `key` of the currently sorted column.
   */
  @property({ type: String, reflect: true })
  sort: keyof T | null = null;

  /**
   * Specify this when you want to customize the sort function.
   * The function must be ascending, and the return value must be `0`, `1` or `-1`.
   */
  @property({ attribute: false })
  sortFunction:
    | {
        [key in keyof T]?: (a: T, b: T, key: key) => number;
      }
    | null = null;

  @state()
  private _bulkRowsCheckState: "unchecked" | "indeterminate" | "checked" =
    "unchecked";

  /**
   * An array that performs sorting and searching based on `rows`.
   * It does not manage checks and pagination.
   */
  @state()
  private _currentView: T[] = [];

  private _updateCurrentView() {
    const sort = this.sort;
    if (!sort) {
      this._currentView = Array.from(this.rows);
      return;
    }

    const sortFunction = this.sortFunction?.[sort] ?? defaultSort;
    this._currentView = this.rows.toSorted((a, b) => sortFunction(a, b, sort));

    if (this.order === "desc") {
      this._currentView.reverse();
    }
  }

  private _updateCheck() {
    this.selection = this.selection.filter((selectedId) =>
      this._currentView.find(({ id }) => selectedId === id)
    );

    this._checkHeaderFunction();
  }

  private _emitChangeCheckEvent() {
    this.dispatchEvent(new CustomEvent("change-check"));
  }

  private _updateTable() {
    // Reset rows
    this._currentView = this.rows;

    this._updateCurrentView();
    this._updateCheck();
  }

  private _handleCheckboxRowHeaderChange(): void {
    switch (this._bulkRowsCheckState) {
      case "checked":
        this._bulkRowsCheckState = "unchecked";
        this.selection = [];
        break;

      default:
        this._bulkRowsCheckState = "checked";
        this.selection = this._currentView.map(({ id }) => id);
        break;
    }

    this._emitChangeCheckEvent();
  }

  private _handleCheckboxRowItemChange(event: Event): void {
    const { name: id } = event.target as DaikinCheckbox;

    if (this.selection.includes(id)) {
      this.selection = this.selection.filter((selectedId) => selectedId !== id);
    } else {
      this.selection = [...this.selection, id];
    }

    this._checkHeaderFunction();
    this._emitChangeCheckEvent();
  }

  private _handleClickSort(key: keyof T): void {
    if (this.sort === key) {
      this.order = this.order === "asc" ? "desc" : "asc";
    } else {
      this.sort = key;
      this.order = "asc";
    }

    this.dispatchEvent(new Event("change-sort"));
  }

  private _checkHeaderFunction() {
    const selectedIdLengthInPage = this.selection.length;

    this._bulkRowsCheckState =
      this._currentView.length === selectedIdLengthInPage
        ? "checked"
        : selectedIdLengthInPage
          ? "indeterminate"
          : "unchecked";
  }

  override render() {
    const createHeaderRow = () =>
      this.headers.map(({ label, alignment, sortable, ...header }) => {
        const key = String(header.key);
        const isSortable =
          this.sortable && (sortable || sortable === undefined);

        return html`<th
          class="h-full p-0"
          aria-sort=${ifDefined(
            this.sortable && this.sort === key
              ? this.order === "asc"
                ? "ascending"
                : "descending"
              : undefined
          )}
        >
          <slot name=${`header:${key}`}>
            <daikin-table-header-cell
              alignment=${alignment ?? "left"}
              ?sortable=${isSortable}
              @change-sort=${() => this._handleClickSort(header.key)}
            >
              ${label}
            </daikin-table-header-cell>
          </slot>
        </th>`;
      });

    const createRow = (item: T) =>
      this.headers.map(
        ({ alignment, ...header }) =>
          html`<td class="h-full p-0">
            <slot name=${`cell:${String(header.key)}:${item.id}`}>
              <daikin-table-cell alignment=${alignment ?? "left"}>
                ${item[header.key]}
              </daikin-table-cell>
            </slot>
          </td>`
      );

    return html`<div class="flex flex-col gap-6 w-full font-daikinSerif">
      <table class="w-full table-fixed leading-[22px]">
        <thead>
          <tr class="border-b border-b-system-element-divider-primary">
            ${this.selectable
              ? html`<td class="w-12 p-0">
                  <span
                    class="flex items-center justify-center w-full min-h-12"
                  >
                    <daikin-checkbox
                      name="allItem"
                      .checkState=${this._bulkRowsCheckState}
                      label="Select all"
                      label-position="hidden"
                      @change=${this._handleCheckboxRowHeaderChange}
                    ></daikin-checkbox>
                  </span>
                </td>`
              : nothing}
            ${createHeaderRow()}
          </tr>
        </thead>
        <tbody>
          ${this._currentView.map(
            (row) =>
              html`<tr
                class=${cvaRow({
                  selected: !!this.selection.find((id) => id === row.id),
                })}
              >
                ${this.selectable
                  ? html`<td class="w-12 p-0">
                      <span
                        class="flex justify-center items-center w-full min-h-12"
                      >
                        <daikin-checkbox
                          name=${row.id}
                          .checkState=${this.selection.includes(row.id)
                            ? "checked"
                            : "unchecked"}
                          label="Select row"
                          label-position="hidden"
                          @change=${this._handleCheckboxRowItemChange}
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
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!this.selection) {
      this.selection = [];
    }

    this._updateTable();
  }

  protected override willUpdate(): void {
    this._updateTable();
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("headers")) {
      if (import.meta.env.DEV) {
        if (
          this.headers.length !==
          [...new Set(this.headers.map(({ key }) => key))].length
        ) {
          console.warn("The `key` values in `headers` are duplicated");
        }
      }
    }

    if (changedProperties.has("rows")) {
      if (import.meta.env.DEV) {
        if (
          this.rows.length !==
          [...new Set(this.rows.map(({ id }) => id))].length
        ) {
          console.warn("The `id` values in `rows` are duplicated");
        }
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
