import { flip, offset, shift } from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { css, html, unsafeCSS, type PropertyValues } from "lit";
import { property, queryAssignedElements } from "lit/decorators.js";
import { guard } from "lit/directives/guard.js";
import { createRef, ref } from "lit/directives/ref.js";
import { DDSElement, ddsElement } from "../../base";
import { FloatingUIAutoUpdateController } from "../../controllers/floating-ui-auto-update";
import { isClient } from "../../is-client";
import tailwindStyles from "../../tailwind.css?inline";
import { reDispatch } from "../../utils/re-dispatch";
import type DaikinList from "../list/daikin-list";

const cvaMenu = cva([
  "left-[--floating-x,0]",
  "top-[--floating-y,0]",
  "w-max",
  "py-2",
  "border",
  "rounded-lg",
  "font-daikinSerif",
  "absolute",
  "floating-unready:hidden",
  "bg-ddt-color-common-background-default",
  "border-ddt-color-divider",
]);

const DEFAULT_MENU_SPACING = "0px";

/**
 * A menu component is used to show list information when a user interacts with an element.
 *
 * @fires beforetoggle - _Cancellable._ A event emitted when the menu is about to be opened or closed by user interaction.
 * @fires toggle - A event emitted when the menu is opened or closed.
 *
 * @slot - A slot for the element to which the menu is attached (the trigger element).
 * @slot menu - A slot for the menu content (daikin-list component).
 *
 * @cssprop [--ddc-menu-spacing=0px] - Spacing between the menu and the trigger.
 *
 * @csspart menu - Change the style of menu.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/menu/index.js";
 * import "@daikin-oss/design-system-web-components/components/button/index.js";
 * import "@daikin-oss/design-system-web-components/components/list/index.js";
 * import "@daikin-oss/design-system-web-components/components/list-item/index.js";
 * ```
 *
 * ```html
 * <daikin-menu>
 *   <daikin-button>Click me</daikin-button>
 *   <daikin-list slot="menu" style="width: 256px">
 *     <daikin-list-item>List item label 1</daikin-list-item>
 *     <daikin-list-item>List item label 2</daikin-list-item>
 *     <daikin-list-item>List item label 3</daikin-list-item>
 *   </daikin-list>
 * </daikin-menu>
 * ```
 */
@ddsElement("daikin-menu")
export class DaikinMenu extends DDSElement {
  static registerCSSCustomProperties(): void {
    if (!isClient) {
      return;
    }

    window.CSS.registerProperty({
      name: "--ddc-menu-spacing",
      syntax: "<length>",
      inherits: true,
      initialValue: "0px",
    });
  }

  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;

      --ddc-menu-spacing: ${unsafeCSS(DEFAULT_MENU_SPACING)};
    }
  `;

  @queryAssignedElements({ slot: "menu", selector: "daikin-list" })
  private readonly _lists!: Array<DaikinList>;

  /**
   * Specifies the position of the menu relative to the trigger.
   */
  @property({ type: String, reflect: true })
  placement: "top" | "bottom" | "left" | "right" = "bottom";

  /**
   * Whether the menu is open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether the menu has divider.
   */
  @property({ type: Boolean, reflect: true })
  divider = false;

  /**
   * Specify the value of the popover attribute in the Popover API.
   * - `auto`: Clicking on a trigger element will open a menu, and clicking again will close it. You can also close it using the Esc button. You cannot open multiple menu at the same time.
   * - `manual`: No click operation is specified for the trigger element. It will not close even if the Esc button is pressed. Multiple menu can be opened at once.
   */
  @property({ type: String, attribute: "popover-value" })
  popoverValue: "auto" | "manual" = "auto";

  /**
   * How the menu is controlled.
   * - `hover`: The menu is displayed when the mouse hovers over the trigger element, and hidden when the mouse is no longer hovering trigger or menu. (default)
   * - `click`: The menu is displayed when the mouse clicks on the trigger element, and hidden when you click on it again. (default)
   * - `manual`: The menu does not respond to user interaction. Use this to control the menu programmatically.
   */
  @property({ type: String, reflect: true })
  trigger: "hover" | "click" | "manual" = "hover";

  private _menuRef = createRef<HTMLElement>();

  private _triggerRef = createRef<HTMLElement>();

  private _reflectSlotProperties(): void {
    for (const daikinList of this._lists) {
      daikinList.divider = this.divider;
    }
  }

  private _autoUpdateController = new FloatingUIAutoUpdateController(this);

  private _hostStyles = isClient ? window.getComputedStyle(this) : null;

  private _handleTriggerClick(event: PointerEvent) {
    if (this.trigger === "click") {
      // Prevent the menu from closing via the Popover feature.
      event.preventDefault();

      this.open = !this.open;
    }
  }

  private _handleTriggerFocusIn() {
    if (this.trigger === "hover") {
      this.open = true;
    }
  }

  private _handleTriggerFocusOut() {
    this.open = false;
  }

  private _handleTriggerMouseEnter() {
    if (this.trigger === "hover") {
      this.open = true;
    }
  }

  private _handleTriggerMouseLeave() {
    if (this.trigger === "hover" && !this._menuRef.value?.matches(":hover")) {
      this.open = false;
    }
  }

  private _handleMenuMouseLeave() {
    if (
      this.trigger === "hover" &&
      !this._triggerRef.value?.matches(":hover")
    ) {
      this.open = false;
    }
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
      this._hostStyles?.getPropertyValue("--ddc-menu-spacing") ||
        DEFAULT_MENU_SPACING,
      10
    );

    // `aria-labelledby` in the menu is only for suppressing linting issues. I don't think it's harmful.
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`<div
      class="relative inline-block text-ddt-color-common-text-primary font-daikinSerif"
    >
      <div
        id="trigger"
        aria-labelledby="trigger"
        aria-describedby="menu"
        ${this._autoUpdateController.refReference()}
      >
        <slot
          ${ref(this._triggerRef)}
          @click=${this._handleTriggerClick}
          @focusin=${this._handleTriggerFocusIn}
          @focusout=${this._handleTriggerFocusOut}
          @mouseenter=${this._handleTriggerMouseEnter}
          @mouseleave=${this._handleTriggerMouseLeave}
        ></slot>
      </div>
      <span
        id="menu"
        role="menu"
        ${ref(this._menuRef)}
        aria-labelledby="menu"
        part="menu"
        class=${cvaMenu()}
        popover=${this.popoverValue}
        @beforetoggle=${this._handleBeforeToggle}
        @toggle=${this._handleToggle}
        @mouseleave=${this._handleMenuMouseLeave}
        ${this._autoUpdateController.refFloating()}
      >
        <slot name="menu"></slot>
      </span>
      ${
        // Activate auto update only when the menu is open.
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
    if (changedProperties.has("divider")) {
      this._reflectSlotProperties();
    }
    if (changedProperties.has("open")) {
      this._autoUpdateController.floatingElement?.togglePopover(this.open);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-menu": DaikinMenu;
  }
}

DaikinMenu.registerCSSCustomProperties();
