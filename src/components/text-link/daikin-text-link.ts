import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";

const cvaTextLink = cva(
  [
    "flex",
    "justify-center",
    "items-center",
    "gap-0.5",
    "w-fit",
    "h-fit",
    "text-[--color-primary]",
    "font-daikinSerif",
    "rounded-[1px]",
    "relative",

    "focus-visible:outline-none",

    "focus-visible:before:block",
    "focus-visible:before:w-[calc(100%+2px)]",
    "focus-visible:before:h-[calc(100%+2px)]",
    "focus-visible:before:rounded-[1px]",
    "focus-visible:before:absolute",
    "focus-visible:before:outline",
    "focus-visible:before:outline-system-state-focus",
    "focus-visible:before:outline-2",

    "link-disabled:var-color-system-state-disabled/color-primary",
  ],
  {
    variants: {
      hasVisited: {
        false: [
          "link-enabled:var-color-system-state-primary-active/color-primary",
          "link-enabled:hover:var-color-system-state-primary-hover/color-primary",
          "link-enabled:active:var-color-system-state-primary-press/color-primary",
        ],
        true: [
          "link-enabled:var-color-system-state-visited-active/color-primary",
          "link-enabled:hover:var-color-system-state-visited-hover/color-primary",
          "link-enabled:active:var-color-system-state-visited-press/color-primary",
        ],
      },
    },
  }
);

/**
 * The button component is a versatile UI element that triggers actions or submits forms when clicked.
 * It functions similarly to the HTML `<button>` tag, allowing users to initiate various operations such as submitting data, opening dialogs, or navigating to different sections of an application.
 *
 * @slot - A slot for the button content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/text-link/index.js";
 * ```
 *
 * ```html
 * <daikin-text-link href="#">
 *   Link label
 * </daikin-text-link>
 * ```
 */
@customElement("daikin-text-link")
export class DaikinTextLink extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: fit-content;
      height: fit-content;
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
  @property({ type: Boolean, reflect: true })
  hasVisited = false;

  override render() {
    return html`
      <a
        class=${cvaTextLink({ hasVisited: this.hasVisited })}
        href=${ifDefined(this.disabled ? undefined : (this.href ?? undefined))}
        aria-disabled=${ifDefined(this.disabled ? "true" : undefined)}
      >
        <slot name="left-icon"></slot>
        <span
          class="relative after:h-[1px] after:bg-[--color-primary] after:absolute after:inset-[auto_0_0_0]"
        >
          <slot></slot>
        </span>
        <slot name="right-icon"></slot>
      </a>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-text-link": DaikinTextLink;
  }
}
