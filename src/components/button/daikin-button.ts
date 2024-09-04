import {
  buttonColorBackgroundPrimaryActive,
  buttonColorBackgroundPrimaryDisabled,
  buttonColorBackgroundPrimaryFocus,
  buttonColorBackgroundPrimaryHover,
  buttonColorBackgroundPrimaryPress,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ARIARole } from "../../lit-analyzer-types";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import "../icon/daikin-icon";
import type { IconType } from "../icon/daikin-icon";

const BUTTON_ICON_SIZE_MAP = {
  medium: "m",
  small: "s",
} as const;

const cvaButton = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-2",
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

    "disabled:cursor-default",
  ],
  {
    variants: {
      variant: {
        fill: [
          "text-white",
          "enabled:bg-[--color-base]",
          "enabled:hover:bg-[--color-hover]",
          "enabled:active:bg-[--color-active]",
          "disabled:bg-daikinNeutral-200",
        ],
        outline: [
          "border",
          "bg-white",
          "text-[--color-base]",
          "border-[--color-base]",
          "enabled:hover:text-[--color-hover]",
          "enabled:hover:border-[--color-hover]",
          "enabled:active:text-[--color-active]",
          "enabled:active:border-[--color-active]",
          "disabled:border-daikinNeutral-200",
          "disabled:text-daikinNeutral-200",
        ],
        ghost: [
          "bg-white",
          "enabled:text-[--color-base]",
          "enabled:hover:text-[--color-hover]",
          "enabled:active:text-[--color-active]",
          "disabled:text-daikinNeutral-200",
        ],
      },
      size: {
        small: ["min-w-12", "px-3", "text-xs"],
        medium: ["min-w-[60px]", "px-4", "text-sm"],
      },
      color: {
        default: [
          "var-color-daikinBlue-500/color-base",
          "var-color-daikinBlue-300/color-hover",
          "var-color-daikinBlue-600/color-active",
        ],
        danger: [
          "var-color-daikinRed-500/color-base",
          "var-color-daikinRed-400/color-hover",
          "var-color-daikinRed-600/color-active",
        ],
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
      --buttonColorBackgroundPrimaryActive: ${unsafeCSS(
        buttonColorBackgroundPrimaryActive
      )};
      --buttonColorBackgroundPrimaryFocus: ${unsafeCSS(
        buttonColorBackgroundPrimaryFocus
      )};
      --buttonColorBackgroundPrimaryHover: ${unsafeCSS(
        buttonColorBackgroundPrimaryHover
      )};
      --buttonColorBackgroundPrimaryPress: ${unsafeCSS(
        buttonColorBackgroundPrimaryPress
      )};
      --buttonColorBackgroundPrimaryDisabled: ${unsafeCSS(
        buttonColorBackgroundPrimaryDisabled
      )};

      display: inline-block;
      width: fit-content;
    }

    :host([size="small"]) {
      height: 32px;
    }

    :host([size="medium"]) {
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
  @property({ type: String, reflect: true })
  rightIcon: IconType | null = null;

  /**
   * Set a icon in the left of button label
   */
  @property({ type: String, reflect: true })
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
    const BUTTON_CLASS_NAME = cvaButton({
      variant: this.variant,
      size: this.size,
      color: this.color,
    });

    const content = html`
      ${this.leftIcon
        ? html`<daikin-icon
            icon=${this.leftIcon}
            size=${BUTTON_ICON_SIZE_MAP[this.size]}
            color="current"
          ></daikin-icon>`
        : null}
      <slot></slot>
      ${this.rightIcon
        ? html`<daikin-icon
            icon=${this.rightIcon}
            size=${BUTTON_ICON_SIZE_MAP[this.size]}
            color="current"
          ></daikin-icon>`
        : null}
    `;

    if (this.href) {
      return html`<a
        href=${this.href}
        class=${BUTTON_CLASS_NAME}
        role=${this.buttonRole}
      >
        ${content}
      </a>`;
    }

    return html`
      <button
        class=${BUTTON_CLASS_NAME}
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
