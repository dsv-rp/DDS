import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css?inline";

const cvaContainer = cva(["flex", "items-center", "w-full"], {
  variants: {
    withUnderLine: {
      true: ["border-b", "border-[#E6F1F5]"],
      false: [],
    },
  },
});

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
        true: ["border-b", "border-[#E6F1F5]"],
        false: [],
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
  @property({ type: Boolean, reflect: true })
  withUnderLine = false;

  /**
   * Specify whether the link should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify the link target
   */
  @property({ type: String, reflect: true })
  target: "_blank" | "_self" | "_parent" | "_top" | "framename" = "_self";

  /**
   * Specify the link should show slash at the end or not
   */
  @property({ type: Boolean, reflect: true, attribute: "trailing-slash" })
  trailingSlash = false;

  /**
   * Specify the link should be hidden when ellipsis mode
   */
  private withIcon = false;

  override render() {
    const containerClassName = cvaContainer({
      withUnderLine: this.withUnderLine,
    });

    const labelClassName = cvaLabel({
      withIcon: this.withIcon,
    });

    return html` <div class="${containerClassName}">
      <span class="${labelClassName}">Card Header</span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tile-title": DaikinTileTitle;
  }
}
