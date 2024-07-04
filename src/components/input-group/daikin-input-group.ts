import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import ctl from "@netlify/classnames-template-literals";
import tailwindStyles from "../../tailwind.css";

const inputGroupContainer = ctl(`
  flex
  flex-col
  justify-center
  w-max
  gap-2
  font-daikinSerif
  `);

const inputGroupError = ctl(`
  flex
  gap-2
  color-[--color-feedback-negative]
  leading-[22px]
  
  before:i-daikin-input-group-error
  before:block
  before:w-[16px]
  before:h-[22px]
  `);

const inputGroupHelperRequired = ctl(`
  after:content-['*']
  after:ml-[2px]
  `);

export interface DaikinInputGroupProps {
  label?: string;
  helper?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-input-group")
class DaikinInputGroup extends LitElement implements DaikinInputGroupProps {
  static styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --color-feedback-negative: ${unsafeCSS(colorFeedbackNegative)};
      display: block;
      width: max-content;
    }
  `;

  /**
   * Label text to place at the top of the field
   */
  @property({ type: String })
  label?: string;

  /**
   * Helper text to place at the bottom of the field
   */
  @property({ type: String })
  helper?: string;

  /**
   * Whether the field is disabled. Reflected in the `disabled` property of the input in the slot.
   */
  @property({ type: Boolean, reflect: true })
  disabled? = false;

  /**
   * Whether the field is required. An additional star mark will be added if `true`.
   */
  @property({ type: Boolean, reflect: true })
  required? = false;

  /**
   * Error text to place at the bottom of the field. If specified, sets the `error` property of the element in the slot to `true`. Ignored if the `disabled` is `true`.
   */
  @property({ type: String, reflect: true })
  error = "";

  private _handleSlotChange(): void {
    const inputs = [...this.getElementsByTagName("daikin-text-input")];

    const isError = !this.disabled && !!this.error;
    for (const input of inputs) {
      input.disabled = this.disabled;
      input.error = isError;
    }
  }

  private _reflectSlotProperties(): void {
    const inputs = [...this.getElementsByTagName("daikin-text-input")];

    const isError = !this.disabled && !!this.error;
    for (const input of inputs) {
      input.disabled = this.disabled;
      input.error = isError;
    }
  }

  render() {
    const inputGroupLabelClassName = [
      "text-base",
      "font-bold",
      this.disabled ? "text-daikinNeutral-200" : "text-daikinNeutral-800",
      this.required ? inputGroupHelperRequired : "",
    ].join(" ");

    const inputGroupHelperClassName = [
      "text-xs",
      this.disabled ? "text-daikinNeutral-200" : "text-daikinNeutral-800",
    ].join(" ");

    return html`<fieldset ?disabled="${this.disabled}" class="w-max">
      <label class="${inputGroupContainer}">
        ${!!this.label
          ? html`<span class="${inputGroupLabelClassName}">${this.label}</span>`
          : null}
        <slot @slotchange=${this._handleSlotChange}></slot>
        ${!!this.helper
          ? html`<span class="${inputGroupHelperClassName}"
              >${this.helper}</span
            >`
          : null}
        ${!this.disabled && !!this.error
          ? html`<span class="${inputGroupError}">${this.error}</span>`
          : null}
      </label>
    </fieldset>`;
  }

  updated() {
    this._reflectSlotProperties();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-input-group": DaikinInputGroup;
  }
}

export default DaikinInputGroup;
