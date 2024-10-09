import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinProgressIndicatorItem } from "../progress-indicator-item";

const cvaContainer = cva(
  ["flex", "justify-stretch", "items-start", "w-full", "font-daikinSerif"],
  {
    variants: {
      direction: {
        vertical: ["flex-col"],
        horizontal: ["flex-row"],
      },
    },
  }
);

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
 *   <daikin-progress-indicator-item state="error">
 *     Title 4
 *     <span slot="description">Description 4</span>
 *   </daikin-progress-indicator-item>
 *   <daikin-progress-indicator-item state="disabled">
 *     Title 5
 *     <span slot="description">Description 5</span>
 *   </daikin-progress-indicator-item>
 * </daikin-progress-indicator>
 * ```
 */
@customElement("daikin-progress-indicator")
export class DaikinProgressIndicator extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --progress-indicator-border-color-error: ${unsafeCSS(
        colorFeedbackNegative
      )};

      display: block;
      width: 100%;
    }
  `;

  /**
   * Direction of the progress indicator item
   */
  @property({ type: String })
  direction: "horizontal" | "vertical" = "horizontal";

  @queryAssignedElements({ selector: "daikin-progress-indicator-item" })
  _items!: DaikinProgressIndicatorItem[];

  private _handleSlotChange(): void {
    this._reflectSlotProperties();
  }

  private _reflectSlotProperties(): void {
    for (const item of this._items) {
      item.direction = this.direction;
    }
  }

  override render() {
    const progressIndicatorClassName = cvaContainer({
      direction: this.direction,
    });

    return html`<div class=${progressIndicatorClassName}>
      <slot @slotchange=${this._handleSlotChange}></slot>
    </div>`;
  }

  override updated() {
    this._reflectSlotProperties();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-progress-indicator": DaikinProgressIndicator;
  }
}

export default DaikinProgressIndicator;
