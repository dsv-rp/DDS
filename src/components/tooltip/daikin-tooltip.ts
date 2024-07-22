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
  queryAssignedElements,
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
    "top-[0]",
    "left-[0]",
    "max-w-[312px]",

    "text-sm",
    "font-daikinSerif",
    "font-normal",
    "not-italic",
    "leading-5",

    "group-hover:visible",
    "group-hover:opacity-100",
  ],
  {
    variants: {
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
  private _tooltip: HTMLSpanElement | null | undefined;

  @queryAssignedElements({ slot: "description" })
  private _descriptionElements!: Array<HTMLElement>;

  private _descriptionSlotExist() {
    return this._descriptionElements.length > 0;
  }

  _handleClick() {
    if (this.closeOnClick && this._tooltip) {
      this._tooltip.style.visibility = "hidden";
    }
  }

  _resetTooltipVisibility() {
    if (!this._tooltip) {
      return;
    }
    this._tooltip.style.visibility = "";
  }

  override render() {
    const description =
      this.description && !this._descriptionSlotExist()
        ? html`<span>${this.description}</span>`
        : html`<slot name="description"></slot>`;
    const tooltipClassName = cvaTooltip({
      variant: this.variant,
      open: this.open,
    });
    return html`<div
      class="group relative inline-block"
      @click=${this._handleClick}
      @keydown=${this._handleClick}
      @mouseleave=${this._resetTooltipVisibility}
    >
      <slot></slot>
      <span id="tooltip" class="${tooltipClassName}">${description}</span>
    </div>`;
  }

  protected override updated(): void {
    const reference = this.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements()[0];
    const float = this.shadowRoot?.querySelector("span");
    if (!reference || !float) {
      return;
    }
    autoUpdate(reference, float, () => {
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
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tooltip": DaikinTooltip;
  }
}
