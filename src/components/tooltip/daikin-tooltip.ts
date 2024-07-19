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
    "font-tooltip",
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
        top: ["bottom-[120%]", "left-1/2", "-translate-x-1/2"],
        bottom: ["top-[120%]", "left-1/2", "-translate-x-1/2"],
        left: ["top-1/2", "right-[120%]", "-translate-y-1/2"],
        right: ["top-1/2", "left-[120%]", "-translate-y-1/2"],
      },
      variant: {
        primary: ["bg-[#5B5B5B]", "text-white"],
        secondary: [],
        tertiary: [],
        primaryDanger: [],
      },
      size: {
        default: ["text-base"],
        condensed: ["text-xs"],
      },
      arrow: {
        noArrow: [],
        upArrow: [
          "before:content-['']",
          "before:block",
          "before:absolute",
          "before:bottom-[99%]",
          "before:left-1/2",
          "before:-translate-x-1/2",
          "before:bg-[#5B5B5B]",
          "before:h-[6px]",
          "before:w-[18px]",
          "before:[clip-path:polygon(50%_0%,_100%_100%,_0%_100%)]",
        ],
        downArrow: [
          "before:content-['']",
          "before:block",
          "before:absolute",
          "before:top-[99%]",
          "before:left-1/2",
          "before:-translate-x-1/2",
          "before:bg-[#5B5B5B]",
          "before:h-[6px]",
          "before:w-[18px]",
          "before:[clip-path:polygon(50%_100%,_0%_0%,_100%_0%)]",
        ],
        leftArrow: [
          "before:content-['']",
          "before:block",
          "before:absolute",
          "before:right-[99%]",
          "before:top-1/2",
          "before:-translate-y-1/2",
          "before:bg-[#5B5B5B]",
          "before:h-[9px]",
          "before:w-[12px]",
          "before:[clip-path:polygon(0%_50%,_100%_0%,_100%_100%)]",
        ],
        rightArrow: [
          "before:content-['']",
          "before:block",
          "before:absolute",
          "before:left-[99%]",
          "before:top-1/2",
          "before:-translate-y-1/2",
          "before:bg-[#5B5B5B]",
          "before:h-[9px]",
          "before:w-[12px]",
          "before:[clip-path:polygon(100%_50%,_0%_0%,_0%_100%)]",
        ],
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
  variant: "primary" | "secondary" | "tertiary" | "primaryDanger" = "primary";
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

  private arrowType:
    | "upArrow"
    | "downArrow"
    | "leftArrow"
    | "rightArrow"
    | "noArrow" = "noArrow";

  override render() {
    if (this.arrow) {
      if (this.placement === "bottom") {
        this.arrowType = "upArrow";
      } else if (this.placement === "top") {
        this.arrowType = "downArrow";
      } else if (this.placement === "left") {
        this.arrowType = "rightArrow";
      } else {
        this.arrowType = "leftArrow";
      }
    }

    const tooltipClassName = cvaTooltip({
      placement: this.placement,
      variant: this.variant,
      size: this.size,
      arrow: this.arrowType,
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
