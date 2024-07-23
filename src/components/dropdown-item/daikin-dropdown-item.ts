import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

/**
 * Use as a direct child element of daikin-dropdown
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
      class="w-[216px] minH-[42px] bg-white py-2.5 px-3 font-daikinSerif text-[15px] leading-[22px] text-left hover:bg-[#ebebeb]"
      data-value=${this.value}
      role="option"
      aria-selected="${this.selected}"
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
