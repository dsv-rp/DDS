import { cva } from "class-variance-authority";
import { css, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaCell = cva(
  [
    "flex",
    "flex-col",
    "gap-1",
    "justify-center",
    "size-full",
    "min-h-12",
    "px-4",
    "py-3",
    "text-ddt-color-common-text-primary",
  ],
  {
    variants: {
      alignment: {
        left: ["items-start", "text-left"],
        right: ["items-end", "text-end"],
        center: ["items-center", "text-center"],
      },
    },
  }
);

type TableCellVariantProps = MergeVariantProps<typeof cvaCell>;

/**
 * This is a component that functions as an element to be placed on the daikin-table. When you want to insert a subtitle into a cell, or when you want to use something other than plain text (e.g. a button), you need to use this component.
 *
 * This is a component used as a slot in the daikin-table, but in order to do so, you need to specify the appropriate slot attribute. For more information, please check the daikin-table component.
 *
 * Hierarchy:
 * - `daikin-table` > `daikin-table-cell`
 *
 * @slot - A slot for the table cell.
 * @slot subtitle - This is a subtitle element that is inserted into a cell.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/table-cell/index.js";
 * ```
 *
 * ```html
 * <daikin-table-cell slot="cell:key:id">
 *   Table cell label
 *   <span slot="subtitle">Table cell subtitle</span>
 * </daikin-table-cell>
 * ```
 */
@ddsElement("daikin-table-cell")
export class DaikinTableCell extends DDSElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
      min-height: 3rem;
    }
  `;

  /**
   * Specify the direction of cell alignment.
   * This is not normally something that users need to specify.
   */
  @property({ type: String, reflect: true })
  alignment: TableCellVariantProps["alignment"] = "left";

  override render() {
    return html`<span class=${cvaCell({ alignment: this.alignment })}>
      <slot></slot>
      <slot
        name="subtitle"
        class="text-ddt-color-common-text-secondary text-xs"
      ></slot>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-table-cell": DaikinTableCell;
  }
}

export default DaikinTableCell;
