import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaCell = cva(
  ["flex", "flex-col", "gap-1", "justify-center", "w-full", "min-h-14", "px-4"],
  {
    variants: {
      alignment: {
        left: ["items-start", "text-left"],
        right: ["items-end", "text-end"],
        center: ["items-center", "text-center"],
      },
      hasSubtitle: {
        false: ["pt-4", "pb-3"],
        true: ["py-4"],
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
 * @slot subtitle - This is a subtitle element that is inserted into a cell.
 *
 * @example
 *
 * ```html
 * <daikin-table-cell slot="cell:key:id">
 *   Table cell label
 *   <span slot="subtitle">Table cell subtitle</span>
 * </daikin-table-cell>
 * ```
 */
@customElement("daikin-table-cell")
export class DaikinTableCell extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  @property({ type: String, reflect: true })
  alignment: TableCellVariantProps["alignment"] = "left";

  @queryAssignedElements({ slot: "subtitle" })
  private readonly _subtitles!: readonly HTMLElement[];

  @state()
  private _hasSubtitle = false;

  private _handleSlotChange() {
    this._hasSubtitle = !!this._subtitles.length;
  }

  override render() {
    return html`<span
      class=${cvaCell({
        alignment: this.alignment,
        hasSubtitle: this._hasSubtitle,
      })}
    >
      <slot></slot>
      <span class="text-daikinNeutral-700 text-xs">
        <slot name="subtitle" @slotchange=${this._handleSlotChange}></slot>
      </span>
    </span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-table-cell": DaikinTableCell;
  }
}

export default DaikinTableCell;