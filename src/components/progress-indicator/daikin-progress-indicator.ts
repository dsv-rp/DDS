import { css, html, unsafeCSS, type PropertyValues } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { DDSElement, ddsElement } from "../../base";
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
 * ```js
 * import "@daikin-oss/design-system-web-components/components/progress-indicator/index.js";
 * import "@daikin-oss/design-system-web-components/components/progress-indicator-item/index.js";
 * ```
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
@ddsElement("daikin-progress-indicator")
export class DaikinProgressIndicator extends DDSElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * Specify the index of the step that is currently in progress, starting from 0. This will automatically set the status of each step.
   * To mark all steps as upcoming, specify a number less or equal to -1. To mark all steps as completed, specify a number greater than or equal to the number of steps.
   */
  @property({ type: Number, attribute: "current-item", reflect: true })
  currentItem = 0;

  @queryAssignedElements({ selector: "daikin-progress-indicator-item" })
  private readonly _items!: readonly DaikinProgressIndicatorItem[];

  private _updateSteps() {
    const items = this._items;

    items.forEach((item, i) => {
      item.status =
        i < this.currentItem
          ? "finished"
          : i === this.currentItem
            ? "inprogress"
            : "unfinished";
    });
  }

  private _handleSlotChange() {
    this._updateSteps();
  }

  override render() {
    return html`<div
      class="flex justify-stretch items-start gap-2 w-full font-daikinSerif"
      role="list"
    >
      <slot @slotchange=${this._handleSlotChange}></slot>
    </div>`;
  }

  protected override firstUpdated(): void {
    this._updateSteps();
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("currentItem")) {
      this._updateSteps();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-progress-indicator": DaikinProgressIndicator;
  }
}

export default DaikinProgressIndicator;
