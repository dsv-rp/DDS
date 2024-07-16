import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-dropdown-item")
export class DaikinDropdownItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: max-content;
    }
  `;

  /**
   * Dropdown value text
   */
  @property({ type: String })
  value = "";

  private _handleClick() {
    const event = new CustomEvent("dropdownItemClick", {
      bubbles: true,
      detail: {
        value: this.value,
        text: this.textContent,
      },
    });

    this.dispatchEvent(event);
  }

  override render() {
    return html`<button
      type="button"
      class="w-[216px] minH-[42px] bg-white py-[10px] px-[12px] font-daikinSerif text-[15px] leading-[22px] text-left hover:bg-[#ebebeb]"
      data-value=${this.value}
      @click=${this._handleClick}
    >
      <slot></slot>
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown-item": DaikinDropdownItem;
  }
}
