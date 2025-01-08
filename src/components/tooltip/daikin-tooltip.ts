import { flip, offset, shift } from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { guard } from "lit/directives/guard.js";
import { FloatingUIAutoUpdateController } from "../../controllers/floating-ui-auto-update";
import { isClient } from "../../is-client";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import { reDispatch } from "../../utils/re-dispatch";

const cvaTooltip = cva(
  [
    "left-[--floating-x,0]",
    "top-[--floating-y,0]",
    "w-max",
    "border",
    "border-solid",
    "rounded",
    "font-daikinSerif",
    "absolute",
    "floating-unready:hidden",
  ],
  {
    variants: {
      color: {
        default: [
          "text-ddt-color-common-text-primary",
          "bg-ddt-color-common-background-default",
          "border-ddt-color-common-neutral-default",
        ],
        inverse: [
          "text-ddt-color-common-text-inverse",
          "bg-[#212121]",
          "border-transparent",
        ],
      },
    },
  }
);

const DEFAULT_TOOLTIP_SPACING = "20px";

type TooltipVariantProps = MergeVariantProps<typeof cvaTooltip>;

/**
 * A tooltip component is used to show brief information when a user interacts with an element.
 *
 * @fires beforetoggle - _Cancellable._ A event emitted when the tooltip is about to be opened or closed by user interaction.
 * @fires toggle - A event emitted when the tooltip is opened or closed.
 *
 * @slot - A slot for the element to which the tooltip is attached (the trigger element).
 * @slot description - A slot for the tooltip description content.
 *
 * @cssprop [--ddc-tooltip-spacing=20px] - Spacing between the tooltip and the trigger
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/tooltip/index.js";
 * ```
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
      name: "--ddc-tooltip-spacing",
      syntax: "<length>",
      inherits: true,
      initialValue: "0px",
    });
  }

  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;

      --ddc-tooltip-spacing: ${unsafeCSS(DEFAULT_TOOLTIP_SPACING)};
    }

    #tooltip {
      width: max-content;
      padding: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
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
  color: TooltipVariantProps["color"] = "default";

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
   * - `auto`: Clicking on a trigger element will open a tooltip, and clicking again will close it. You can also close it using the Esc button. You cannot open multiple tooltips at the same time.
   * - `manual`: No click operation is specified for the trigger element. It will not close even if the Esc button is pressed. Multiple tooltips can be opened at once.
   */
  @property({ type: String, attribute: "popover-value" })
  popoverValue: "auto" | "manual" = "auto";

  /**
   * How the tooltip is controlled.
   * - `hover`: The tooltip is displayed when the mouse hovers over the trigger element, and hidden when the mouse is no longer hovering. (default)
   * - `click`: The tooltip is displayed when the mouse clicks on the trigger element, and hidden when you click on it again.
   * - `manual`: The tooltip does not respond to user interaction. Use this to control the tooltip programmatically.
   */
  @property({ type: String, reflect: true })
  trigger: "hover" | "click" | "manual" = "hover";

  private _autoUpdateController = new FloatingUIAutoUpdateController(this);

  private _hostStyles = isClient ? window.getComputedStyle(this) : null;

  private _ignoreFocusIn = false;

  private _handleClick(event: PointerEvent) {
    if (this.trigger === "click") {
      // Prevent the tooltip from closing via the Popover feature.
      event.preventDefault();

      this.open = !this.open;
      this._ignoreFocusIn = false;
    }
  }

  private _handleFocusIn() {
    if (this._ignoreFocusIn) {
      return;
    }

    this.open = true;
  }

  private _handleFocusOut() {
    this.open = false;
  }

  private _handleMouseEnter() {
    if (this.trigger === "hover") {
      this.open = true;
    }
  }

  private _handleMouseDown() {
    this._ignoreFocusIn = true;
  }

  private _handleMouseLeave() {
    if (this.trigger === "hover") {
      this.open = false;
    }

    this._ignoreFocusIn = false;
  }

  private _handleBeforeToggle(event: ToggleEvent) {
    reDispatch(this, event, new ToggleEvent("beforetoggle", event));
  }

  private _handleToggle(event: ToggleEvent) {
    if (reDispatch(this, event, new ToggleEvent("toggle", event))) {
      this.open = event.newState === "open";
    }
  }

  override render() {
    const spacing = parseInt(
      this._hostStyles?.getPropertyValue("--ddc-tooltip-spacing") ||
        DEFAULT_TOOLTIP_SPACING,
      10
    );

    // `aria-labelledby` in the tooltip is only for suppressing linting issues. I don't think it's harmful.
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`<div
      class="relative inline-block text-ddt-color-common-text-primary font-daikinSerif"
    >
      <div
        id="trigger"
        aria-labelledby="trigger"
        aria-describedby="tooltip"
        ${this._autoUpdateController.refReference()}
      >
        <slot
          @click=${this._handleClick}
          @focusin=${this._handleFocusIn}
          @focusout=${this._handleFocusOut}
          @mousedown=${this._handleMouseDown}
          @mouseenter=${this._handleMouseEnter}
          @mouseleave=${this._handleMouseLeave}
        ></slot>
      </div>
      <span
        id="tooltip"
        role="tooltip"
        aria-labelledby="tooltip"
        class=${cvaTooltip({ color: this.color })}
        .popover=${this.popoverValue}
        @beforetoggle=${this._handleBeforeToggle}
        @toggle=${this._handleToggle}
        ${this._autoUpdateController.refFloating()}
      >
        <slot name="description">
          <span class="whitespace-pre-line">${this.description}</span>
        </slot>
      </span>
      ${
        // Activate auto update only when the tooltip is open.
        // TODO(DDS-1226): refactor here with CSS Anchor Positioning instead of using floating-ui
        guard([this.open, this.placement, spacing], () =>
          this._autoUpdateController.directive(
            {
              placement: this.placement,
              middleware: [offset({ mainAxis: spacing }), flip(), shift()],
            },
            this.open
          )
        )
      }
    </div>`;
    /* eslint-enable lit-a11y/click-events-have-key-events */
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("open")) {
      this._autoUpdateController.floatingElement?.togglePopover(this.open);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tooltip": DaikinTooltip;
  }
}

DaikinTooltip.registerCSSCustomProperties();
