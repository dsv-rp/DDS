import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { cva } from "class-variance-authority";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaLink = cva(
  [
    "h-8",
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
      variant: {
        normal: [
          "hover:text-daikinBlue-300",
          "active:text-daikinNeutral-800",
          "focus-visible:text-daikinBlue-700",
        ],
        ellipsis: ["hover:text-daikinBlue-300"],
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
      gap: 8px;
      flex-shrink: 0;
    }

    :host([hidden]) {
      display: none;
    }
  `;

  /**
   * Specify link href
   */
  @property({ type: String, reflect: true })
  href? = "";

  /**
   * Specify link variant
   */
  @property({ type: String, reflect: true })
  variant: LinkVariantProps["variant"] = "normal";

  /**
   * Specify whether the link should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify the link target
   */
  @property({ type: String, reflect: true })
  target: "_blank" | "_self" | "_parent" | "_top" | "framename" = "_self";

  /**
   * Specify the link should show slash at the end or not
   */
  @property({ type: Boolean, reflect: true, attribute: "trailing-slash" })
  trailingSlash = false;

  /**
   * Specify the link should be hidden when ellipsis mode
   */
  @property({ type: Boolean, reflect: true })
  override hidden = false;

  override render() {
    const linkClassName = cvaLink({
      variant: this.variant,
      disabled: this.disabled,
    });
    const slash = this.trailingSlash
      ? html`<span class="text-daikinNeutral-800 font-daikinSerif">/</span>`
      : html``;
    const linkText =
      this.variant === "normal"
        ? html`<slot></slot>`
        : html`<span>. . .</span>`;
    return html`
      <slot name="link"
        ><a
          href="${ifDefined(this.href)}"
          class="${linkClassName}"
          target="${this.target}"
          >${linkText}</a
        >${slash}</slot
      >
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb-item": DaikinBreadcrumbItem;
  }
}
