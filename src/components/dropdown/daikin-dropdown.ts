import { flip, offset, type ComputePositionConfig } from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import { ClickOutsideController } from "../../controllers/click-outside";
import { FloatingUIAutoUpdateController } from "../../controllers/floating-ui-auto-update";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinDropdownItem } from "../dropdown-item";
import "../icon/daikin-icon";

type SelectEvent = Event & {
  detail: { value: string };
};

const cvaButton = cva(
  [
    "flex",
    "items-center",
    "gap-2",
    "w-full",
    "min-h-12",
    "bg-white",
    "px-3",
    "border",
    "rounded-md",
    "overflow-hidden",
    "font-daikinSerif",
    "text-left",
    "leading-5",
    "relative",

    "enabled:hover:outline",
    "enabled:hover:-outline-offset-2",
    "enabled:hover:outline-daikinNeutral-300",
    "enabled:hover:outline-2",
    "enabled:active:outline",
    "enabled:active:-outline-offset-2",
    "enabled:active:outline-daikinNeutral-300",
    "enabled:active:outline-2",
    "enabled:focus-visible:outline",
    "enabled:focus-visible:-outline-offset-2",
    "enabled:focus-visible:outline-daikinBlue-700",
    "enabled:focus-visible:outline-2",

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
      error: {
        false: ["border-daikinNeutral-600"],
        true: ["border-daikinRed-500"],
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
        false: ["opacity-0", "pointer-events-none"],
        true: [],
      },
    },
  }
);

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
      width: 360px;
    }

    ::slotted {
      width: 100%;
    }
  `;

  private static readonly _floatingPositionOptions: Partial<ComputePositionConfig> =
    {
      placement: "bottom",
      middleware: [
        flip({ fallbackStrategy: "initialPlacement" }),
        offset({ mainAxis: -1 }),
      ],
    };

  /**
   * Label text
   */
  @property({ type: String })
  label = "";

  /**
   * Dropdown value
   */
  @property({ type: String })
  value?: string;

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = "";

  /**
   * Whether the dropdown is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the dropdown is required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the dropdown is error
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Whether or not a drop-down menu is displayed
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  @queryAssignedElements({ selector: "daikin-dropdown-item" })
  private _items!: DaikinDropdownItem[];

  private _hasSelectedItem = false;

  private _selectedItemLabel = "";

  private _autoUpdateController = new FloatingUIAutoUpdateController(this);

  private _clickOutsideController = new ClickOutsideController(
    this,
    this._onClickOutside
  );

  private _onClickOutside(): void {
    this.open = false;
  }

  private _reflectItemsAndLabel() {
    const items = this._items;

    const selectedItem = items.find(({ value }) => this.value === value);
    for (const item of items) {
      item.selected = item === selectedItem;
    }

    this._hasSelectedItem = !!selectedItem;
    this._selectedItemLabel = selectedItem?.textContent ?? "";
  }

  private _handleClick() {
    this.open = !this.open;
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    const moveOffset = {
      ArrowDown: 1,
      ArrowUp: -1,
    }[event.key];
    if (!moveOffset) {
      return;
    }

    const items = this._items;

    // Get focused item if any
    const activeElement = document.activeElement;

    const focusedItemIndex = activeElement
      ? items.findIndex((item) => item.contains(activeElement))
      : -1;

    // If there is no item focused, focus on first item
    if (focusedItemIndex < 0) {
      this._items[0].focus();
      event.preventDefault();
      return;
    }

    // If there is a item focused, move focus forward or backward
    for (let i = 1; i <= items.length; i++) {
      const index =
        (focusedItemIndex + moveOffset * i + items.length * i) % items.length;
      const candidate = items[index];

      candidate.focus();
      event.preventDefault();
      return;
    }
  }

  /**
   * Handle `select` event from `daikin-dropdown-item`.
   */
  private _handleSelect(event: SelectEvent) {
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
          DaikinDropdown._floatingPositionOptions,
          this.open && !this.disabled
        )
      }
      ${
        // Listen to click outside only when the dropdown is open.
        this._clickOutsideController.directive(this.open && !this.disabled)
      }
    </div>`;
  }

  protected override firstUpdated(): void {
    this._reflectItemsAndLabel();
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("value")) {
      this._reflectItemsAndLabel();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown": DaikinDropdown;
  }
}
