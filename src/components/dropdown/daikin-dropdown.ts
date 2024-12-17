import {
  flip,
  offset,
  size,
  type ComputePositionConfig,
} from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  query,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { ClickOutsideController } from "../../controllers/click-outside";
import { FloatingUIAutoUpdateController } from "../../controllers/floating-ui-auto-update";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinDropdownItem } from "../dropdown-item";
import type { DaikinInputGroup } from "../input-group";

const cvaButton = cva(
  [
    "flex",
    "items-center",
    "gap-2",
    "w-full",
    "h-full",
    "min-h-12",
    "bg-ddt-color-common-background-default",
    "p-3",
    "border",
    "border-[--color-base]",
    "rounded",
    "overflow-hidden",
    "font-daikinSerif",
    "text-left",
    "leading-5",
    "relative",
    "outline",
    "outline-0",
    "-outline-offset-2",

    "focus-visible:outline-2",
    "focus-visible:outline-[--color-focus]",

    "disabled:text-ddt-color-common-disabled",
    "disabled:border-ddt-color-common-disabled",

    "after:i-daikin-dropdown-chevron-down",
    "after:w-6",
    "after:h-6",
    "after:absolute",
    "after:m-auto",
    "after:top-0",
    "after:bottom-0",
    "after:right-3",

    "enabled:after:text-ddt-color-common-text-primary",
    "disabled:after:text-ddt-color-common-disabled",
  ],
  {
    variants: {
      open: {
        false: [
          "enabled:hover:bg-ddt-color-common-surface-hover",
          "enabled:active:bg-ddt-color-common-surface-press",
        ],
        true: ["enabled:bg-ddt-color-common-surface-press"],
      },
      error: {
        false: [
          "var-color-ddt-color-common-neutral-default/color-base",
          "var-color-ddt-color-common-border-focus/color-focus",
        ],
        true: [
          "var-color-ddt-color-common-danger-default/color-base",
          "var-color-ddt-color-common-danger-default/color-focus",
        ],
      },
      placeholder: {
        false: ["text-ddt-color-common-text-primary"],
        true: ["text-ddt-color-common-text-secondary"],
      },
    },
  }
);

const floatingPositionOptions: Partial<ComputePositionConfig> = {
  placement: "bottom",
  middleware: [
    flip({ fallbackStrategy: "initialPlacement" }),
    offset({ mainAxis: 0 }),
    size({
      apply({ rects, elements }) {
        elements.floating.style.setProperty(
          "--floating-width",
          `${rects.reference.width}px`
        );
      },
    }),
  ],
};

/**
 * A dropdown list component.
 *
 * Hierarchy:
 * - `daikin-dropdown` > `daikin-dropdown-item`
 * - `daikin-input-group` > `daikin-dropdown` > `daikin-dropdown-item`
 *
 * @fires change - A custom event emitted when a user selects a dropdown item.
 *
 * @slot - Dropdown item list slot. Place `daikin-dropdown-item` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-dropdown label="Dropdown label">
 *   <daikin-dropdown-item value="value1">Dropdown item 1</daikin-dropdown-item>
 *   <daikin-dropdown-item value="value2">Dropdown item 2</daikin-dropdown-item>
 *   <daikin-dropdown-item value="value3" disabled>Dropdown item 3</daikin-dropdown-item>
 * </daikin-dropdown>
 * ```
 */
