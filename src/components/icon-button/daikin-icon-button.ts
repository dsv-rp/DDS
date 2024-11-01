import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import "../icon/daikin-icon";

const cvaIconButton = cva(
  [
    "inline-flex",
    "justify-center",
    "items-center",
    "w-8",
    "h-8",
    "font-daikinSerif",
    "font-bold",
    "rounded",
    "p-1",
    "tracking-wide",
    "text-nowrap",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-offset-2",
    "focus-visible:outline-[#0081C0]",

    "var-color-transparent/color-secondary",
    "link-disabled:var-color-daikinNeutral-400/color-primary",
  ],
  {
    variants: {
      color: {
        default: [
          "link-enabled:var-color-daikinBlue-500/color-primary",
          "link-enabled:hover:var-color-[#0081C0]/color-primary",
          "link-enabled:hover:var-color-[#DDF3FC]/color-secondary",
          "link-enabled:active:var-color-[#00689A]/color-primary",
          "link-enabled:active:var-color-[#BBE7F9]/color-secondary",
        ],
        danger: [
          "link-enabled:var-color-[#D80C18]/color-primary",
          "link-enabled:hover:var-color-[#B90A15]/color-primary",
          "link-enabled:hover:var-color-[#FDD9DB]/color-secondary",
          "link-enabled:active:var-color-[#9A0911]/color-primary",
          "link-enabled:active:var-color-[#FBB3B7]/color-secondary",
        ],
        neutral: [
          "link-enabled:var-color-[#616161]/color-primary",
          "link-enabled:hover:var-color-[#515151]/color-primary",
          "link-enabled:hover:var-color-[#F2F2F2]/color-secondary",
          "link-enabled:active:var-color-[#414141]/color-primary",
          "link-enabled:active:var-color-[#EBEBEB]/color-secondary",
        ],
      },
      variant: {
        fill: ["text-white", "bg-[--color-primary]"],
        outline: [
          "border",
          "text-[--color-primary]",
          "bg-[--color-secondary]",
          "border-[--color-primary]",
        ],
        ghost: ["text-[--color-primary]", "bg-[--color-secondary]"],
      },
    },
  }
);

type IconButtonVariantProps = MergeVariantProps<typeof cvaIconButton>;

/**
 * The icon button component is a versatile UI element that triggers actions or submits forms when clicked.
 * It functions similarly to the HTML `<button>` tag, allowing users to initiate various operations such as submitting data, opening dialogs, or navigating to different sections of an application.
 *
 * You can insert any icon, including the daikin-icon, but please note the following regarding style:
 * - About fill color - The icon should be able to accept the CSS `color` property.
 * - About size - The recommended width of the icon is 24px * 24px. Please make sure that the size of the icon you insert conforms to this, or please set the `width` and `height` properties of the icon to 100%.
 *
 * @fires click - A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) emitted from the inner `<button>` element. Suppressed if `disabled` is true,
 *
 * @slot - A slot for an icon. Place a daikin-icon element or something similar.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/icon-button/index.js";
 * ```
 *
 * ```html
 * <daikin-icon-button>
 *   <!-- Any icon, including `daikin-icon` -->
 * </daikin-icon-button>
 * ```
 */
@customElement("daikin-icon-button")
export class DaikinIconButton extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
    }

    ::slotted {
      width: 100%;
      height: 100%;
    }
  `;

  /**
   * Type of the button.
   */
  @property({ type: String, reflect: true })
  type: "button" | "submit" | "reset" = "button";

  /**
   * Variant of the button.
   */
  @property({ type: String, reflect: true })
  variant: IconButtonVariantProps["variant"] = "fill";

  /**
   * Color of the button.
   */
  @property({ type: String, reflect: true })
  color: IconButtonVariantProps["color"] = "default";

  /**
   * The aria-label of the button.
   */
  @property({ type: String, reflect: true, attribute: "button-aria-label" })
  buttonAriaLabel: string | null = null;

  /**
   * Whether the button is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @query("button")
  private _button!: HTMLButtonElement | null;

  constructor() {
    super();

    this.addEventListener("click", (event: MouseEvent): void => {
      if (this.disabled) {
        event.stopImmediatePropagation();
      }
    });
  }

  override render() {
    return html`
      <button
        class=${cvaIconButton({
          variant: this.variant,
          color: this.color,
        })}
        type=${this.type}
        aria-label=${this.buttonAriaLabel ?? ""}
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </button>
    `;
  }

  /**
   * Focuses on the inner button.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._button?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-icon-button": DaikinIconButton;
  }
}
