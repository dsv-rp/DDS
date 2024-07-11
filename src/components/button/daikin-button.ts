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

const BUTTON_ICON_SIZE_MAP = {
  default: "m" as const,
  condensed: "s" as const,
};

const cvaButton = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "gap-2",
    "font-daikinSerif",
    "font-bold",
    "rounded-lg",
    "tracking-wide",
    "text-wrap",
    "disabled:cursor-default",
    "w-full",
    "h-full",
  ],
  {
    variants: {
      intent: {
        primary: [
          "text-white",
          "bg-[--buttonColorBackgroundPrimaryActive]",
          "enabled:focus-visible:bg-[--buttonColorBackgroundPrimaryFocus]",
          "enabled:hover:bg-[--buttonColorBackgroundPrimaryHover]",
          "enabled:active:bg-[--buttonColorBackgroundPrimaryPress]",
          "disabled:bg-[--buttonColorBackgroundPrimaryDisabled]",
          "focus-visible:outline-none",
        ],
        secondary: [
          "border-2",
          "bg-white",
          "text-daikinBlue-500",
          "border-daikinBlue-500",
          "enabled:hover:text-daikinBlue-300",
          "enabled:hover:border-daikinBlue-300",
          "enabled:active:text-daikinBlue-600",
          "enabled:active:border-daikinBlue-600",
          "enabled:focus-visible:text-daikinBlue-700",
          "enabled:focus-visible:border-daikinBlue-700",
          "disabled:border-daikinNeutral-300",
          "disabled:text-daikinNeutral-400",
          "disabled:border",
          "focus-visible:outline-none",
        ],
        tertiary: [
          "text-daikinBlue-400",
          "bg-none",
          "border-none",
          "shadow-none",
          "enabled:hover:bg-daikinNeutral-100",
          "disabled:bg-transparent",
          "disabled:text-daikinNeutral-400",
        ],
        primaryDanger: [
          "bg-daikinRed",
          "text-white",
          "enabled:hover:bg-daikinRed-400",
          "enabled:focus-visible:bg-daikinRed-700",
          "enabled:active:bg-daikinRed-700",
          "disabled:bg-daikinNeutral-300",
          "focus-visible:outline-none",
        ],
      },
      size: {
        default: ["px-4", "text-[14px]"],
        condensed: ["px-[10px]", "text-[12px]"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "condensed",
    },
  }
);

type ButtonVariantProps = MergeVariantProps<typeof cvaButton>;

/**
 * Primary UI component for user interaction
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
      min-height: 42px;
      height: 1px;
    }

    :host([size="condensed"]) {
      min-height: 32px;
    }
  `;

  /**
   * Type of variant.
   */
  @property({ type: String })
  variant: ButtonVariantProps["intent"] = "primary";

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Set a icon in the right of button label.
   */
  @property({ type: String, reflect: true })
  rightIcon = "";

  /**
   * Set a icon in the left of button label.
   */
  @property({ type: String, reflect: true })
  leftIcon = "";

  /**
   * Link `href`. If present, this button is rendered as `<a>`.
   */
  @property({ type: String, reflect: true })
  href = "";

  /**
   * Specify the button size.
   */
  @property({ type: String, reflect: true })
  size: ButtonVariantProps["size"] = "default";

  /**
   * Specify the button type.
   */
  @property({ type: String, reflect: true })
  type: "button" | "submit" | "reset" = "button";

  /**
   * Specify the button role.
   */
  @property({ type: String, reflect: true })
  override role: ARIARole = "button";

  /**
   * Specify whether the button is loading.
   */
  @property({ type: Boolean })
  isLoading = false;

  override render() {
    const buttonClassName = cvaButton({
      intent: this.variant,
      size: this.size,
    });

    const content = html`
      ${this.leftIcon.length
        ? html`<span
            ><daikin-icon
              icon="${this.leftIcon}"
              size="${BUTTON_ICON_SIZE_MAP[this.size]}"
              color="original"
            ></daikin-icon
          ></span>`
        : null}
      <span><slot></slot></span>
      ${this.rightIcon.length
        ? html`<span
            ><daikin-icon
              icon="${this.rightIcon}"
              size="${BUTTON_ICON_SIZE_MAP[this.size]}"
              color="original"
            ></daikin-icon
          ></span>`
        : null}
    `;

    if (this.href) {
      return html`<a
        href="${this.href}"
        class="${buttonClassName}"
        role="${this.role}"
      >
        ${content}
      </a>`;
    }

    return html`
      <button
        class="${buttonClassName}"
        ?disabled="${this.disabled}"
        type="${this.type}"
        role="${this.role}"
      >
        ${content}
      </button>
    `;
  }

  override focus(options?: FocusOptions | undefined): void {
    this.shadowRoot?.querySelector("button")?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-button": DaikinButton;
  }
}