@customElement("daikin-dropdown")
export class DaikinDropdown extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }

    ::slotted {
      width: 100%;
    }
  `;

  static readonly formAssociated = true;

  private _internals = this.attachInternals();

  /**
   * Form value of the dropdown.
   * `null` if not selected.
   */
  @property({ type: String, reflect: true })
  value: string | null = null;

  /**
   * Placeholder text of the dropdown.
   */
  @property({ type: String, reflect: true })
  placeholder = "";

  /**
   * Whether the dropdown is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the dropdown is required.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the dropdown is in an error state.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Whether the dropdown menu is opened.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  @queryAssignedElements({ selector: "daikin-dropdown-item" })
  private readonly _items!: readonly DaikinDropdownItem[];

  @query("button")
  private _button!: HTMLElement | null;

  /**
   * The label text used as the value of aria-label.
   * Set automatically by `reflectInputGroup` method.
   */
  @state()
  private _label: string | null = null;

  @state()
  private _hasSelectedItem = false;

  @state()
  private _selectedItemLabel = "";

  private _autoUpdateController = new FloatingUIAutoUpdateController(this);

  private _clickOutsideController = new ClickOutsideController(
    this,
    this._onClickOutside
  );

  /**
   * Last focused dropdown item.
   * The next time the dropdown opens, the focus will be moved to this element.
   */
  private _lastFocusedItem: DaikinDropdownItem | null = null;

  private _updateFormValue() {
    this._internals.setFormValue(this.value);
  }

  private _onClickOutside(): void {
    this.open = false;
  }

  private _reflectItemsAndLabel(): void {
    const items = this._items;

    const selectedItem = items.find((item) => item.value === this.value);
    for (const item of items) {
      item.selected = item === selectedItem;
    }

    this._hasSelectedItem = !!selectedItem;
    this._selectedItemLabel = selectedItem?.textContent ?? "";
  }

  private _handleClick(): void {
    if (this.disabled) {
      return;
    }

    this.open = !this.open;
  }

  private _searchItem(prefix: string): void {
    const items = this._items.filter(
      (item) =>
        !item.disabled &&
        item.textContent?.toLowerCase().startsWith(prefix.toLowerCase())
    );

    if (!items.length) {
      // Open the dropdown if not.
      this.open = true;
      return;
    }

    const activeElement = document.activeElement;
    const focusedItemIndex = activeElement
      ? items.findIndex((item) => item.contains(activeElement))
      : -1;

    const nextItem = items[(focusedItemIndex + 1) % items.length];

    if (this.open) {
      // Focus on the item.
      nextItem.focus();
    } else {
      // Change the item that is focused after the dropdown opens, then open the dropdown.
      this._lastFocusedItem = nextItem;
      this.open = true;
    }
  }

  private _handleKeyDownEscape() {
    if (this.open) {
      // Close
      this.open = false;
    } else {
      // Clear selection
      this.value = null;
    }
  }

  private _moveFocus(moveOffset: 1 | -1): void {
    // Open the dropdown if not.
    if (!this.open) {
      this.open = true;
      return;
    }

    const items = this._items;

    // Get focused item if any
    const activeElement = document.activeElement;
    const focusedItemIndex = activeElement
      ? items.findIndex((item) => item.contains(activeElement))
      : -1;

    // If there is no item focused, then focus on the first item.
    if (focusedItemIndex === -1) {
      moveOffset = 1;
    }

    // Focus on the first item that is enabled.
    for (
      let index = focusedItemIndex + moveOffset, i = 0;
      i < items.length;
      index += moveOffset, i++
    ) {
      index = (index + items.length) % items.length;
      const item = items[index];

      if (item.disabled) {
        continue;
      }

      item.focus();
      break;
    }
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    const printableCharacter = event.key.trim().length === 1 ? event.key : null;
    if (printableCharacter) {
      event.preventDefault();
      this._searchItem(printableCharacter);
      return;
    }

    const operation = (
      {
        ArrowDown: "down",
        ArrowUp: "up",
        Escape: "close",
      } as const
    )[event.key];

    switch (operation) {
      case "down":
      case "up":
        event.preventDefault();
        this._moveFocus(operation === "up" ? -1 : 1);
        break;

      case "close":
        event.preventDefault();
        this._handleKeyDownEscape();
        break;
    }
  }

  /**
   * Handle `select` event from `daikin-dropdown-item`.
   */
  private _handleSelect(event: Event): void {
    const target = event.target as DaikinDropdownItem | null;
    if (!target || !this._items.includes(target)) {
      return;
    }

    this._hasSelectedItem = true;
    this._selectedItemLabel = target.textContent ?? "";

    this.value = target.value;
    this.open = false;

    this.dispatchEvent(new Event("change"));
  }

  /**
   * Handle `focusin` event to remember last focused item.
   */
  private _handleFocusIn(event: Event): void {
    const target = event.target as DaikinDropdownItem | null;
    if (!target || !this._items.includes(target)) {
      return;
    }

    this._lastFocusedItem = target;
  }

  /**
   * Handle `floating-ready` event dispatched by `FloatingUIAutoUpdateController`.
   * The dropdown menu opens after the Floating UI has finished calculating its position, so there is a slight time lag between the change to `this.open` and the actual display.
   * Since the focus cannot be moved until the element is displayed on the screen, the focus is moved to the item after receiving the completion of the Floating UI position calculation here.
   */
  private _handleFloatingReady(): void {
    const items = this._items;
    const item =
      items.find((item) => item === this._lastFocusedItem) ??
      items.find((item) => item.value === this.value) ??
      items.at(0);

    item?.focus();
  }

  override render() {
    return html`<div class="w-full relative" @keydown=${this._handleKeyDown}>
      <button
        type="button"
        class=${cvaButton({
          open: this.open,
          error: this.error,
          placeholder: !this._hasSelectedItem,
        })}
        ?disabled=${this.disabled}
        role="combobox"
        aria-label=${ifDefined(this._label ?? undefined)}
        aria-expanded=${this.open && !this.disabled}
        aria-disabled=${this.disabled}
        aria-controls="dropdown-items"
        aria-autocomplete="list"
        aria-required=${this.required}
        @click=${this._handleClick}
        ${this._autoUpdateController.refReference()}
      >
        ${this._hasSelectedItem ? this._selectedItemLabel : this.placeholder}
      </button>
      <div
        id="dropdown-items"
        popover
        class="floating-unready:hidden absolute left-[--floating-x,0] top-[--floating-y,0] min-w-[--floating-width] max-h-[12.5rem] overflow-y-auto opacity-1 transition-[opacity] rounded shadow-dropdown"
        aria-label=${ifDefined(this._label ?? undefined)}
        role="listbox"
        @floating-ready=${this._handleFloatingReady}
        ${this._autoUpdateController.refFloating()}
      >
        <slot
          @select=${this._handleSelect}
          @focusin=${this._handleFocusIn}
        ></slot>
      </div>
      ${
        // Activate auto update only when the dropdown is open.
        // TODO(DDS-1226): refactor here with CSS Anchor Positioning instead of using floating-ui
        this._autoUpdateController.directive(
          floatingPositionOptions,
          this.open && !this.disabled
        )
      }
      ${
        // Listen to click outside only when the dropdown is open.
        this._clickOutsideController.directive(this.open && !this.disabled)
      }
    </div>`;
  }

  override focus(options?: FocusOptions): void {
    this._button?.focus(options);
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("value")) {
      this._updateFormValue();
      this._reflectItemsAndLabel();
    }

    if (changedProperties.has("open") || changedProperties.has("disabled")) {
      this._autoUpdateController.floatingElement?.togglePopover(
        this.open && !this.disabled
      );

      // Focus on the dropdown trigger button when closed.
      // Focusing on the item when the dropdown opens is done in the `_handleFloatingReady` method.
      if (changedProperties.get("open") && !this.open && !this.disabled) {
        this.focus();
      }
    }
  }

  reflectInputGroup(inputGroup: DaikinInputGroup): void {
    const isError = !inputGroup.disabled && !!inputGroup.error;
    this.disabled = !!inputGroup.disabled;
    this.required = !!inputGroup.required;
    this.error = isError;
    this._label = inputGroup.label;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown": DaikinDropdown;
  }
}
