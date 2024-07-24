import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import {
  customElement,
  property,
  query,
  queryAssignedNodes,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTooltip = cva(
  [
    "absolute",

    "p-3",
    "justify-center",
    "items-center",
    "rounded",
    "w-max",
    "top-0",
    "left-0",
    "max-w-[312px]",

    "text-sm",
    "font-daikinSerif",
    "font-normal",
    "not-italic",
    "leading-5",
  ],
  {
    variants: {
      variant: {
        light: [
          "border",
          "border-solid",
          "border-daikinNeutral-800",
          "bg-[#ffffffe6]",
          "text-black",
        ],
        dark: ["bg-[#414141e6]", "text-white"],
      },
      open: {
        true: ["visible", "opacity-100"],
        false: ["invisible", "opacity-0"],
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
   * Specifies the position of the tooltip relative to the trigger.
   */
  @property({ reflect: true, type: String })
  placement: "top" | "bottom" | "left" | "right" = "bottom";
  /**
   * Specifies tooltip type
   */
  @property({ reflect: true, type: String })
  variant: "light" | "dark" = "light";
  /**
   * Specifies whether the tooltip should be open when it first renders
   */
  @property({ reflect: true, type: Boolean })
  open = false;
  /**
   * Specifies the content of the tooltip. Ignored if the description slot exists.
   */
  @property({ reflect: true, type: String })
  description = "";
  /**
   * if true, the tooltip will hide on click
   */
  @property({ reflect: true, type: Boolean })
  closeOnClick = false;

  @queryAssignedNodes({ slot: "list", flatten: true })
  slotItems?: Array<Node>;

  @query("#tooltip")
  private _tooltip!: HTMLElement | null;

  @query("#reference")
  private _triggerElement!: HTMLElement | null;

  private _cleanUpAutoUpdate!: () => void;

  _handleClick() {
    if (this.closeOnClick && this._tooltip) {
      this._tooltip.style.visibility = "hidden";
    }
  }

  _runAutoUpdate() {
    const reference = this._triggerElement;
    const float = this._tooltip;
    if (!reference || !float) {
      return;
    }
    this._cleanUpAutoUpdate = autoUpdate(reference, float, () => {
      computePosition(reference, float, {
        placement: this.placement,
        middleware: [offset({ mainAxis: 20 }), flip(), shift()],
      })
        .then(({ x, y }) => {
          Object.assign(float.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        })
        .catch((e: unknown) => console.error(e));
    });
  }

  _showTooltip() {
    if (!this._tooltip) {
      return;
    }
    this._tooltip.classList.add("visible", "opacity-100");
    this._tooltip.classList.remove("invisible", "opacity-0");
  }

  _hideTooltip() {
    if (!this._tooltip) {
      return;
    }
    this._tooltip.classList.remove("visible", "opacity-100");
    this._tooltip.classList.add("invisible", "opacity-0");
  }

  _resetTooltipVisibility() {
    if (!this._tooltip) {
      return;
    }
    this._tooltip.style.visibility = "";
  }

  _handleMouseLeave() {
    this._hideTooltip();
    this._cleanUpAutoUpdate();
    this._resetTooltipVisibility();
  }

  _handleMouseEnter() {
    this._showTooltip();
    this._runAutoUpdate();
  }

  override render() {
    const tooltipClassName = cvaTooltip({
      variant: this.variant,
      open: this.open,
    });
    return html`<div class="relative inline-block">
      <div
        id="reference"
        @click=${this._handleClick}
        @keydown=${this._handleClick}
        @mouseleave=${this._handleMouseLeave}
        @mouseenter=${this._handleMouseEnter}
      >
        <slot></slot>
      </div>
      <span id="tooltip" class="${tooltipClassName}">
        <slot name="description">
          <span>${this.description}</span>
        </slot>
      </span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tooltip": DaikinTooltip;
  }
}
