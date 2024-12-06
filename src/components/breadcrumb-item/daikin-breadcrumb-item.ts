import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../link/daikin-link";

/**
 * The `daikin-breadcrumb-item` is a component used to represent each item of the breadcrumb list, and is used as a child element of the `daikin-breadcrumb` component.
 *
 * Hierarchy:
 * - `daikin-breadcrumb` > `daikin-breadcrumb-item`
 *
 * @slot - A slot for the breadcrumb item content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/breadcrumb-item/index.js";
 * ```
 *
 * ```html
 * <!-- See `daikin-breadcrumb` component for complete example. -->
 * <daikin-breadcrumb-item href="https://www.example.com">
 *   Breadcrumb item
 * </daikin-breadcrumb-item>
 * ```
 */
@customElement("daikin-breadcrumb-item")
export class DaikinBreadcrumbItem extends LitElement {
  static override styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host::after {
      content: "/";
      color: #414141; /* system-element-text-primary */
      margin: 0 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      display: var(--breadcrumb-separator-display, none);
    }
  `;

  /**
   * Specify link href.
   */
  @property({ type: String, reflect: true })
  href: string | null = null;

  /**
   * Specifies the display content.
   * If `ellipsis`, the "..." will be displayed instead of the link.
   * Set automatically by `daikin-breadcrumb`.
   */
  @property({ type: String, reflect: true })
  variant: "normal" | "current" = "normal";

  /**
   * Specify whether the link should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify the link target.
   */
  @property({ type: String, reflect: true })
  target: string | null = null;

  /**
   * Whether or not to change the color of visited links.
   * Set automatically by `daikin-breadcrumb`.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-visited" })
  showVisited = false;

  override render() {
    const disabled = this.disabled || this.variant === "current";

    return this.variant === "normal"
      ? html`<daikin-link
          class="text-sm"
          href=${ifDefined(this.href ?? undefined)}
          ?disabled=${disabled}
          ?show-visited=${this.showVisited}
          ><slot></slot
        ></daikin-link>`
      : html`<span
          class="text-sm font-daikinSerif text-system-element-text-primary"
          aria-current="true"
          ><slot></slot
        ></span>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb-item": DaikinBreadcrumbItem;
  }
}
