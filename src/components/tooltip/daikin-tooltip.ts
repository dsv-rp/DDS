import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
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

const DEFAULT_TOOLTIP_SPACING = `20px`;

/**
 * A tooltip component is used to show brief information when a user interacts with an element.
 *
 * @fires beforetoggle - _Cancellable._ A custom event emitted when the tooltip is about to be opened or closed by user interaction.
 * @fires toggle - A custom event emitted when the tooltip is opened or closed.
 *
 * @slot - A slot for the element to which the tooltip is attached (the trigger element).
 * @slot tooltip - A slot for the tooltip content.
 *
 * @cssprop [--dds-tooltip-spacing=20px] - Spacing between the tooltip and the trigger
 *
 * @example
 *
 * ```html
 * </daikin-tooltip>
 *   <span slot="tooltip">This is a message</span>
 *   <span>hover me</span>
 * </daikin-tooltip>
 * ```
 *
 * ```html
 * </daikin-tooltip description="This is a message">
 *   <span>hover me</span>
 * </daikin-tooltip>
 * ```
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
   * Specifies tooltip theme.
   */
  @property({ reflect: true, type: String })
  variant: "light" | "dark" = "light";
  /**
   * Whether the tooltip is open.
   */
  @property({ reflect: true, type: Boolean })
  open = false;
  /**
   * Specifies the content of the tooltip. Ignored if the tooltip slot exists.
   */
  @property({ reflect: true, type: String })
  description = "";
  /**
   * if true, the tooltip will hide on click.
   */
  @property({ reflect: true, type: Boolean })
  closeOnClick = false;

  /**
   * Whether the tooltip will be control by mouse hover or changing open state
   */
  @property({ reflect: true, type: String })
  trigger: "hover" | "manual" = "hover";

  private _tooltipRef: Ref<HTMLElement> = createRef();

  private _triggerRef: Ref<HTMLElement> = createRef();

  private _cleanUpAutoUpdate: (() => void) | null = null;

  private _hostStyles = window.getComputedStyle(this);

  private _startAutoUpdate() {
    const reference = this._triggerRef.value;
    const float = this._tooltipRef.value;
    if (!reference || !float) {
      return;
    }
    this._cleanUpAutoUpdate?.();
    // TODO(DDS-1226): refactor here with popover api + CSS Anchor Positioning instead of using floating-ui
    this._cleanUpAutoUpdate = autoUpdate(reference, float, () => {
      const spacing = parseInt(
        this._hostStyles.getPropertyValue("--dds-tooltip-spacing") ||
          DEFAULT_TOOLTIP_SPACING,
        10
      );
      computePosition(reference, float, {
        placement: this.placement,
        middleware: [offset({ mainAxis: spacing }), flip(), shift()],
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

  private _uninstallAutoUpdate() {
    this.open = false;
    this._cleanUpAutoUpdate?.();
    this._cleanUpAutoUpdate = null;
  }

  private _changeOpenState(state: boolean) {
    if (this.open === state) {
      return;
    }
    if (
      !this.dispatchEvent(
        new CustomEvent("beforetoggle", {
          detail: { open: this.open },
          bubbles: true,
          composed: true,
          cancelable: true,
        })
      )
    ) {
      return;
    }
    this.open = state;
  }

  private _handleClick() {
    if (this.closeOnClick) {
      this._changeOpenState(false);
    }
  }

  private _handleMouseLeave() {
    if (this.trigger === "hover") {
      this._changeOpenState(false);
    }
  }

  private _handleMouseEnter() {
    if (this.trigger === "hover") {
      this._changeOpenState(true);
    }
  }

  override render() {
    const tooltipClassName = cvaTooltip({
      variant: this.variant,
      open: this.open,
    });
    return html`<div class="relative inline-block">
      <div
        ${ref(this._triggerRef)}
        part="trigger"
        @click=${this._handleClick}
        @keydown=${this._handleClick}
        @mouseleave=${this._handleMouseLeave}
        @mouseenter=${this._handleMouseEnter}
      >
        <slot></slot>
      </div>
      <span ${ref(this._tooltipRef)} part="tooltip" class=${tooltipClassName}>
        <slot name="tooltip">
          <span class="whitespace-pre-line">${this.description}</span>
        </slot>
      </span>
    </div>`;
  }

  static registerCSSCustomProperties(): void {
    window.CSS.registerProperty({
      name: "--dds-tooltip-spacing",
      syntax: "<length>",
      inherits: true,
      initialValue: DEFAULT_TOOLTIP_SPACING,
    });
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("open")) {
      if (this.open) {
        this._startAutoUpdate();
      } else {
        this._cleanUpAutoUpdate?.();
        this._cleanUpAutoUpdate = null;
      }
      this.dispatchEvent(
        new CustomEvent("toggle", {
          detail: { open: this.open },
          bubbles: true,
          composed: true,
          cancelable: false,
        })
      );
    }
  }

  override disconnectedCallback() {
    this._uninstallAutoUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tooltip": DaikinTooltip;
  }
}

DaikinTooltip.registerCSSCustomProperties();
