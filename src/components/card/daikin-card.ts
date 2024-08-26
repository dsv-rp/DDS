import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css?inline";

const cvaContainer = cva(
  ["rounded-lg", "bg-white", "shadow-[0_-2px_19px_0px_rgba(0,0,0,0.1)]"],
  {
    variants: {
      borderType: {
        none: [],
        gray: ["border-2", "border-solid", "border-daikinNeutral-300"],
        red: ["border-2", "border-solid", "border-daikinRed-500"],
      },
    },
  }
);

/**
 * `daikin-card` is a component for display content related to a single subject. The content can consist of multiple elements of varying types and sizes.
 *
 * Hierarchy:
 * - `daikin-card` > `daikin-card-title`
 *
 * @slot header - A slot for card title. Place `daikin-card-title` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-card>
 *  <daikin-card-title slot="header">
 *   <span slot="label">Card Header</span>
 *  </daikin-card-title>
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
   * Specify the card's border style
   */
  @property({ type: String, reflect: true, attribute: "border-type" })
  borderType: "none" | "gray" | "red" = "none";

  override render() {
    const containerClassName = cvaContainer({
      borderType: this.borderType,
    });

    return html` <div class="${containerClassName}">
      <slot name="header"></slot>
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-card": DaikinCard;
  }
}
