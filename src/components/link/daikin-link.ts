import { cva } from "class-variance-authority";
import { css, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";

const LINK_CLASS_NAME = cva([
  "font-daikinSerif",
  "relative",
  "border-b",
  "border-b-current",

  "link-enabled:text-ddt-color-link-text-default",
  "link-enabled:hover:text-ddt-color-link-text-hover",
  "link-enabled:hover:bg-ddt-color-common-surface-brand-hover",
  "link-enabled:active:text-ddt-color-link-text-press",
  "link-enabled:active:bg-ddt-color-common-surface-brand-press",
  "link-disabled:text-ddt-color-common-disabled",

  "focus-visible:outline",
  "focus-visible:outline-2",
  "focus-visible:outline-ddt-color-common-border-focus",
  "focus-visible:outline-offset-2",
])();

/**
 * The link component uses the standard HTML <a> tag. Unlike the link used in the button component, it provides the style of the text as it is.
 *
 * @slot - A slot for the link content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/link/index.js";
 * ```
 *
 * ```html
 * <daikin-link href="https://www.example.com">
 *   Link label
 * </daikin-link>
 * ```
 */
@ddsElement("daikin-link")
export class DaikinLink extends DDSElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host([show-visited]:not([disabled])) a:visited {
      color: var(--dds-color-link-text-visited-default);
    }

    :host([show-visited]:not([disabled])) a:visited:hover {
      color: var(--dds-color-link-text-visited-hover);
      background-color: var(--dds-color-link-surface-visited-hover);
    }

    :host([show-visited]:not([disabled])) a:visited:active {
      color: var(--dds-color-link-text-visited-press);
      background-color: var(--dds-color-link-surface-visited-press);
    }
  `;

  /**
   * Link `href`.
   */
  @property({ type: String, reflect: true })
  href: string | null = null;

  /**
   * Link `target`.
   */
  @property({ type: String, reflect: true })
  target: string | null = null;

  /**
   * Whether or not disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether or not to change the color of visited links.
   */
  @property({ type: Boolean, reflect: true, attribute: "show-visited" })
  showVisited = false;

  override render() {
    return html`<a
      class=${LINK_CLASS_NAME}
      href=${ifDefined(this.disabled ? undefined : (this.href ?? undefined))}
      target=${ifDefined(this.target ?? undefined)}
      aria-disabled=${ifDefined(this.disabled ? "true" : undefined)}
      ><span class="inline-flex mr-[0.125rem] align-sub">
        <slot name="left-icon" class="icon-size-4"
          ><span class="-mr-[0.125rem]"></span></slot></span
      ><slot></slot
      ><span class="inline-flex ml-[0.125rem] align-sub"
        ><slot name="right-icon" class="icon-size-4"
          ><span class="-ml-[0.125rem]"></span></slot></span
    ></a>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-link": DaikinLink;
  }
}
