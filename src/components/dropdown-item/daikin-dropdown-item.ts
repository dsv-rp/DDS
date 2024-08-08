import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaOption = cva(
  [
    "w-full",
    "minH-[42px]",
    "bg-white",
    "py-2.5",
    "px-3",
    "font-daikinSerif",
    "text-[15px]",
    "leading-[22px]",
    "text-left",
  ],
  {
    variants: {
      labelPosition: {
        top: [],
        left: [],
        hidden: ["hidden"],
      },
      disabled: {
        enabled: ["hover:bg-[#ebebeb]"],
        disabled: ["text-[#DCDCDC]"],
      },
    },
  }
);

/**
 * The dropdown item component that can be used within `daikin-dropdown` component.
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
   * Dropdown item value text
   */
  @property({ type: String })
  value = "";

  /**
   * Whether the dropdown item is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  private _handleClick() {
    const event = new CustomEvent("select", {
      bubbles: true,
      detail: {
        value: this.value,
      },
    });

    this.dispatchEvent(event);
  }
  override render() {
    return html`<button
      type="button"
      class=${cvaOption({ disabled: this.disabled ? "disabled" : "enabled" })}
      data-value=${this.value}
      role="option"
      aria-selected=${this.selected}
      ?disabled=${this.disabled}
      @click=${this._handleClick}
    >
      <slot></slot>
    </button>`;
  }

  override focus(options?: FocusOptions | undefined): void {
    this.shadowRoot?.querySelector("button")?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown-item": DaikinDropdownItem;
  }
}
