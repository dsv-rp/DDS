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

@customElement("daikin-card")
export class DaikinCard extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
    }
  `;

  /**
   * Specify the border style
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
