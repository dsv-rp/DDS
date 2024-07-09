import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css?inline";

const cvaLink = cva([], {
  variants: {
    size: {
      max: [],
      min: [],
    },
  },
});

@customElement("daikin-breadcrumb-item")
export class DaikinBreadcrumbItem extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-flex;
      align-items: center;
    }
  `;

  @property({ type: String, reflect: true })
  href = "";

  @property({ type: String, reflect: true })
  size = "max";

  @property({ type: Boolean, reflect: true, attribute: "no-trailing-slash" })
  noTrailingSlash = false;

  override render() {
    const slash = !this.noTrailingSlash
      ? html`<span class="">/</span>`
      : html``;

    const linkText = this.size === "max" ? html`<slot></slot>` : html`...`;
    return html`<div
      class="gap-2 inline-flex justify-center h-8 items-center flex-shrink-0 font-normal not-italic leading-8 text-sm "
    >
      <a href="${this.href}"
        ><span class="text-daikinBlue-500">${linkText}</span></a
      >${slash}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb-item": DaikinBreadcrumbItem;
  }
}
