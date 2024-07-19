import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTooltip = cva(
  [
    "invisible",
    "absolute",
    "opacity-0",

    "p-3",
    "justify-center",
    "items-center",
    "rounded",
    "w-max",
    "max-w-[312px]",

    "text-sm",
    "font-daikinSerif",
    "font-normal",
    "not-italic",
    "leading-5",

    "group-hover:visible",
    "group-hover:opacity-100",
    "",
  ],
  {
    variants: {
      placement: {
        top: ["bottom-[120%]", "left-1/2", "-translate-x-1/2"],
        bottom: ["top-[120%]", "left-1/2", "-translate-x-1/2"],
        left: ["top-1/2", "right-[120%]", "-translate-y-1/2"],
        right: ["top-1/2", "left-[120%]", "-translate-y-1/2"],
      },
      variant: {
        light: [
          "border",
          "border-solid",
          "border-daikinNeutral-800",
          "bg-[#ffffffe6]",
          "text-[#000]",
        ],
        dark: ["bg-[#414141e6]", "text-[#fff]"],
      },
    },
  }
);

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-tooltip")
export class DaikinTooltip extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
    }
  `;

  /**
   * Specify how the trigger should placement with the tooltip
   */
  @property({ reflect: true, type: String })
  placement: "top" | "bottom" | "left" | "right" = "bottom";
  /**
   * Specify tooltip type
   */
  @property({ reflect: true, type: String })
  variant: "light" | "dark" = "light";
  /**
   * Specify whether the tooltip should be open when it first renders
   */
  @property({ reflect: true, type: Boolean })
  open = false;
  /**
   * Set the description and it will be showed in tooltips
   */
  @property({ type: String })
  description = "";
  /**
   * if true, the tooltip will hide on click
   */
  @property({ reflect: true, type: Boolean })
  closeOnClick = false;

  override render() {
    const tooltipClassName = cvaTooltip({
      placement: this.placement,
      variant: this.variant,
    });
    return html`<div class="group relative inline-block">
      <slot></slot>
      <span class="${tooltipClassName}"><slot name="description"></slot></span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tooltip": DaikinTooltip;
  }
}
