import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, type PropertyValues, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaTextarea = cva(
  [
    "w-[340px]",
    "h-[120px]",
    "text-daikinNeutral-900",
    "border",
    "border-solid",
    "px-[9px]",
    "py-1",
    "font-daikinSerif",
    "rounded-[6px]",
    "placeholder:text-daikinNeutral-200",

    "enabled:hover:outline",
    "enabled:hover:outline-2",
    "enabled:hover:outline-[--text-input-outline-color-hover]",
    "enabled:active:outline",
    "enabled:active:outline-2",
    "enabled:active:outline-[--text-input-outline-color-active]",
    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:outline-[--text-input-outline-color-active]",
    "disabled:text-[--text-input-outline-color-disabled]",
    "disabled:bg-[--text-input-background-color]",
    "disabled:border-[--text-input-outline-color-disabled]",
  ],
  {
    variants: {
      variant: {
        normal: ["border-daikinNeutral-600"],
        error: ["bg-daikinRed-50", "border-[--text-input-border-color-error]"],
      },
    },
  }
);

const cvaCounter = cva(
  ["absolute", "top-[-24px]", "right-0", "text-[12px]", "font-daikinSerif"],
  {
    variants: {
      variant: {
        normal: ["text-daikinNeutral-900"],
        disabled: ["text-[--text-input-outline-color-disabled]"],
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
      width: max-content;
      height: 120px;
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
   * Whether the field is required
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the field is readonly
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Maximum length in field values
   */
  @property({ type: Number, reflect: true })
  maxlength: number = 100;

  /**
   * Specify auto-completion values
   */
  @property({ type: String, reflect: true })
  autocomplete?: HTMLInputElement["autocomplete"];

  /**
   * Error state. Ignored if the `disabled` is `true`.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Whether to display a counter at the top of the text area
   */
  @property({ type: Boolean, reflect: true })
  counter = false;

  @state()
  protected _textareaCounter: number = 0;

  private _updateValueAndCounter(value: string): void {
    this._internals.setFormValue(value);
    this._textareaCounter = [...value].length;
  }

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._updateValueAndCounter(this.value);
  }

  override render() {
    const textareaClassName = cvaTextarea({
      variant: !this.disabled && this.error ? "error" : "normal",
    });

    const textareaCounterClassName = cvaCounter({
      variant: this.disabled ? "disabled" : "normal",
    });

    return html`<textarea
        class=${textareaClassName}
        .value=${this.value}
        placeholder=${this.placeholder}
        maxlength=${this.maxlength}
        autocomplete=${
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
          ifDefined(this.autocomplete as any)
        }
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}
        @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
        @input=${this._handleInput}
        @keydown=${this._handleInput}
      ></textarea>
      ${this.counter
        ? html`
            <span class=${textareaCounterClassName}
              >${this._textareaCounter}/${this.maxlength}</span
            >
          `
        : null}`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }

    this._updateValueAndCounter(this.value);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-textarea": DaikinTextarea;
  }
}
