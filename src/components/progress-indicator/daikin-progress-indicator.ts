import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinProgressIndicatorItem } from "../progress-indicator-item";

/**
 * The progress indicator is used to let the user know where they are in the task list.
 *
 * Hierarchy:
 * - `daikin-progress-indicator` > `daikin-progress-indicator-item`
 *
 * @slot - A slot for progress indicator items. Place `daikin-progress-indicator-item` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-progress-indicator>
 *   <daikin-progress-indicator-item state="unfinished">
 *     Title 1
 *     <span slot="description">Description 1</span>
 *   </daikin-progress-indicator-item>
 *   <daikin-progress-indicator-item state="inprogress">
 *     Title 2
 *     <span slot="description">Description 2</span>
 *   </daikin-progress-indicator-item>
 *   <daikin-progress-indicator-item state="finished">
 *     Title 3
 *     <span slot="description">Description 3</span>
 *   </daikin-progress-indicator-item>
 * </daikin-progress-indicator>
 * ```
 */
@customElement("daikin-progress-indicator")
export class DaikinProgressIndicator extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * Specify the index number of the current location in the progress indicator.
   */
  @property({ type: Number, attribute: "current-item", reflect: true })
  currentItem: number | null = null;

  @queryAssignedElements({ selector: "daikin-progress-indicator-item" })
  private readonly _items!: readonly DaikinProgressIndicatorItem[] | null;

  private _setCurrentItem() {
    const items = this._items;

    if (!items || this.currentItem === null) {
      return;
    }

    if (items.length - 1 < this.currentItem) {
      if (import.meta.env.DEV) {
        console.warn(
          `Invalid 'current-item' property: ${this.currentItem}. The number of actual 'daikin-progress-indicator-item's exceeds the number of items.`
        );
      }

      return;
    }

    if (this.currentItem < 0) {
      if (import.meta.env.DEV) {
        console.warn(
          `Invalid 'current-item' property: ${this.currentItem}. Negative values cannot be set.`
        );
      }

      return;
    }

    items.forEach((item, i) => (item.current = this.currentItem === i));
  }

  private _handleSlotChange() {
    this._setCurrentItem();
  }

  override render() {
    return html`<div
      class="flex justify-stretch items-start w-full font-daikinSerif"
      role="list"
    >
      <slot @slotchange=${this._handleSlotChange}></slot>
    </div>`;
  }

  protected override firstUpdated(): void {
    this._setCurrentItem();
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("currentItem")) {
      this._setCurrentItem();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-progress-indicator": DaikinProgressIndicator;
  }
}

export default DaikinProgressIndicator;
