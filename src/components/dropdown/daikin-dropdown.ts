import { autoUpdate, computePosition, flip, offset } from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import { isClient } from "../../is-client";
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
      type: {
        placeholder: ["text-daikinNeutral-700"],
        value: ["text-daikinNeutral-900"],
      },
    },
  }
);

const cvaContent = cva(
  [
    "w-full",
    "overflow-hidden",
    "absolute",
    "top-0",
    "left-0",
    "opacity-1",
    "transition-[opacity]",
    "rounded-[4px]",
    "shadow-dropdown",
  ],
  {
    variants: {
      state: {
        visible: [],
        hidden: ["opacity-0", "pointer-events-none"],
      },
    },
  }
);

/**
 * A dropdown list component.
 *
 * @fires change - When an item in the drop-down list is selected, it returns the value of the selected item.
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
   * Whether the dropdown is error
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Whether or not a drop-down menu is displayed
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  @state()
  private _buttonLabel = "";

  @state()
  private _buttonLabelType: "value" | "placeholder" = "placeholder";

  @queryAssignedElements({ selector: "daikin-dropdown-item" })
  private _items!: DaikinDropdownItem[];

  private _buttonRef = createRef<HTMLElement>();

  private _contentsRef = createRef<HTMLElement>();

  private _autoUpdateCleanup: (() => void) | null = null;

  private _startAutoUpdate() {
    if (!isClient) {
      return;
    }

    const button = this._buttonRef.value;
    const contents = this._contentsRef.value;
    if (!button || !contents) {
      return;
    }

    // TODO(DDS-1226): refactor here with Popover API + CSS Anchor Positioning instead of using floating-ui
    this._autoUpdateCleanup?.();
    this._autoUpdateCleanup = autoUpdate(button, contents, () => {
      computePosition(button, contents, {
        placement: "bottom",
        middleware: [
          flip({ fallbackStrategy: "initialPlacement" }),
          offset({ mainAxis: -1 }),
        ],
      })
        .then(({ x, y }) => {
          Object.assign(contents.style, {
            left: `${x}px`,
            top: `${y}px`,
          });
        })
        .catch((e: unknown) => console.error(e));
    });
  }

  private _uninstallAutoUpdate() {
    this.open = false;
    this._autoUpdateCleanup?.();
    this._autoUpdateCleanup = null;
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
  private _handleSelect(e: SelectEvent) {
    this.value = e.detail.value;

    const item = this._items.find((item) => item.value === this.value);
    if (item) {
      this._buttonLabel = item.textContent ?? "";
    }

    const event = new CustomEvent("change", {
      detail: {
        value: this.value,
      },
    });
    this.open = false;

    this.dispatchEvent(event);
  }

  override disconnectedCallback(): void {
    this._uninstallAutoUpdate();
  }

  override render() {
    return html`<div class="flex flex-col gap-2 w-full relative">
      <div class="font-bold">${this.label}</div>
      <div
        class="w-full relative"
        aria-disabled=${this.disabled}
        @keydown=${this._handleKeyDown}
      >
        <button
          type="button"
          class=${cvaButton({
            error: this.error,
            type: this._buttonLabelType,
          })}
          aria-expanded=${this.open && !this.disabled}
          ?disabled=${this.disabled}
          @click=${this._handleClick}
          ${ref(this._buttonRef)}
        >
          ${this._buttonLabel}
        </button>
        <div
          class=${cvaContent({
            state: this.open && !this.disabled ? "visible" : "hidden",
          })}
          role="listbox"
          aria-label=${this.label}
          ${ref(this._contentsRef)}
        >
          <slot @select=${this._handleSelect}></slot>
        </div>
      </div>
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

    if (changedProperties.has("value")) {
      const items = this._items;

      const itemIndex: number | undefined = items.findIndex(
        ({ value }) => this.value === value
      );

      if (itemIndex > -1) {
        for (const item of items) {
          item.selected = false;
        }
        this._buttonLabel = items[itemIndex].textContent ?? "";
        this._buttonLabelType = "value";
        items[itemIndex].selected = true;
      } else {
        this._buttonLabel = this.placeholder;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown": DaikinDropdown;
  }
}
