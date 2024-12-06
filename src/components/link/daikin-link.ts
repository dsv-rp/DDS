import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";

const LINK_CLASS_NAME = cva([
  "flex",
  "justify-center",
  "items-center",
  "gap-0.5",
  "size-fit",
  "font-daikinSerif",
  "rounded-[1px]",
  "relative",

  "link-enabled:text-ddt-color-link-text-default",
  "link-enabled:hover:text-ddt-color-link-text-hover",
  "link-enabled:hover:bg-ddt-color-common-surface-brand-hover",
  "link-enabled:active:text-ddt-color-link-text-press",
  "link-enabled:active:bg-ddt-color-common-surface-brand-press",
  "link-disabled:text-ddt-color-common-disabled",

  "focus-visible:outline-none",
  "focus-visible:before:block",
  "focus-visible:before:rounded-none",
  "focus-visible:before:absolute",
  "focus-visible:before:inset-[-1px]",
  "focus-visible:before:outline",
  "focus-visible:before:outline-ddt-color-common-border-focus",
  "focus-visible:before:outline-2",

  "after:h-[1px]",
  "after:absolute",
  "after:inset-[auto_0_0_0]",
  "after:bg-current",
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
@customElement("daikin-link")
export class DaikinLink extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: fit-content;
      height: fit-content;
    }

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
    return html`
      <a
        class=${LINK_CLASS_NAME}
        href=${ifDefined(this.disabled ? undefined : (this.href ?? undefined))}
        target=${ifDefined(this.target ?? undefined)}
        aria-disabled=${ifDefined(this.disabled ? "true" : undefined)}
      >
        <slot name="left-icon" class="icon-size-4"></slot>
        <slot></slot>
        <slot name="right-icon" class="icon-size-4"></slot>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-link": DaikinLink;
  }
}
