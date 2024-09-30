import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, type PropertyValues, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTextarea = cva(
  [
    "w-full",
    "h-full",
    "px-4",
    "py-3",
    "rounded-md",
    "font-daikinSerif",
    "text-daikinNeutral-900",
    "placeholder:text-daikinNeutral-700",

    // Define `--color-border` as a CSS variable that references `--color-state-active`, `--color-state-focus` and `--color-base` in that order.
    // `--color-base` indicates the color of the border when the element is normal, hovered, or disabled.
    "define-[--color-state-active,--color-state-focus,--color-base]/color-border",
    "border",
    "border-[--color-border]",
    "outline",
    "outline-[--color-border]",
    "outline-0",
    "-outline-offset-2",

    // Display the outline when hovered, pressed, or focused.
    "enabled:hover:outline-2",
    "enabled:active:outline-2",
    "focus-visible:outline-2",

    // Set `--color-state-active` when pressed.
    "enabled:active:var-color-daikinNeutral-700/color-state-active",

    // Update `--color-base` depending on the state.
    // The default `--color-base` and `--color-state-focus` values are defined in `variants.error` because they differ depending on whether or not the input has an error state.
    "enabled:hover:var-color-daikinNeutral-400/color-base",
    "disabled:var-color-[--text-input-outline-color-disabled]/color-base",

    "disabled:bg-[--text-input-background-color]",
    "disabled:text-[--text-input-outline-color-disabled]",
    "disabled:placeholder:text-[--text-input-outline-color-disabled]",
  ],
  {
    variants: {
      error: {
        false: [
          "var-color-daikinNeutral-600/color-base",
          "focus-visible:var-color-daikinBlue-700/color-state-focus",
        ],
        true: [
          // When the input is not focused and not hovered or pressed, the border color will always be the error color.
          "var-color-[--text-input-border-color-error]/color-base",
          // When the input is focused and not pressed, the border color will always be the error color.
          "focus-visible:var-color-[--text-input-border-color-error]/color-state-focus",
        ],
      },
      resize: {
        false: ["resize-none"],
        true: ["resize-vertical"],
      },
    },
  }
);

/**
 * The textarea component is designed for multiline text input, similar to the HTML `<textarea>` tag.
 * It is ideal for situations where users need to enter longer pieces of text, such as comments, descriptions, or messages.
 * Can be used within `daikin-input-group` component.
 *
 * Hierarchies:
 * - `daikin-textarea` (can be used solely)
 * - `daikin-input-group` > `daikin-textarea`
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<textarea>` element.
 *
 * @example
 *
 * ```html
 * <!-- See `daikin-input-group` component for complete example. -->
 * <daikin-textarea name="name"></daikin-textarea>
 * ```
 */
@customElement("daikin-textarea")
export class DaikinTextarea extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --text-input-border-color-error: ${unsafeCSS(colorFeedbackNegative)};
      --text-input-outline-color-hover: #54c3f1;
      --text-input-outline-color-disabled: #dcdcdc;
      --text-input-outline-color-active: #cecece;
      --text-input-background-color: #ffffff;

      display: block;
      width: 360px;
      height: 87px;
      position: relative;
    }
  `;

  static readonly formAssociated = true;

  private _internals = this.attachInternals();

  /**
   * Field value
   */
  @property({ type: String })
  value = "";

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
   * Whether the field is required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Error state. Ignored if the `disabled` is `true`.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Specify auto-completion values
   */
  @property({ type: String, reflect: true })
  autocomplete?: HTMLInputElement["autocomplete"];

  /**
   * Whether to allow resizing of the text area
   */
  @property({ type: Boolean, reflect: true })
  resizable = false;

  private _updateValue(value: string): void {
    this._internals.setFormValue(value);
  }

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._updateValue(this.value);

    this.dispatchEvent(
      new CustomEvent("change-count", {
        detail: {
          count: this.value.length,
        },
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
  }

  override render() {
    return html`<textarea
      class=${cvaTextarea({
        error: !this.disabled && this.error,
        resize: this.resizable,
      })}
      .value=${this.value}
      placeholder=${this.placeholder}
      autocomplete=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(this.autocomplete as any)
      }
      ?disabled=${this.disabled}
      ?readonly=${this.readonly}
      ?required=${this.required}
      @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
      @input=${this._handleInput}
      @keydown=${this._handleInput}
    ></textarea>`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._updateValue(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-textarea": DaikinTextarea;
  }
}
