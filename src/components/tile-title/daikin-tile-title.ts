import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css?inline";

const cvaContainer = cva(
  ["flex", "items-center", "w-full", "justify-between", "last:pr-6"],
  {
    variants: {
      withUnderLine: {
        true: ["border-b", "border-[#E6F1F5]"],
        false: [],
      },
      buttonType: {
        none: [],
        button: [],
        link: [],
      },
    },
  }
);

const cvaLabel = cva(
  [
    "py-4",
    "text-[#1C2325]",
    "font-daikinSerif",
    "text-[19px]",
    "not-italic",
    "font-bold",
    "leading-[26px]",
  ],
  {
    variants: {
      withIcon: {
        true: [],
        false: ["pl-6"],
      },
    },
  }
);

@customElement("daikin-tile-title")
export class DaikinTileTitle extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
    }
  `;

  /**
   * Specify link href
   */
  @property({ type: Boolean, reflect: true, attribute: "with-under-line" })
  withUnderLine = false;

  /**
   * Specify link href
   */
  @property({ type: String, reflect: true })
  label = "";

  private withIcon = false;

  private buttonType: "none" | "button" | "link" = "none";

  override render() {
    const containerClassName = cvaContainer({
      withUnderLine: this.withUnderLine,
    });

    const labelClassName = cvaLabel({
      withIcon: this.withIcon,
    });

    return html` <div class="${containerClassName}">
      <slot name="icon"></slot>
      <span class="${labelClassName}">${this.label}</span>
      <slot name="link"></slot>
      <slot name="button" class="ml-14"></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tile-title": DaikinTileTitle;
  }
}
