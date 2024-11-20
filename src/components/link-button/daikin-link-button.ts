import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaLinkButton = cva(
  [
    "flex",
    "justify-center",
    "items-center",
    "gap-0.5",
    "w-fit",
    "h-fit",
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
  ],
  {
    variants: {
      disabled: {
        false: [
          "text-system-state-primary-active",
          "hover:text-system-state-primary-hover",
          "active:text-system-state-primary-press",
          "[&>span::after]:bg-system-state-primary-active",
          "[&:hover>span::after]:bg-system-state-primary-hover",
          "[&:active>span::after]:bg-system-state-primary-press",
        ],
        true: [
          "text-system-state-disabled",
          "[&>span::after]:bg-system-state-disabled",
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
 * import "@daikin-oss/design-system-web-components/components/link-button/index.js";
 * ```
 *
 * ```html
 * <daikin-link-button href="#">
 *   Link label
 * </daikin-link-button>
 * ```
 */
@customElement("daikin-link-button")
export class DaikinLinkButton extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: fit-content;
      height: fit-content;
    }

    :host([hasVisited]):host(:not([disabled])) a:visited {
      color: #9b5ea3; /* system-state-visited-active */
    }

    :host([hasVisited]):host(:not([disabled])) a:hover:visited {
      color: #8e4898; /* system-state-visited-hover */
    }

    :host([hasVisited]):host(:not([disabled])) a:active:visited {
      color: #81318e; /* system-state-visited-press */
    }

    :host([hasVisited]):host(:not([disabled])) a:visited > span::after {
      background-color: #9b5ea3; /* system-state-visited-active */
    }

    :host([hasVisited]):host(:not([disabled])) a:hover:visited > span::after {
      background-color: #8e4898; /* system-state-visited-hover */
    }

    :host([hasVisited]):host(:not([disabled])) a:active:visited > span::after {
      background-color: #81318e; /* system-state-visited-press */
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
        class=${cvaLinkButton({ disabled: this.disabled })}
        href=${ifDefined(this.disabled ? undefined : (this.href ?? undefined))}
        aria-disabled=${ifDefined(this.disabled ? "true" : undefined)}
      >
        <slot name="left-icon"></slot>
        <span
          class="relative after:h-[1px] after:absolute after:inset-[auto_0_0_0]"
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
    "daikin-link-button": DaikinLinkButton;
  }
}
