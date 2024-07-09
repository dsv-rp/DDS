import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import tailwindStyles from "../../tailwind.css?inline";

export interface DaikinBreadcrumbItemProps {
  href: string;
}

@customElement("daikin-breadcrumb-item")
export class DaikinBreadcrumbItem extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
    }
  `;

  @property({ type: String, reflect: true })
  href = "";

  @property({ type: String, reflect: true })
  size = "";

  override render() {
    return html`<span class=""><slot></slot></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb-item": DaikinBreadcrumbItem;
  }
}
