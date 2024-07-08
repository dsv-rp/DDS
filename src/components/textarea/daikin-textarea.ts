import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { LitElement, PropertyValues, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import ctl from "@netlify/classnames-template-literals";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css";

export interface DaikinTextareaProps {
  placeholder: string;
  disabled?: boolean;
  readonly?: boolean;
  maxlength?: number;
  autocomplete?: HTMLTextAreaElement["autocomplete"];
  error?: boolean;
  counter?: boolean;
}

const textareaBase = ctl(`
  w-[340px]
  h-[120px]
  text-daikinNeutral-900
  border
  border-solid
  px-[9px]
  py-1
  font-daikinSerif
  rounded-[6px]
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

const textareaError = ctl(`
  bg-daikinRed-50
  border-[--text-input-border-color-error]
`);

const textareaCounterBase = ctl(`
  absolute
  top-[-24px]
  right-0
  text-[12px]
  font-daikinSerif
`);

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-textarea")
class DaikinTextarea extends LitElement implements DaikinTextareaProps {
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
      height: 120px;
      position: relative;
    }
  `;

  static readonly formAssociated = true;

  @state()
  private _internals: ElementInternals;

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
  @property({ type: Boolean })
  disabled? = false;

  /**
   * Whether the field is required
   */
  @property({ type: Boolean })
  required? = false;

  /**
   * Whether the field is readonly
   */
  @property({ type: Boolean, reflect: true })
  readonly? = false;

  /**
   * Maximum length in field values
   */
  @property({ type: Number })
  maxlength: number = 100;

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

  /**
   * Error state. Ignored if the `disabled` is `true`.
   */
  @property({ type: Boolean, reflect: true })
  counter? = false;

  private _textareaCounter: number = 0;

  private _handleInput(e: InputEvent): void {
    this.value = (e.target as HTMLInputElement).value;
    this._internals.setFormValue(this.value);
    this._textareaCounter = this.value.length;
  }

  constructor() {
    super();
    this._internals = this.attachInternals();
  }

  render() {
    const textareaClassName = [
      textareaBase,
      !this.disabled && this.error ? textareaError : "border-daikinNeutral-600",
    ].join(" ");
    const textareaCounterClassName = [
      textareaCounterBase,
      this.disabled
        ? "text-[--text-input-outline-color-disabled]"
        : "text-daikinNeutral-900",
    ].join(" ");

    return html`<textarea
        placeholder="${this.placeholder}"
        ?disabled="${this.disabled}"
        ?readonly="${this.readonly}"
        maxlength="${this.maxlength}"
        autocomplete="${ifDefined(this.autocomplete as any)}"
        @change="${(e: Event) => this.dispatchEvent(new Event("change", e))}"
        @input="${(e: InputEvent) => this._handleInput(e)}"
        class="${textareaClassName}"
      ></textarea>
      ${this.counter
        ? html`
            <span class="${textareaCounterClassName}"
              >${this._textareaCounter}/100</span
            >
          `
        : null}`;
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
    "daikin-textarea": DaikinTextarea;
  }
}

export default DaikinTextarea;
