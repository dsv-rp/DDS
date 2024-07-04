import {
  buttonColorBackgroundPrimaryDisabled,
  buttonColorBackgroundPrimaryHover,
  colorFeedbackNegative,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import ctl from "@netlify/classnames-template-literals";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
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
  border-daikinNeutral-600
  border-solid
  px-[9px]
  rounded-[6px]
  font-daikinSerif
  placeholder:text-daikinNeutral-200
  enabled:hover:outline
  enabled:hover:outline-2
  enabled:hover:outline-[--button-color-background-primary-hover]
  enabled:active:outline
  enabled:active:outline-2
  enabled:active:outline-[--button-color-background-secondary-hover]
  focus-visible:outline
  focus-visible:outline-2
  focus-visible:outline-[--button-color-background-secondary-hover]
  disabled:text-[--button-color-background-primary-disabled]
  disabled:bg-[--input-field-color-background]
  disabled:border-[--button-color-background-primary-disabled]
  `);

const textInputError = ctl(`
    bg-daikinRed-50
    border-[--color-feedback-negative]
    `);

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-text-input")
class DaikinTextInput extends LitElement implements DaikinTextInputProps {
  static styles = css`
    ${unsafeCSS(tailwindStyles)}
    :host {
      --color-feedback-negative: ${unsafeCSS(colorFeedbackNegative)};
      --button-color-background-primary-hover: ${unsafeCSS(
        buttonColorBackgroundPrimaryHover
      )};
      --button-color-background-primary-disabled: ${unsafeCSS(
        buttonColorBackgroundPrimaryDisabled
      )};
      --button-color-background-secondary-hover: ${unsafeCSS("#CECECE")};
      --input-field-color-background: ${unsafeCSS("#FFFFFF")};
      display: block;
      width: max-content;
    }
  `;

  /**
   * Field value
   */
  @property({ type: String })
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
  @property({ type: String })
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

  render() {
    const textInputInputClassName = [
      textInputBase,
      this.error ? textInputError : "",
    ].join(" ");
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
      class="${textInputInputClassName}"
    />`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "daikin-text-input": DaikinTextInput;
  }
}

export default DaikinTextInput;
