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
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import type { DaikinDropdownItem } from "../dropdown-item";
import "../icon/daikin-icon";
import type { IconType } from "../icon/daikin-icon";

type SelectEvent = Event & {
  detail: { value: string };
};

const cvaContainer = cva(["flex", "gap-2", "w-full", "relative"], {
  variants: {
    labelPosition: {
      top: ["flex-col", "gap-2"],
      left: ["items-center", "gap-3"],
      hidden: [],
    },
  },
});

const cvaLabel = cva(["flex-none", "text-sm", "font-medium"], {
  variants: {
    labelPosition: {
      top: [],
      left: [],
      hidden: ["hidden"],
    },
    disabled: {
      enabled: [],
      disabled: ["text-[#DCDCDC]"],
    },
  },
});

const cvaButton = cva(
  [
    "flex",
    "items-center",
    "gap-2",
    "w-full",
    "bg-white",
    "border",
    "rounded-md",
    "overflow-hidden",
    "font-daikinSerif",
    "text-left",

    "relative",
    "after:i-daikin-dropdown-chevron-down",
    "after:w-3",
    "after:h-3",
    "after:absolute",
    "after:m-auto",
    "after:top-0",
    "after:bottom-0",
    "after:right-3",
  ],
  {
    variants: {
      size: {
        small: ["min-h-8", "py-1", "px-2", "text-[13px]", "leading-5"],
        medium: [
          "min-h-[42px]",
          "py-2.5",
          "px-3",
          "text-[15px]",
          "leading-[22px]",
        ],
      },
      disabled: {
        enabled: ["border-[#8C8C8C]", "after:text-black", "hover:bg-[#ebebeb]"],
        disabled: [
          "text-[#DCDCDC]",
          "border-[#DCDCDC]",
          "after:text-[#DCDCDC]",
        ],
      },
    },
  }
);

const cvaContent = cva(
  [
    "w-full",
    "border",
    "border-[#8C8C8C]",
    "rounded-md",
    "overflow-hidden",
    "absolute",
    "top-0",
    "left-0",
    "opacity-1",
    "transition-[opacity]",
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

type DropdownVariantProps = MergeVariantProps<
  typeof cvaContainer | typeof cvaButton
>;

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
      width: 100%;
    }

    ::slotted {
      width: 100%;
    }

    ::slotted(daikin-dropdown-item:not(:last-child)) {
      border-bottom: 1px solid #8c8c8c;
    }
  `;

  /**
   * Label text
   */
  @property({ type: String })
  label: string = "";

  /**
   * Specify the size of the dropdown
   */
  @property({ type: String })
  size: DropdownVariantProps["size"] = "medium";

  /**
   * Dropdown value
   */
  @property({ type: String })
  value = "";

  /**
   * Where the label is located in terms of the dropdown
   */
  @property({ type: String, attribute: "label-position" })
  labelPosition: DropdownVariantProps["labelPosition"] = "top";

  /**
   * Icon to the left of the currently selected content. See `daikin-icon` component for available icons.
   */
  @property({ type: String, attribute: "left-icon" })
  leftIcon: IconType | null = null;

  /**
   * Whether the dropdown is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether or not a drop-down menu is displayed
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  @state()
  _buttonLabel = "";

  @queryAssignedElements({ selector: "daikin-dropdown-item" })
  _items!: DaikinDropdownItem[];

  private _buttonRef = createRef<HTMLElement>();

  private _contentsRef = createRef<HTMLElement>();

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

  private _locateOptions() {
    const button = this._buttonRef.value;
    const contents = this._contentsRef.value;
    if (!button || !contents) {
      return;
    }

    computePosition(button, contents, {
      placement: "bottom",
      middleware: [flip({ fallbackStrategy: "initialPlacement" }), offset(10)],
    })
      .then(({ x, y }) => {
        Object.assign(contents.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      })
      .catch((e: unknown) => console.error(e));
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

  private _cleanup() {
    const button = this._buttonRef.value;
    const contents = this._contentsRef.value;
    if (!button || !contents) {
      return;
    }

    autoUpdate(button, contents, this._locateOptions);
  }

  override disconnectedCallback(): void {
    this._cleanup();
  }

  override render() {
    return html`<div
      class=${cvaContainer({ labelPosition: this.labelPosition })}
    >
      <div
        class="${cvaLabel({
          labelPosition: this.labelPosition,
          disabled: this.disabled ? "disabled" : "enabled",
        })}"
      >
        ${this.label}
      </div>
      <div
        class="w-full relative"
        aria-disabled=${this.disabled}
        @keydown=${this._handleKeyDown}
      >
        <button
          type="button"
          class=${cvaButton({
            size: this.size,
            disabled: this.disabled ? "disabled" : "enabled",
          })}
          aria-expanded=${this.open && !this.disabled}
          ?disabled=${this.disabled}
          @click=${this._handleClick}
          ${ref(this._buttonRef)}
        >
          ${this.leftIcon
            ? html`<daikin-icon
                icon=${this.leftIcon}
                color="current"
                size="m"
              ></daikin-icon>`
            : null}
          <span>${this._buttonLabel}</span>
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

  protected override firstUpdated(): void {
    this._locateOptions();
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("value")) {
      const defaultItemIndex = this._items.findIndex(
        ({ value }) => this.value === value
      );

      if (defaultItemIndex >= 0) {
        this._buttonLabel = this._items[defaultItemIndex].textContent ?? "";
        this._items[defaultItemIndex].selected = true;
      } else {
        this.value = this._items[0].value;
        this._buttonLabel = this._items[0].textContent ?? "";
        this._items[0].selected = true;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown": DaikinDropdown;
  }
}
