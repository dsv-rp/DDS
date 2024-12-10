import { css, html, LitElement, nothing, unsafeCSS } from "lit";
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

  /**
   * _Internal use._
   * Whether or not to display the divider on the right.
   * Set automatically by `daikin-breadcrumb`.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true, attribute: "append-divider" })
  appendDivider = false;

  override render() {
    // To prevent unnecessary whitespace from being included, we use formatting that does not include whitespace between tags.
    const link =
      this.variant === "normal"
        ? html`<daikin-link
            class="text-sm"
            href=${ifDefined(this.href ?? undefined)}
            ?show-visited=${this.showVisited}
            ><slot></slot
          ></daikin-link>`
        : html`<a
            class="text-sm font-daikinSerif text-system-element-text-primary"
            aria-disabled="true"
            aria-current="true"
            role="link"
            ><slot></slot
          ></a>`;

    const divider = this.appendDivider
      ? html`<span
          class="text-system-element-text-primary mx-2 text-sm"
          aria-hidden="true"
          >/</span
        >`
      : nothing;

    return html`<div class="inline" role="listitem">${link}${divider}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-breadcrumb-item": DaikinBreadcrumbItem;
  }
}
