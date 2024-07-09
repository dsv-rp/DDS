import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinTextInput } from "../text-input/daikin-text-input";

const cvaLabel = cva(["text-base", "font-bold"], {
  variants: {
    variant: {
      enabled: ["text-daikinNeutral-800"],
      disabled: ["text-daikinNeutral-200"],
    },
    required: {
      optional: [],
      required: ["after:content-['*']", "after:ml-[2px]"],
    },
  },
});

const cvaHelper = cva(["h-[22px]", "text-xs"], {
  variants: {
    variant: {
      enabled: ["text-daikinNeutral-800"],
      disabled: ["text-daikinNeutral-200"],
    },
  },
});

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-input-group")
export class DaikinInputGroup extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --input-group-border-color-error: ${unsafeCSS(colorFeedbackNegative)};

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
   * Helper text to place at the bottom of the field. In error conditions, this text is hidden.
   */
  @property({ type: String })
  helper?: string;

  /**
   * Whether the field is disabled. Reflected in the `disabled` property of the input in the slot.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the field is required. An additional star mark will be added if `true`.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Error text to place at the bottom of the field. If specified, sets the `error` property of the element in the slot to `true`. Ignored if the `disabled` is `true`.
   */
  @property({ type: String, reflect: true })
  error = "";

  @queryAssignedElements({ selector: "daikin-text-input" })
  _textInputs!: DaikinTextInput[];

  private _handleSlotChange(): void {
    this._reflectSlotProperties();
  }

  private _reflectSlotProperties(): void {
    const isError = !this.disabled && !!this.error;
    for (const input of this._textInputs) {
      input.disabled = !!this.disabled;
      input.error = isError;
    }
  }

  override render() {
    const inputGroupLabelClassName = cvaLabel({
      variant: this.disabled ? "disabled" : "enabled",
      required: this.required ? "required" : "optional",
    });

    const inputGroupHelperClassName = cvaHelper({
      variant: this.disabled ? "disabled" : "enabled",
    });

    return html`<fieldset class="content" ?disabled=${this.disabled}>
      <label class="flex flex-col justify-center w-max gap-1 font-daikinSerif">
        ${this.label
          ? html`<span class=${inputGroupLabelClassName}>${this.label}</span>`
          : null}
        <slot @slotchange=${this._handleSlotChange}></slot>
        ${this.helper && !this.error
          ? html`<span class=${inputGroupHelperClassName}>${this.helper}</span>`
          : null}
        ${!this.disabled && !!this.error
          ? html`<span
              class="flex gap-2 text-[--input-group-border-color-error] leading-[22px] before:i-daikin-input-group-error before:block before:w-[16px] before:h-[22px]"
              >${this.error}</span
            >`
          : null}
      </label>
    </fieldset>`;
  }

  override updated() {
    this._reflectSlotProperties();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-input-group": DaikinInputGroup;
  }
}

export default DaikinInputGroup;
