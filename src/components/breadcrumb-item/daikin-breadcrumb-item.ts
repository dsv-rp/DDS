import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import { ifDefined } from "lit/directives/if-defined.js";
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
  ],
  {
    variants: {
      size: {
        max: [
          "after:content-['/']",
          "after:text-daikinNeutral-800",
          "hover:text-daikinBlue-300",
          "active:text-daikinNeutral-800",
          "focus-visible:text-daikinBlue-700",
        ],
        min: ["hover:text-daikinBlue-300"],
      },
      disabled: {
        true: [
          "text-daikinNeutral-800",
          "pointer-events-none",
          "cursor-default",
          "focus-visible:text-daikinNeutral-800",
        ],
        false: [],
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

    :host([hidden]) {
      display: none;
    }
  `;

  @property({ type: String, reflect: true })
  href? = "";

  @property({ type: String, reflect: true })
  size: LinkVariantProps["size"] = "max";

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  target: "_blank" | "_self" | "_parent" | "_top" | "framename" = "_self";

  @property({ type: Boolean, reflect: true })
  override hidden = false;

  override render() {
    const linkClassName = cvaLink({
      size: this.size,
      disabled: this.disabled,
    });
    const linkText =
      this.size === "max"
        ? html`<slot></slot>`
        : html`<span>. . .</span><span class="text-daikinNeutral-800">/</span>`;
    return html`
      <a
        href="${ifDefined(this.href)}"
        class="${linkClassName}"
        target="${this.target}"
        >${linkText}</a
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb-item": DaikinBreadcrumbItem;
  }
}
