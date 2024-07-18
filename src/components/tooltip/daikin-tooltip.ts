import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTooltip = cva(
  [
    "invisible",
    "flex-shrink-0",
    "absolute",
    "opacity-0",
    "font-normal",
    "text-center",
    "not-italic",
    "leading-5",
    "tracking-tight",
    "w-[110px]",
    "group-hover:visible",
    "group-hover:opacity-100",
  ],
  {
    variants: {
      placement: {
        top: ["bottom-full", "left-1/2", "-translate-x-1/2"],
        bottom: ["top-full", "left-1/2", "-translate-x-1/2"],
        left: ["top-1/2", "right-[120%]", "-translate-y-1/2"],
        right: ["top-1/2", "left-[120%]", "-translate-y-1/2"],
      },
      variant: {
        primary: ["bg-[#5B5B5B]", "text-white"],
        secondary: [],
        teritiary: [],
        primaryDanger: [],
      },
      size: {
        default: ["text-base"],
        condensed: ["text-xs"],
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
  variant: "primary" | "secondary" | "teritiary" | "primaryDanger" = "primary";
  /**
   * Specify the tooltip with arrow or not
   */
  @property({ type: Boolean, reflect: true })
  arrow = false;
  /**
   * Set size of the tooltip
   */
  @property({ reflect: true, type: String })
  size: "default" | "condensed" = "default";
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
  /**
   * Specify whether a auto placement functionality should be applied
   */
  @property({ type: Boolean, reflect: true })
  autoAlign = false;

  override render() {
    const tooltipClassName = cvaTooltip({
      placement: this.placement,
      variant: this.variant,
      size: this.size,
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
