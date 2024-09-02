import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import "../icon/daikin-icon";
import type { DaikinTextInput } from "../text-input/daikin-text-input";
import type { DaikinTextarea } from "../textarea/daikin-textarea";

type ControlElement = DaikinTextInput | DaikinTextarea;

const cvaLabel = cva(["flex", "items-center", "font-bold", "leading-5"], {
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
});

const cvaCounter = cva(["text-xs"], {
  variants: {
    disabled: {
      false: [],
      true: ["text-[--text-input-outline-color-disabled]"],
    },
  },
});

const cvaCounterValueLength = cva([], {
  variants: {
    error: {
      false: [],
      true: ["text-daikinRed-500"],
    },
  },
});

const cvaHelper = cva(["h-[22px]", "text-sm"], {
  variants: {
    disabled: {
      false: ["text-daikinNeutral-800"],
      true: ["text-daikinNeutral-200"],
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
   * Maximum value to display on the counter. When `null`, the counter will be hidden.
   */
  @property({ type: Number, reflect: true })
  textareaMaxCount: number | null = null;

  @queryAssignedElements({ selector: "daikin-textarea" })
  _textareas!: DaikinTextarea[];

  @queryAssignedElements({ selector: "daikin-text-input,daikin-textarea" })
  _controls!: ControlElement[];

  @state()
  _isTextarea: boolean = false;

  @state()
  _textareaValueLength: number = 0;

  private _handleSlotChange(): void {
    this._reflectSlotProperties();

    const textarea = this._textareas[0] as DaikinTextarea | undefined;

    if (textarea) {
      this._isTextarea = true;
      this._textareaValueLength = textarea.value.length;
    } else {
      this._isTextarea = false;
    }
  }

  private _handleChangeCount(
    e: Event & { detail: { valueCount: number } }
  ): void {
    this._textareaValueLength = e.detail.valueCount;
  }

  private _reflectSlotProperties(): void {
    const isError = !this.disabled && !!this.error;
    for (const control of this._controls) {
      control.disabled = !!this.disabled;
      control.error = isError;
    }
  }

  override render() {
    return html`<fieldset class="content" ?disabled=${this.disabled}>
      <label class="flex flex-col justify-center w-max gap-1 font-daikinSerif">
        <div class="flex justify-between items-center gap-2">
          ${this.label
            ? html`<span
                class=${cvaLabel({
                  required: this.required,
                })}
              >
                ${this.label}
              </span>`
            : null}
          ${!!this.textareaMaxCount && !!this._isTextarea
            ? html`
                <span
                  class=${cvaCounter({
                    disabled: this.disabled,
                  })}
                >
                  <span
                    class=${cvaCounterValueLength({
                      error: this.textareaMaxCount < this._textareaValueLength,
                    })}
                    >${this._textareaValueLength}</span
                  ><span>/</span><span>${this.textareaMaxCount}</span>
                </span>
              `
            : nothing}
        </div>
        <slot
          @slotchange=${this._handleSlotChange}
          @change-count=${this._handleChangeCount}
        ></slot>
        ${this.helper && !this.error
          ? html`<span
              class=${cvaHelper({
                disabled: this.disabled,
              })}
            >
              ${this.helper}
            </span>`
          : null}
        ${!this.disabled && !!this.error
          ? html`
              <div class="flex items-center gap-1">
                <daikin-icon icon="error"></daikin-icon>
                <span
                  class="text-[--input-group-border-color-error] text-sm font-bold leading-5"
                >
                  ${this.error}
                </span>
              </div>
            `
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
