import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaHeaderCell = cva(
  [
    "flex",
    "items-center",
    "gap-2",
    "w-full",
    "h-12",
    "px-4",
    "py-2",
    "text-[#414141]",
    "font-bold",
  ],
  {
    variants: {
      alignment: {
        left: ["justify-start", "text-left"],
        right: ["justify-end", "text-end"],
        center: ["justify-center", "text-center"],
      },
      sort: {
        false: [],
        true: [
          "hover:bg-[#F2F2F2]",
          "active:bg-[#EBEBEB]",
          "focus-visible:outline",
          "focus-visible:outline-2",
          "focus-visible:-outline-offset-2",
          "focus-visible:outline-[#0081C0]",

          "after:size-6",
          "after:text-[#414141]",
          "after:i-daikin-sort",
        ],
      },
    },
  }
);

type TableHeaderCellVariantProps = MergeVariantProps<typeof cvaHeaderCell>;

/**
 * This is a component that functions as an element to be placed on the daikin-table. When you want to insert a subtitle into a cell, or when you want to use something other than plain text (e.g. a button), you need to use this component.
 *
 * This is a component used as a slot in the daikin-table, but in order to do so, you need to specify the appropriate slot attribute. For more information, please check the daikin-table component.
 *
 * Hierarchy:
 * - `daikin-table` > `daikin-table-header-cell`
 *
 * @fires change-sort - When the sort is changed, it returns the current sort key and the order (ascending or descending).
 *
 * @slot - A slot for the table header cell.
 * @slot left-icon: Specify the icon you want to use on the left. You can also use something other than `daikin-icon`.
 *
 * @example
 *
 * ```html
 * <daikin-table-header-cell slot="header:key">
 *   Table header cell label
 * </daikin-table-header-cell>
 * ```
 */
@customElement("daikin-table-header-cell")
export class DaikinTableHeaderCell extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  /**
   * Specify the direction of cell alignment.
   */
  @property({ type: String, reflect: true })
  alignment: TableHeaderCellVariantProps["alignment"] = "left";

  /**
   * Whether sorting is possible in that column.
   */
  @property({ type: Boolean, reflect: true })
  sortable = false;

  override render() {
    const headerCellCN = cvaHeaderCell({
      alignment: this.alignment,
      sort: this.sortable,
    });

    const content = html`<slot name="left-icon">
        <span class="block -mr-2"></span>
      </slot>
      <slot></slot>`;

    return this.sortable
      ? html`<button
          type="button"
          class=${headerCellCN}
          @click=${() =>
            this.dispatchEvent(
              new CustomEvent("change-sort", { bubbles: false })
            )}
        >
          ${content}
        </button>`
      : html`<span class=${headerCellCN}>${content}</span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-table-header-cell": DaikinTableHeaderCell;
  }
}

export default DaikinTableHeaderCell;
