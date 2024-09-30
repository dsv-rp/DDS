import { autoUpdate, computePosition, flip, offset } from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { createRef, ref, type Ref } from "lit/directives/ref.js";
import { isClient } from "../../is-client";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTooltip = cva(
  [
    "justify-center",
    "items-center",
    "w-max",
    "p-3",
    "border",
    "border-solid",
    "rounded",
    "text-sm",
    "font-daikinSerif",
    "font-normal",
    "absolute",
    "inset-[unset]",
    "not-italic",
    "leading-5",
  ],
  {
    variants: {
      variant: {
        light: ["border-daikinNeutral-800", "bg-white/90", "text-black"],
        dark: ["border-transparent", "bg-daikinNeutral-800/90", "text-white"],
      },
    },
  }
);

const DEFAULT_TOOLTIP_SPACING = "20px";

/**
 * A tooltip component is used to show brief information when a user interacts with an element.
 *
 * @fires beforetoggle - _Cancellable._ A event emitted when the tooltip is about to be opened or closed by user interaction.
 * @fires toggle - A event emitted when the tooltip is opened or closed.
 *
 * @slot - A slot for the element to which the tooltip is attached (the trigger element).
 * @slot description - A slot for the tooltip description content.
 *
 * @cssprop [--dds-tooltip-spacing=20px] - Spacing between the tooltip and the trigger
 *
 * @example
 *
 * ```html
 * <daikin-tooltip>
 *   <span>Hover me</span>
 *   <span slot="description">This is a message</span>
 * </daikin-tooltip>
 * ```
 *
 * ```html
 * <daikin-tooltip description="This is a message">
 *   <span>Hover me</span>
 * </daikin-tooltip>
 * ```
 */
@customElement("daikin-tooltip")
export class DaikinTooltip extends LitElement {
  static registerCSSCustomProperties(): void {
    if (!isClient) {
      return;
    }

    window.CSS.registerProperty({
      name: "--dds-tooltip-spacing",
      syntax: "<length>",
      inherits: true,
      initialValue: "0px",
    });
  }

  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;

      --dds-tooltip-spacing: ${unsafeCSS(DEFAULT_TOOLTIP_SPACING)};
    }
  `;

  /**
   * Specifies the position of the tooltip relative to the trigger.
   */
  @property({ type: String, reflect: true })
  placement: "top" | "bottom" | "left" | "right" = "bottom";

  /**
   * Specifies the tooltip theme.
   */
  @property({ type: String, reflect: true })
  variant: "light" | "dark" = "light";

  /**
   * Whether the tooltip is open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Specifies the content of the tooltip.
   * Ignored if the `tooltip` slot exists.
   */
  @property({ type: String })
  description = "";

  /**
   * Specify the value of the popover attribute in the Popover API.
   */
  @property({ type: String, attribute: "popover-value" })
  popoverValue: "auto" | "manual" = "auto";

  /**
   * How the tooltip is controlled.
   * - "hover": The tooltip is displayed when the mouse hovers over the trigger element, and hidden when the mouse is no longer hovering. (default)
   * - "click": The tooltip is displayed when the mouse clicks on the trigger element, and hidden when you click on it again.
   * - "manual": The tooltip does not respond to user interaction. Use this to control the tooltip programmatically.
   */
  @property({ type: String, reflect: true })
  trigger: "hover" | "click" | "manual" = "hover";

  @query("span[popover]")
  private _popover!: HTMLElement;

  @state()
  private _isFocused = false;

  private _tooltipRef: Ref<HTMLElement> = createRef();

  private _triggerRef: Ref<HTMLElement> = createRef();

  private _autoUpdateCleanup: (() => void) | null = null;

  private _hostStyles = isClient ? window.getComputedStyle(this) : null;

  private _startAutoUpdate() {
    if (!isClient) {
      return;
    }

    const reference = this._triggerRef.value;
    const float = this._tooltipRef.value;
    if (!reference || !float) {
      return;
    }

    // TODO(DDS-1226): refactor here with CSS Anchor Positioning instead of using floating-ui
    this._autoUpdateCleanup?.();
    this._autoUpdateCleanup = autoUpdate(reference, float, () => {
      const spacing = parseInt(
        this._hostStyles?.getPropertyValue("--dds-tooltip-spacing") ||
          DEFAULT_TOOLTIP_SPACING,
        10
      );

      computePosition(reference, float, {
        placement: this.placement,
        middleware: [offset({ mainAxis: spacing }), flip()],
      })
        .then(({ x, y }) =>
          Object.assign(float.style, {
            left: `${x}px`,
            top: `${y}px`,
          })
        )
        .catch((e: unknown) => console.error(e));
    });
  }

  private _uninstallAutoUpdate() {
    this.open = false;
    this._autoUpdateCleanup?.();
    this._autoUpdateCleanup = null;
  }

  private _changeOpenState() {
    this._popover.togglePopover(!this.open);

    this.open = !this.open;
  }

  private _handleClick() {
    if (this.trigger === "click") {
      this._changeOpenState();
    }
  }

  private _handleKeydown() {
    if (this.trigger === "click" && !this.open) {
      this._changeOpenState();
    }
  }

  private _handleMouseEnter() {
    if (this.trigger === "hover" && !this.open) {
      this._changeOpenState();
    }
  }

  private _handleMouseLeave() {
    if (this.trigger === "hover" && this.open && !this._isFocused) {
      this._changeOpenState();
    }
  }

  private _handleFocusIn() {
    this._isFocused = true;

    if (!this.open) {
      this._changeOpenState();
    }
  }

  private _handleFocusOut() {
    if (this.open) {
      this._changeOpenState();
      this._isFocused = false;
    }
  }

  override render() {
    return html`<div class="relative inline-block">
      <div
        ${ref(this._triggerRef)}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
        @mouseenter=${this._handleMouseEnter}
        @mouseleave=${this._handleMouseLeave}
      >
        <slot
          @focusin=${this._handleFocusIn}
          @focusout=${this._handleFocusOut}
        ></slot>
      </div>
      <span
        ${ref(this._tooltipRef)}
        class=${cvaTooltip({
          variant: this.variant,
        })}
        aria-label="description"
        role="tooltip"
        popover=${this.popoverValue}
        @beforetoggle=${(event: ToggleEvent) =>
          this.dispatchEvent(new Event("beforetoggle", event))}
        @toggle=${(event: ToggleEvent) =>
          this.dispatchEvent(new Event("toggle", event))}
      >
        <slot name="description">
          <span class="whitespace-pre-line">${this.description}</span>
        </slot>
      </span>
    </div>`;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("open")) {
      if (this.open) {
        this._startAutoUpdate();
      } else {
        this._autoUpdateCleanup?.();
        this._autoUpdateCleanup = null;
      }
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
