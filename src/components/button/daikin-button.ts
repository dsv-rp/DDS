import {
  buttonColorBackgroundPrimaryActive,
  buttonColorBackgroundPrimaryDisabled,
  buttonColorBackgroundPrimaryFocus,
  buttonColorBackgroundPrimaryHover,
  buttonColorBackgroundPrimaryPress,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva, type VariantProps } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { ARIARole } from "../../litAnalyzerTypes";
import type { OmitNull } from "../../typeUtils";

import tailwindStyles from "../../tailwind.css?inline";
import styles from "./button.css?inline";

const buttonCN = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "font-daikinSerif",
    "font-bold",
    "rounded-lg",
    "tracking-wide",
    "text-wrap",
    "disabled:cursor-default",
    "h-full",
    "w-full",
  ],
  {
    variants: {
      intent: {
        primary: ["button-primary", "focus-visible:outline-none"],
        secondary: [
          "border-2",
          "bg-white",
          "text-daikinBlue-500",
          "border-daikinBlue-500",
          "hover:text-daikinBlue-300",
          "hover:border-daikinBlue-300",
          "active:text-daikinBlue-600",
          "active:border-daikinBlue-600",
          "focus-visible:text-daikinBlue-700",
          "focus-visible:border-daikinBlue-700",
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
          "hover:bg-daikinNeutral-100",
          "disabled:bg-transparent",
          "disabled:text-daikinNeutral-400",
        ],
        primaryDanger: [
          "bg-daikinRed",
          "text-white",
          "hover:bg-daikinRed-400",
          "focus-visible:bg-daikinRed-700",
          "disabled:bg-daikinNeutral-300",
          "active:bg-daikinRed-700",
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

type ButtonVariantProps = OmitNull<VariantProps<typeof buttonCN>>;

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-button")
export class DaikinButton extends LitElement {
  static readonly styles = css`
    ${unsafeCSS(tailwindStyles)}
    ${unsafeCSS(styles)}

    :host {
      --defaultButtonColorBackgroundPrimaryActive: ${unsafeCSS(
        buttonColorBackgroundPrimaryActive
      )};
      --defaultButtonColorBackgroundPrimaryFocus: ${unsafeCSS(
        buttonColorBackgroundPrimaryFocus
      )};
      --defaultButtonColorBackgroundPrimaryHover: ${unsafeCSS(
        buttonColorBackgroundPrimaryHover
      )};
      --defaultButtonColorBackgroundPrimaryPress: ${unsafeCSS(
        buttonColorBackgroundPrimaryPress
      )};
      --defaultButtonColorBackgroundPrimaryDisabled: ${unsafeCSS(
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
  role: ARIARole = "button";

  /**
   * Specify whether the button is loading.
   */
  @property({ type: Boolean })
  isLoading = false;

  render() {
    const buttonClassName = buttonCN({ intent: this.variant, size: this.size });

    const content = html`
      <slot name="leftIcon"></slot>
      <span><slot></slot></span>
      <slot name="rightIcon"></slot>
    `;
    if (this.href) {
      return html` <a
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
