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
    "text-system-element-text-primary",
    "font-bold",
  ],
  {
    variants: {
      alignment: {
        left: ["justify-start", "text-left"],
        right: ["justify-end", "text-end"],
        center: ["justify-center", "text-center"],
      },
      sortable: {
        false: [],
        true: [
          "hover:bg-system-background-surface-hover",
          "active:bg-system-background-surface-press",
          "focus-visible:outline",
          "focus-visible:outline-2",
          "focus-visible:-outline-offset-2",
          "focus-visible:outline-system-state-focus",

          "after:size-6",
          "after:text-system-element-text-primary",
          "after:i-daikin-sort",
        ],
      },
    },
  }
);

type TableHeaderCellVariantProps = MergeVariantProps<typeof cvaHeaderCell>;

/**
 * `daikin-table-header-cell` is a component that functions as a cell in the header row of `daikin-table`.
 * By assigning this component to a slot in `daikin-table`, you can display advanced content such as subtitles and icons.
 *
 * This component is created for `daikin-table` and requires the appropriate slot name to be specified to use it.
 * For more information, please refer to the `daikin-table` component.
 *
 * Hierarchy:
 * - `daikin-table` > `daikin-table-header-cell`
 *
 * @fires change-sort - Fires when the sort button is clicked. See `sortable` property for details.
 *
 * @slot - A slot for the table header cell.
 * @slot left-icon - A slot for an icon to be placed to the left of the text. Place `daikin-icon` or something similar.
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
   * Alignment of cell contents.
   */
  @property({ type: String, reflect: true })
  alignment: TableHeaderCellVariantProps["alignment"] = "left";

  /**
   * Whether to display as a sortable column or not.
   * When set to `true`, it becomes clickable and the sort icon is displayed on the right.
   * It also makes the component emit the `change-sort` event when clicked.
   */
  @property({ type: Boolean, reflect: true })
  sortable = false;

  override render() {
    const headerCellCN = cvaHeaderCell({
      alignment: this.alignment,
      sortable: this.sortable,
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
            this.dispatchEvent(new Event("change-sort", { bubbles: true }))}
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
