import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

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
      --progress-indicator-border-color-error: ${unsafeCSS(
        colorFeedbackNegative
      )};

      display: block;
      width: 100%;
    }
  `;

  override render() {
    return html`<div
      class="flex justify-stretch items-start w-full font-daikinSerif"
      role="list"
    >
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-progress-indicator": DaikinProgressIndicator;
  }
}

export default DaikinProgressIndicator;
