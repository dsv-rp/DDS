import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css?inline";

const cvaContainer = cva(
  ["flex", "rounded-lg", "bg-white", "p-4", "gap-4", "flex-col"],
  {
    variants: {
      outline: {
        true: ["border", "border-solid", "border-[#CECECE]"],
        false: [],
      },
      fill: {
        true: [],
        false: [],
      },
    },
  }
);

/**
 * `daikin-card` is a component for display content related to a single subject. The content can consist of multiple elements of varying types and sizes.
 *
 * Hierarchy:
 * - `daikin-card` > `daikin-card-header`
 *
 * @slot header - A slot for card header. Place `daikin-card-header` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-card>
 *  <daikin-card-header slot="header">
 *   <span slot="label">Card Header</span>
 *  </daikin-card-header>
 * </daikin-card>
 * ```
 */
@customElement("daikin-card")
export class DaikinCard extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
      width: fit-content;
    }
  `;

  /**
   * Specify the body border to visual or hidden.
   */
  @property({ type: Boolean, reflect: true })
  outline = false;

  override render() {
    return html` <div
      class=${cvaContainer({
        outline: this.outline,
      })}
    >
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-card": DaikinCard;
  }
}
