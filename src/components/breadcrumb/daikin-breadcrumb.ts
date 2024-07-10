import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import tailwindStyles from "../../tailwind.css?inline";

@customElement("daikin-breadcrumb")
export class DaikinBreadcrumb extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: flex;
      align-items: center;
    }
  `;

  get _slottedLink() {
    let link = null;
    const slots = this.shadowRoot
      ?.querySelector("slot")
      ?.assignedElements({ flatten: true });
    slots?.forEach((slot, index, array) => {
      if (index === array.length - 1 && this.noTrailingSlash) {
        link = slot.shadowRoot?.querySelector("a");
      }
    });
    return link;
  }

  @property({ type: Boolean, reflect: true, attribute: "no-trailing-slash" })
  noTrailingSlash = false;

  handleChange() {
    const link = this._slottedLink as HTMLLinkElement | null;
    if (link) {
      link.classList.add("after:content-none");
    }
  }

  override render() {
    return html`
      <ol class="flex gap-2">
        <slot @slotchange=${this.handleChange}></slot>
      </ol>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb": DaikinBreadcrumb;
  }
}
