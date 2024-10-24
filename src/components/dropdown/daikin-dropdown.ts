import { flip, offset, type ComputePositionConfig } from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
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
    "bg-white",
    "pl-4",
    "pr-3",
    "border",
    "border-[--color-base]",
    "rounded-md",
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

    "disabled:text-daikinNeutral-200",
    "disabled:border-daikinNeutral-200",

    "after:i-daikin-dropdown-chevron-down",
    "after:w-6",
    "after:h-6",
    "after:absolute",
    "after:m-auto",
    "after:top-0",
    "after:bottom-0",
    "after:right-3",
  ],
  {
    variants: {
      open: {
        false: [
          "enabled:hover:bg-[#f2f2f2]",
          "enabled:active:bg-daikinNeutral-100",
        ],
        true: ["enabled:bg-daikinNeutral-100"],
      },
      error: {
        false: [
          "var-color-daikinNeutral-600/color-base",
          "var-color-daikinBlue-700/color-focus",
        ],
        true: [
          "var-color-daikinRed-500/color-base",
          "var-color-daikinRed-500/color-focus",
        ],
      },
      placeholder: {
        false: ["text-daikinNeutral-900"],
        true: ["text-daikinNeutral-700"],
      },
    },
  }
);

const cvaContent = cva(
  [
    "w-full",
    "max-h-[200px]",
    "overflow-y-auto",
    "absolute",
    "left-[--floating-x,0]",
    "top-[--floating-y,0]",
    "opacity-1",
    "transition-[opacity]",
    "rounded-[4px]",
    "shadow-dropdown",
  ],
  {
    variants: {
      open: {
        false: ["hidden"],
        true: ["block"],
      },
    },
  }
);

const floatingPositionOptions: Partial<ComputePositionConfig> = {
  placement: "bottom",
  middleware: [
    flip({ fallbackStrategy: "initialPlacement" }),
    offset({ mainAxis: 0 }),
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
   * Label of the dropdown.
   */
  @property({ type: String, reflect: true })
  label = "";

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

  @state()
  private _hasSelectedItem = false;

  @state()
  private _selectedItemLabel = "";

  private _autoUpdateController = new FloatingUIAutoUpdateController(this);

  private _clickOutsideController = new ClickOutsideController(
    this,
    this._onClickOutside
  );

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
    this.open = !this.open;
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    const operation = (
      {
        ArrowDown: "moveDown",
        ArrowUp: "moveUp",
        Escape: "close",
      } as const
    )[event.key];

    if (!operation) {
      return;
    }

    if (operation === "close") {
      if (this.open) {
        // Close
        this.open = false;
      } else {
        // Clear selection
        this.value = null;
      }
      return;
    }

    const moveOffset = operation === "moveUp" ? -1 : 1;
    const items = this._items;

    // Get focused item if any
    const activeElement = document.activeElement;
    const focusedItemIndex = activeElement
      ? items.findIndex((item) => item.contains(activeElement))
      : -1;

    // If there is no dropdown focused, do nothing.
    if (focusedItemIndex === -1 && moveOffset === -1) {
      return;
    }

    // Focus on the first dropdown that is enabled.
    for (
      let index = focusedItemIndex + moveOffset, i = 0;
      i < items.length;
      index += moveOffset, i++
    ) {
      index = (index + items.length) % items.length;
      const item = items[index];

      if (!this.open) {
        this.open = true;
      }

      if (item.disabled) {
        continue;
      }

      this.updateComplete.then(
        () => {
          item.focus();
        },
        () => {
          // do nothing
        }
      );

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

    this.open = false;
    this.value = target.value;

    this.dispatchEvent(new Event("change"));
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
        aria-label=${this.label}
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
        class=${cvaContent({
          open: this.open && !this.disabled,
        })}
        aria-label=${this.label}
        role="listbox"
        ${this._autoUpdateController.refFloating()}
      >
        <slot @select=${this._handleSelect}></slot>
      </div>
      ${
        // Activate auto update only when the dropdown is open.
        // TODO(DDS-1226): refactor here with Popover API + CSS Anchor Positioning instead of using floating-ui
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

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("value")) {
      this._updateFormValue();
      this._reflectItemsAndLabel();
    }
  }

  reflectInputGroup(inputGroup: DaikinInputGroup): void {
    this.label = inputGroup.label;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown": DaikinDropdown;
  }
}
