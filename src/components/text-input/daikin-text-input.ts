import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import ctl from "@netlify/classnames-template-literals";
import { LitElement, PropertyValues, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css";

export interface DaikinTextInputProps {
  value: string;
  type?: "text" | "email" | "tel" | "search";
  placeholder: string;
  disabled?: boolean;
  readonly?: boolean;
  name?: string;
  maxlength?: number;
  autocomplete?: HTMLInputElement["autocomplete"];
  error?: boolean;
}

const textInputBase = ctl(`
  w-[340px]
  h-12
  text-daikinNeutral-900
  border
  border-solid
  px-[9px]
  rounded-[6px]
  font-daikinSerif
  placeholder:text-daikinNeutral-200

  enabled:hover:outline
  enabled:hover:outline-2
  enabled:hover:outline-[--text-input-outline-color-hover]
  enabled:active:outline
  enabled:active:outline-2
  enabled:active:outline-[--text-input-outline-color-active]
  focus-visible:outline
  focus-visible:outline-2
  focus-visible:outline-[--text-input-outline-color-active]
  disabled:text-[--text-input-outline-color-disabled]
  disabled:bg-[--text-input-background-color]
  disabled:border-[--text-input-outline-color-disabled]
`);

const textInputError = ctl(`
  bg-daikinRed-50
  border-[--text-input-border-color-error]
`);

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-text-input")
class DaikinTextInput extends LitElement implements DaikinTextInputProps {
  static styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --text-input-border-color-error: ${unsafeCSS(colorFeedbackNegative)};
      --text-input-outline-color-hover: #54c3f1;
      --text-input-outline-color-disabled: #dcdcdc;
      --text-input-outline-color-active: #cecece;
      --text-input-background-color: #ffffff;
      display: block;
      width: max-content;
    }
  `;

  static formAssociated = true;

  @state()
  private _internals: ElementInternals;

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
  disabled? = false;

  /**
   * Whether the field is readonly
   */
  @property({ type: Boolean })
  readonly? = false;

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
  error? = false;

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._internals.setFormValue(this.value);
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  render() {
    const textInputInputClassName = [
      textInputBase,
      this.error ? textInputError : "border-daikinNeutral-600",
    ].join(" ");

    this._internals.setFormValue(this.value);

    return html`<input
      type="${this.type}"
      value="${this.value}"
      placeholder="${this.placeholder}"
      ?disabled="${this.disabled}"
      ?readonly="${this.readonly}"
      name="${ifDefined(this.name)}"
      maxlength="${ifDefined(this.maxlength)}"
      autocomplete="${ifDefined(this.autocomplete as any)}"
      @change="${(e: Event) => this.dispatchEvent(new Event("change", e))}"
      @input="${(e: InputEvent) => this._handleInput(e)}"
      class="${textInputInputClassName}"
    />`;
  }

  updated(changedProperties: PropertyValues) {
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

export default DaikinTextInput;
