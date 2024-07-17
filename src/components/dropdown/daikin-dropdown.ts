import { computePosition, flip, offset } from "@floating-ui/dom";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { createRef, ref, type Ref } from "lit/directives/ref.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import type { DaikinDropdownItem } from "../dropdown-item";
import "../icon/daikin-icon";
import type { IconType } from "../icon/daikin-icon";

type DropdownItemClickEvent = Event & {
  detail: { text: string; value: string };
};

const cvaContainer = cva(["flex", "gap-2", "w-max", "relative"], {
  variants: {
    labelPosition: {
      top: ["flex-col", "gap-2"],
      left: ["items-center", "gap-3"],
    },
  },
});

const cvaButton = cva(
  [
    "flex",
    "items-center",
    "gap-2",
    "w-[218px]",
    "bg-white",
    "border",
    "border-[#8c8c8c]",
    "rounded-md",
    "overflow-hidden",
    "font-daikinSerif",
    "text-left",

    "hover:bg-[#ebebeb]",

    "relative",
    "after:i-daikin-dropdown-chevron-down",
    "after:w-3",
    "after:h-3",
    "after:absolute",
    "after:m-auto",
    "after:top-0",
    "after:bottom-0",
    "after:right-[12px]",
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
    },
  }
);

const cvaContent = cva(
  [
    "w-max",
    "border",
    "border-[#8c8c8c]",
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
 * Primary UI component for user interaction
 */
@customElement("daikin-dropdown")
export class DaikinDropdown extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: max-content;
    }

    ::slotted(daikin-dropdown-item:not(:last-child)) {
      border-bottom: 1px solid #8c8c8c;
    }
  `;

  buttonRef: Ref<HTMLElement> = createRef();

  contentsRef: Ref<HTMLElement> = createRef();

  /**
   * Label text
   */
  @property({ type: String })
  label?: string;

  /**
   * Specify the size of the dropdown
   */
  @property({ type: String })
  size: DropdownVariantProps["size"] = "medium";

  /**
   * Where the label is located in terms of the dropdown
   */
  @property({ type: String, reflect: true, attribute: "label-position" })
  labelPosition: DropdownVariantProps["labelPosition"] = "top";

  /**
   * Icon to the left of the currently selected content. See `daikin-icon` component for available icons.
   */
  @property({ type: String, reflect: true, attribute: "left-icon" })
  leftIcon?: IconType;

  /**
   * Whether or not a drop-down menu is displayed
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Specify the value of the `aria-label` to be assigned to the dropdown
   */
  @property({ type: String, attribute: "aria-label" })
  override ariaLabel = "";

  @state()
  _buttonLabel = "";

  @state()
  _value = "";

  @queryAssignedElements({ selector: "daikin-dropdown-item" })
  _items!: DaikinDropdownItem[];

  private _handleClick() {
    this.open = !this.open;
  }

  private _optionPosition() {
    const button = this.buttonRef.value;
    const contents = this.contentsRef.value;
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
   * Call the event registered in "change"
   */
  private _handleClickChange(e: DropdownItemClickEvent) {
    this._buttonLabel = e.detail.text;
    this._value = e.detail.value;

    const event = new CustomEvent("change", {
      detail: {
        value: this._value,
      },
    });
    this.open = false;

    this.dispatchEvent(event);
  }

  override render() {
    return html`<div
      class=${cvaContainer({ labelPosition: this.labelPosition })}
    >
      ${this.label
        ? html`<div class="text-sm font-medium">${this.label}</div>`
        : null}
      <div>
        <button
          type="button"
          class=${cvaButton({ size: this.size })}
          @click=${this._handleClick}
          ${ref(this.buttonRef)}
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
          class=${cvaContent({ state: this.open ? "visible" : "hidden" })}
          ${ref(this.contentsRef)}
        >
          <slot
            @dropdownItemClick=${(e: DropdownItemClickEvent) =>
              this._handleClickChange(e)}
          ></slot>
        </div>
      </div>
    </div>`;
  }

  protected override firstUpdated(): void {
    this._optionPosition();

    if (!this._items[0].textContent || !this._items[0].value) {
      return;
    }
    this._buttonLabel = this._items[0].textContent;
    this._value = this._items[0].value;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown": DaikinDropdown;
  }
}
