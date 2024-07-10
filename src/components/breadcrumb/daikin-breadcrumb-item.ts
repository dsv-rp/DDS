import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaLink = cva(
  [
    "gap-2",
    "inline-flex",
    "justify-center",
    "h-8",
    "items-center",
    "flex-shrink-0",
    "font-normal",
    "not-italic",
    "leading-8",
    "text-sm",
    "text-daikinBlue-500",
    "outline-none",
    "font-daikinSerif",
    "after:content-['/']",
    "after:text-daikinNeutral-800",
  ],
  {
    variants: {
      size: {
        max: [
          "hover:text-daikinBlue-300",
          "active:text-daikinNeutral-800",
          "focus-visible:text-daikinBlue-700",
        ],
        min: ["hover:text-daikinBlue-300"],
      },
    },
  }
);

type LinkVariantProps = MergeVariantProps<typeof cvaLink>;

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
  size: LinkVariantProps["size"] = "max";

  override render() {
    const linkClassName = cvaLink({
      size: this.size,
    });
    const linkText = this.size === "max" ? html`<slot></slot>` : html`…`;
    return html`
      <a href="${this.href}" class="${linkClassName}">${linkText}</a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb-item": DaikinBreadcrumbItem;
  }
}
