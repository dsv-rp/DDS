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
    "text-daikinNeutral-900",
    "border",
    "border-solid",
    "p-3",
    "font-daikinSerif",
    "rounded-md",
    "placeholder:text-daikinNeutral-700",
    "outline",
    "-outline-offset-2",
    "outline-0",

    "enabled:hover:outline-2",
    "enabled:hover:outline-daikinNeutral-300",
    "enabled:active:outline-2",
    "enabled:active:outline-daikinNeutral-300",
    "focus-visible:outline-2",
    "focus-visible:outline-daikinBlue-700",

    "disabled:text-[--text-input-outline-color-disabled]",
    "disabled:bg-[--text-input-background-color]",
    "disabled:border-[--text-input-outline-color-disabled]",
    "disabled:placeholder:text-[--text-input-outline-color-disabled]",
  ],
  {
    variants: {
      status: {
        default: ["border-daikinNeutral-600"],
        error: ["border-[--text-input-border-color-error]"],
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
        status: !this.disabled && this.error ? "error" : "default",
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
