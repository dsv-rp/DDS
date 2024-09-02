import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import {
  LitElement,
  type PropertyValues,
  css,
  html,
  nothing,
  unsafeCSS,
} from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";
import type { IconType } from "../icon/daikin-icon";

const cvaInput = cva(
  [
    "w-full",
    "h-full",
    "text-daikinNeutral-900",
    "border",
    "border-solid",
    "rounded-[6px]",
    "font-daikinSerif",
    "relative",
    "placeholder:text-daikinNeutral-700",

    "enabled:hover:outline",
    "enabled:hover:-outline-offset-2",
    "enabled:hover:outline-daikinNeutral-300",
    "enabled:hover:outline-2",

    "enabled:active:outline",
    "enabled:active:-outline-offset-2",
    "enabled:active:outline-daikinNeutral-300",
    "enabled:active:outline-2",

    "enabled:focus-visible:outline",
    "enabled:focus-visible:-outline-offset-2",
    "enabled:focus-visible:outline-daikinBlue-700",
    "enabled:focus-visible:outline-2",

    "disabled:text-[--text-input-outline-color-disabled]",
    "disabled:bg-[--text-input-background-color]",
    "disabled:border-[--text-input-outline-color-disabled]",
    "disabled:placeholder:text-[--text-input-outline-color-disabled]",
  ],
  {
    variants: {
      error: {
        false: ["border-daikinNeutral-600"],
        true: ["border-[--text-input-border-color-error]"],
      },
      icon: {
        left: ["pl-11", "pr-3"],
        right: ["pl-3", "pr-11"],
        none: ["px-3"],
      },
    },
  }
);

const cvaIconContainer = cva(
  [
    "flex",
    "justify-center",
    "items-center",
    "w-6",
    "h-6",
    "absolute",
    "top-0",
    "bottom-0",
    "m-auto",
    "z-[1]",
  ],
  {
    variants: {
      disabled: {
        false: [],
        true: ["text-[--text-input-outline-color-disabled]"],
      },
      position: {
        left: ["left-3"],
        right: ["right-3"],
      },
    },
  }
);

/**
 * The text input component is a UI element that allows users to input single-line text data.
 * It functions similarly to the HTML `<input type="text">` tag, providing a simple and efficient way for users to enter and edit short pieces of texts, such as names, email addresses, or search queries.
 * Can be used within `daikin-input-group` component.
 *
 * Hierarchies:
 * - `daikin-text-input` (can be used solely)
 * - `daikin-input-group` > `daikin-text-input`
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<input>` element.
 *
 * @example
 *
 * ```html
 * <!-- See `daikin-input-group` component for complete example. -->
 * <daikin-text-input name="name"></daikin-text-input>
 * ```
 */
@customElement("daikin-text-input")
export class DaikinTextInput extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --text-input-background-color: #ffffff;
      --text-input-border-color-error: ${unsafeCSS(colorFeedbackNegative)};
      --text-input-outline-color-disabled: #dcdcdc;
      --text-input-outline-color-active: #cecece;
      --text-input-outline-color-hover: #54c3f1;

      display: block;
      width: 340px;
      height: 48px;
    }
  `;

  static readonly formAssociated = true;

  private _internals = this.attachInternals();

  /**
   * Field value
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Type of field
   */
  @property({ type: String })
  type: "text" | "email" | "tel" | "search" = "text";

  /**
   * Placeholder text
   */
  @property({ type: String })
  placeholder = "";

  /**
   * Whether the field is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the field is readonly
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Name of the input field control used in the form
   */
  @property({ type: String, reflect: true })
  name?: string;

  /**
   * Maximum length in field values
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Specify auto-completion values
   */
  @property({ type: String })
  autocomplete?: HTMLInputElement["autocomplete"];

  /**
   * Error state. Ignored if the `disabled` is `true`.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Set a icon in the left of label
   */
  @property({ type: String })
  leftIcon: IconType | null = null;

  /**
   * Set a icon in the right of label
   */
  @property({ type: String })
  rightIcon: IconType | null = null;

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._internals.setFormValue(this.value);
  }

  override render() {
    const input = html`<input
      class=${cvaInput({
        error: !this.disabled && this.error,
        icon: this.leftIcon ? "left" : this.rightIcon ? "right" : "none",
      })}
      type=${this.type}
      value=${this.value}
      placeholder=${this.placeholder}
      name=${ifDefined(this.name)}
      maxlength=${ifDefined(this.maxlength)}
      autocomplete=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(this.autocomplete as any)
      }
      ?disabled=${this.disabled}
      ?readonly=${this.readonly}
      @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
      @input=${this._handleInput}
    />`;

    return !!this.leftIcon || !!this.rightIcon
      ? html`<div class="w-full h-full relative">
          ${this.leftIcon
            ? html`<div
                class=${cvaIconContainer({
                  disabled: this.disabled,
                  position: "left",
                })}
              >
                <daikin-icon
                  icon=${this.leftIcon}
                  size="m"
                  color="current"
                ></daikin-icon>
              </div>`
            : nothing}${input}${this.rightIcon
            ? html`<div
                class=${cvaIconContainer({
                  disabled: this.disabled,
                  position: "right",
                })}
              >
                <daikin-icon
                  icon=${this.rightIcon}
                  size="m"
                  color="current"
                ></daikin-icon>
              </div>`
            : nothing}
        </div>`
      : input;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._internals.setFormValue(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-text-input": DaikinTextInput;
  }
}
