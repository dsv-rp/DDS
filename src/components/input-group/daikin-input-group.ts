import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";
import type { DaikinTextInput } from "../text-input/daikin-text-input";
import type { DaikinTextarea } from "../textarea/daikin-textarea";

type ControlElement = DaikinTextInput | DaikinTextarea;

const cvaLabel = cva(
  ["flex", "items-center", "font-bold", "leading-5", "mb-2"],
  {
    variants: {
      required: {
        false: [],
        true: [
          "after:i-daikin-required",
          "after:size-4",
          "after:text-daikinRed-500",
          "after:ml-1",
        ],
      },
    },
  }
);

const cvaHelper = cva(["block", "h-[22px]", "text-sm"], {
  variants: {
    disabled: {
      false: ["text-daikinNeutral-800"],
      true: ["text-daikinNeutral-200"],
    },
  },
});

const cvaHelperAndErrorContainer = cva(["h-max"], {
  variants: {
    visible: {
      false: [],
      true: ["mt-2"],
    },
  },
});

/**
 * The input group component serves as a wrapper for a `daikin-text-input` or `daikin-textarea` component, providing additional elements such as labels, helper texts, or a counter.
 * It enhances the user experience by associating supplementary information or functionality directly with the input field.
 * This component is particularly useful for creating complex forms where clear communication and guidance are essential.
 *
 * Hierarchies:
 * - `daikin-input-group` > `daikin-text-input`
 * - `daikin-input-group` > `daikin-textarea`
 *
 * @slot - A slot for a input component. Place a `daikin-text-input` or `daikin-textarea` element here.
 *
 * @example
 *
 * With Text Input:
 *
 * ```html
 * <daikin-input-group>
 *   <daikin-text-input value="Content of Text Input"></daikin-text-input>
 * </daikin-input-group>
 * ```
 *
 * With Textarea:
 *
 * ```html
 * <daikin-input-group>
 *   <daikin-textarea value="Content of Textarea"></daikin-textarea>
 * </daikin-input-group>
 * ```
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

  /**
   * Whether to display the counter in the Textarea
   */
  @property({ type: Boolean, reflect: true })
  textareaCounter = false;

  @queryAssignedElements({ selector: "daikin-textarea" })
  _textareas!: DaikinTextarea[];

  @queryAssignedElements({ selector: "daikin-text-input,daikin-textarea" })
  _controls!: ControlElement[];

  private _handleSlotChange(): void {
    this._reflectSlotProperties();
  }

  private _reflectSlotProperties(): void {
    const isError = !this.disabled && !!this.error;
    for (const control of this._controls) {
      control.disabled = !!this.disabled;
      control.required = !!this.required;
      control.error = isError;
    }

    for (const item of this._textareas) {
      item.counter = this.textareaCounter;
    }
  }

  override render() {
    const isHelper = this.helper && !this.error;
    const isError = !this.disabled && !!this.error;

    return html`<fieldset class="content" ?disabled=${this.disabled}>
      <label class="flex flex-col justify-center w-max font-daikinSerif">
        ${this.label
          ? html`<span
              class=${cvaLabel({
                required: this.required,
              })}
            >
              ${this.label}
            </span>`
          : nothing}
        <slot @slotchange=${this._handleSlotChange}></slot>
        <div
          class=${cvaHelperAndErrorContainer({
            visible: isHelper || isError,
          })}
        >
          ${isHelper
            ? html`<span
                class=${cvaHelper({
                  disabled: this.disabled,
                })}
              >
                ${this.helper}
              </span>`
            : nothing}
          <div class="flex items-center gap-1 h-max">
            ${isError
              ? html`<daikin-icon icon="error"></daikin-icon>`
              : nothing}
            <span
              class="text-[--input-group-border-color-error] text-sm font-bold leading-5"
              aria-live="polite"
            >
              ${isError ? this.error : ""}
            </span>
          </div>
        </div>
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
