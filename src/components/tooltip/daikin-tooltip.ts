import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref, type Ref } from "lit/directives/ref.js";
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
 * A tooltip component.
 *
 * @fires click - Emitted when the trigger element be clicked.
 * @fires keydown - Emitted when the key press down on trigger element.
 * @fires mouseleave - Emitted when the mouse cursor move leave from trigger element
 * @fires mouseenter - Emitted when the mouse cursor move enter trigger element
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

  private _tooltipRef: Ref<HTMLElement> = createRef();

  private _triggerRef: Ref<HTMLElement> = createRef();

  private _cleanUpAutoUpdate: (() => void) | null = null;

  _handleClick() {
    if (this.closeOnClick) {
      this.open = false;
    }
  }

  _runAutoUpdate() {
    const reference = this._triggerRef.value;
    const float = this._tooltipRef.value;
    if (!reference || !float) {
      return;
    }
    this._cleanUpAutoUpdate?.();
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
    this.open = true;
  }

  _hideTooltip() {
    this.open = false;
  }

  _resetTooltipVisibility() {
    if (!this._tooltipRef.value) {
      return;
    }
    this._tooltipRef.value.style.visibility = "";
  }

  _handleMouseLeave() {
    this._hideTooltip();
    this._cleanUpAutoUpdate?.();
    this._cleanUpAutoUpdate = null;
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
        ${ref(this._triggerRef)}
        @click=${this._handleClick}
        @keydown=${this._handleClick}
        @mouseleave=${this._handleMouseLeave}
        @mouseenter=${this._handleMouseEnter}
      >
        <slot></slot>
      </div>
      <span ${ref(this._tooltipRef)} class="${tooltipClassName}">
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
