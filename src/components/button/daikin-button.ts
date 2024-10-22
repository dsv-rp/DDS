import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { ARIARole } from "../../lit-analyzer-types";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import "../icon/daikin-icon";

const cvaButton = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "w-full",
    "h-full",
    "text-sm",
    "font-daikinSerif",
    "font-bold",
    "rounded",
    "px-3",
    "tracking-wide",
    "text-nowrap",

    "focus-visible:outline",
    "focus-visible:outline-1",
    "focus-visible:outline-offset-1",
    "focus-visible:outline-daikinBlue-700",
  ],
  {
    variants: {
      color: {
        default: [
          "link-enabled:var-color-daikinBlue-500/color-primary",
          "link-enabled:hover:var-color-daikinBlue-300/color-primary",
          "link-enabled:active:var-color-daikinBlue-600/color-primary",
          "link-disabled:var-color-daikinNeutral-200/color-primary",
        ],
        danger: [
          "link-enabled:var-color-daikinRed-500/color-primary",
          "link-enabled:hover:var-color-daikinRed-400/color-primary",
          "link-enabled:active:var-color-daikinRed-600/color-primary",
          "link-disabled:var-color-daikinNeutral-200/color-primary",
        ],
      },
      variant: {
        fill: ["text-white", "bg-[--color-primary]"],
        outline: [
          "border",
          "text-[--color-primary]",
          "border-[--color-primary]",
        ],
        ghost: ["text-[--color-primary]"],
      },
    },
  }
);

type ButtonVariantProps = MergeVariantProps<typeof cvaButton>;

/**
 * The button component is a versatile UI element that triggers actions or submits forms when clicked.
 * It functions similarly to the HTML `<button>` tag, allowing users to initiate various operations such as submitting data, opening dialogs, or navigating to different sections of an application.
 *
 * @fires click - A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) emitted from the inner `<button>` element. Suppressed if `disabled` is true,
 *
 * @slot - A slot for the button content.
 * @slot left-icon - A slot for an icon to be placed to the left of the text. Place `daikin-icon` or something similar.
 * @slot right-icon - A slot for an icon to be placed to the right of the text. Place `daikin-icon` or something similar.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/button/index.js";
 * ```
 *
 * ```html
 * <daikin-button>
 *   Button label
 * </daikin-button>
 * ```
 */
@customElement("daikin-button")
export class DaikinButton extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
    }

    :host([size="small"]) {
      height: 32px;
    }

    :host([size="medium"]) {
      height: 44px;
    }
  `;

  /**
   * Variant of the button.
   */
  @property({ type: String, reflect: true })
  variant: ButtonVariantProps["variant"] = "fill";

  /**
   * Size of the button.
   */
  @property({ type: String, reflect: true })
  size: "small" | "medium" = "medium";

  /**
   * Color of the button.
   */
  @property({ type: String, reflect: true })
  color: ButtonVariantProps["color"] = "default";

  /**
   * Whether the button is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Link `href`.
   * Only used if the `type` is `"link"`.
   * If omitted with `type="link"`, the link will be treated as [a placeholder link](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element:~:text=If%20the%20a%20element%20has%20no%20href%20attribute) and rendered as disabled state.
   */
  @property({ type: String, reflect: true })
  href: string | null = null;

  /**
   * Type of the button.
   * If `"link"` is specified, the button will be rendered as an `<a>` element or `<span>` element (if `disabled` is `true`).
   */
  @property({ type: String, reflect: true })
  type: "button" | "submit" | "reset" | "link" = "button";

  /**
   * Optional ARIA role of the button.
   */
  @property({ type: String, reflect: true, attribute: "button-role" })
  buttonRole: ARIARole | null = null;

  @query("a,button")
  private _focusableElement!: HTMLAnchorElement | HTMLButtonElement | null;

  constructor() {
    super();

    this.addEventListener("click", (event: MouseEvent): void => {
      if (this.disabled) {
        event.stopImmediatePropagation();
      }
    });
  }

  override render() {
    const className = cvaButton({
      variant: this.variant,
      color: this.color,
    });

    if (this.type === "link") {
      const linkDisabled = this.disabled || this.href == null;
      return html`<a
        class=${className}
        href=${ifDefined(!linkDisabled ? (this.href ?? undefined) : undefined)}
        role=${ifDefined(
          this.buttonRole ?? (linkDisabled ? "link" : undefined)
        )}
        aria-disabled=${ifDefined(linkDisabled ? "true" : undefined)}
      >
        <slot name="left-icon"><span class="block -ml-1"></span></slot>
        <span class="px-2"><slot></slot></span>
        <slot name="right-icon"><span class="block -mr-1"></span></slot>
      </a>`;
    }

    return html`
      <button
        class=${className}
        ?disabled=${this.disabled}
        type=${this.type}
        role=${ifDefined(this.buttonRole ?? undefined)}
      >
        <slot name="left-icon"><span class="block -ml-1"></span></slot>
        <span class="px-2"><slot></slot></span>
        <slot name="right-icon"><span class="block -mr-1"></span></slot>
      </button>
    `;
  }

  /**
   * Focuses on the inner button or link.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._focusableElement?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-button": DaikinButton;
  }
}
