import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaOption = cva(
  [
    "flex",
    "items-center",
    "justify-between",
    "w-full",
    "min-h-12",
    "text-daikinNeutral-900",
    "p-3",
    "font-daikinSerif",
    "leading-5",
    "text-left",
    "border-transparent",
    "border-2",

    "focus-visible:border-daikinBlue-700",
    "focus-visible:outline-none",

    "disabled:text-daikinNeutral-200",
  ],
  {
    variants: {
      selected: {
        false: [
          "bg-white",
          "enabled:hover:bg-daikinNeutral-100",
          "enabled:active:bg-daikinNeutral-200",
        ],
        true: [
          "bg-daikinBlue-50",
          "after:i-daikin-dropdown-check",
          "after:size-5",
          "enabled:after:text-daikinNeutral-900",
          "enabled:active:bg-daikinBlue-100",
          "disabled:after:text-daikinNeutral-200",
        ],
      },
    },
  }
);

/**
 * The dropdown item (option) component that can be used within `daikin-dropdown` component.
 *
 * Hierarchy:
 * - `daikin-dropdown` > `daikin-dropdown-item`
 *
 * @fires select - A custom event emitted when a user clicks the item. For internal use (`daikin-dropdown`).
 *
 * @slot - A slot for the item content.
 *
 * @example
 *
 * ```html
 * <daikin-dropdown-item value="value">Dropdown item</daikin-dropdown-item>
 * ```
 */
@customElement("daikin-dropdown-item")
export class DaikinDropdownItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * Form value of the dropdown item.
   */
  @property({ type: String })
  value = "";

  /**
   * Whether the dropdown item is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the dropdown item is selected.
   * Set automatically by `daikin-dropdown` component.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  @query("button")
  private _button!: HTMLButtonElement | null;

  private _handleClick(): void {
    if (this.disabled) {
      return;
    }

    this.dispatchEvent(
      new Event("select", {
        bubbles: true,
      })
    );
  }

  override render() {
    return html`<button
      type="button"
      class=${cvaOption({ selected: this.selected })}
      data-value=${this.value}
      role="option"
      aria-selected=${this.selected}
      tabindex="-1"
      ?disabled=${this.disabled}
      @click=${this._handleClick}
    >
      <slot></slot>
    </button>`;
  }

  override focus(options?: FocusOptions): void {
    this._button?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown-item": DaikinDropdownItem;
  }
}
