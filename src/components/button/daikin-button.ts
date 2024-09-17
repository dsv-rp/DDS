import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ARIARole } from "../../lit-analyzer-types";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import "../icon/daikin-icon";
import type { IconType } from "../icon/daikin-icon";

const cvaButton = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-1",
    "w-full",
    "h-full",
    "font-daikinSerif",
    "font-bold",
    "rounded",
    "tracking-wide",
    "text-nowrap",

    "focus-visible:outline",
    "focus-visible:outline-1",
    "focus-visible:outline-offset-1",
    "focus-visible:outline-daikinBlue-700",
  ],
  {
    variants: {
      size: {
        small: ["py-2", "text-xs"],
        medium: ["py-3", "text-sm"],
      },
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
      leftIcon: {
        false: ["pl-4"],
        true: ["pl-3"],
      },
      rightIcon: {
        false: ["pr-4"],
        true: ["pr-3"],
      },
      variant: {
        fill: ["text-white", "bg-[--color-primary]"],
        outline: [
          "border",
          "bg-white",
          "text-[--color-primary]",
          "border-[--color-primary]",
        ],
        ghost: ["bg-white", "text-[--color-primary]"],
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
 *
 * @example
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
      min-width: 48px;
      height: 32px;
    }

    :host([size="medium"]) {
      min-width: 60px;
      height: 44px;
    }
  `;

  /**
   * Variant of button
   */
  @property({ type: String })
  variant: ButtonVariantProps["variant"] = "fill";

  /**
   * Color of button
   */
  @property({ type: String })
  color: ButtonVariantProps["color"] = "default";

  /**
   * Size of button
   */
  @property({ type: String, reflect: true })
  size: ButtonVariantProps["size"] = "medium";

  /**
   * Whether the button is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set a icon in the right of button label
   */
  @property({ type: String, reflect: true, attribute: "right-icon" })
  rightIcon: IconType | null = null;

  /**
   * Set a icon in the left of button label
   */
  @property({ type: String, reflect: true, attribute: "left-icon" })
  leftIcon: IconType | null = null;

  /**
   * Link `href`. If present, this button is rendered as `<a>`.
   */
  @property({ type: String, reflect: true })
  href = "";

  /**
   * Specify the button type
   */
  @property({ type: String, reflect: true })
  type: "button" | "submit" | "reset" = "button";

  /**
   * Specify the button role
   */
  @property({ type: String, reflect: true, attribute: "button-role" })
  buttonRole: ARIARole = "button";

  override render() {
    const className = cvaButton({
      variant: this.variant,
      size: this.size,
      color: this.color,
      leftIcon: !!this.leftIcon,
      rightIcon: !!this.rightIcon,
    });

    const content = html`
      ${this.leftIcon
        ? html`<daikin-icon
            icon=${this.leftIcon}
            size="xl"
            color="current"
          ></daikin-icon>`
        : null}
      <slot></slot>
      ${this.rightIcon
        ? html`<daikin-icon
            icon=${this.rightIcon}
            size="xl"
            color="current"
          ></daikin-icon>`
        : null}
    `;

    if (this.href) {
      return this.disabled
        ? html`<span class=${className}>${content}</span>`
        : html`<a class=${className} href=${this.href} role=${this.buttonRole}>
            ${content}
          </a>`;
    }

    return html`
      <button
        class=${className}
        ?disabled=${this.disabled}
        type=${this.type}
        role=${this.buttonRole}
      >
        ${content}
      </button>
    `;
  }

  /**
   * Focuses on the inner button.
   * @param options focus options
   */
  override focus(options?: FocusOptions | undefined): void {
    this.shadowRoot?.querySelector("button")?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-button": DaikinButton;
  }
}
