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
    "relative",
    "w-full",
    "h-full",
    "rounded-md",
    "font-daikinSerif",
    "text-daikinNeutral-900",
    "placeholder:text-daikinNeutral-700",

    // Define `--color-border` as a CSS variable that references `--color-state-error`, `--color-state-focus`, and `--color-base` in that order.
    // `--color-base` indicates the color of the border when the element is normal, hovered, pressed, or disabled.
    // By giving `--color-state-error` priority over the others, it is guaranteed that the color will always be red when there is an error, regardless of the state of the input control (focus, hover or press).
    // `--color-state-focus` has priority after `--color-state-error`, which means that when there is no error and the element is focused, the color will always be the focus color, regardless of hover or press.
    "define-[--color-state-error,--color-state-focus,--color-base]/color-border",
    "var-color-daikinNeutral-600/color-base",
    "border",
    "border-[--color-border]",
    "outline",
    "outline-[--color-border]",
    "outline-0",
    "-outline-offset-2",

    // Display the outline when hovering, pressing, or focusing.
    "enabled:hover:outline-2",
    "enabled:active:outline-2",
    "focus-visible:outline-2",

    // Update `--color-base` depending on the state.
    "enabled:hover:var-color-daikinNeutral-400/color-base",
    "enabled:active:var-color-daikinNeutral-700/color-base",
    "disabled:var-color-[--text-input-outline-color-disabled]/color-base",

    "focus-visible:var-color-daikinBlue-700/color-state-focus",

    "disabled:bg-[--text-input-background-color]",
    "disabled:text-[--text-input-outline-color-disabled]",
    "disabled:placeholder:text-[--text-input-outline-color-disabled]",
  ],
  {
    variants: {
      error: {
        false: [],
        // When in an error state and not disabled, set `--color-state-error`.
        // This is the highest priority variable, and it is guaranteed that `--color-border` will be this color in any state.
        true: [
          "enabled:var-color-[--text-input-border-color-error]/color-state-error",
        ],
      },
      leftIcon: {
        false: ["pl-3"],
        true: ["pl-11"],
      },
      rightIcon: {
        false: ["pr-3"],
        true: ["pr-11"],
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
   * Type of the text input.
   */
  @property({ type: String })
  type: "text" | "email" | "tel" | "search" = "text";

  /**
   * Value of the text input.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Form name of the text input.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Placeholder text.
   */
  @property({ type: String })
  placeholder = "";

  /**
   * Whether the text input is readonly.
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Whether the text input is disabled.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the text input is required.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether or not to display error states.
   * Ignored if the `disabled` is `true`.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Maximum length of value.
   */
  @property({ type: Number })
  maxlength?: number;

  /**
   * Value of `autocomplete` attribute of the internal `<input>`.
   */
  @property({ type: String })
  autocomplete?: HTMLInputElement["autocomplete"];

  /**
   * An icon displayed at the left of the input text.
   */
  @property({ type: String, attribute: "left-icon" })
  leftIcon: IconType | null = null;

  /**
   * An icon displayed at the right of the input text.
   */
  @property({ type: String, attribute: "right-icon" })
  rightIcon: IconType | null = null;

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._internals.setFormValue(this.value);
  }

  override render() {
    const createIcon = (position: "left" | "right", icon: IconType | null) =>
      icon
        ? html`<div
            class=${cvaIconContainer({
              disabled: this.disabled,
              position,
            })}
          >
            <daikin-icon icon=${icon} size="m" color="current"></daikin-icon>
          </div>`
        : nothing;

    return html`<div class="w-full h-full relative">
      <input
        class=${cvaInput({
          error: !this.disabled && this.error,
          leftIcon: !!this.leftIcon,
          rightIcon: !!this.rightIcon,
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
        ?required=${this.required}
        @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
        @input=${this._handleInput}
      />
      ${createIcon("left", this.leftIcon)}
      ${createIcon("right", this.rightIcon)}
    </div>`;
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
