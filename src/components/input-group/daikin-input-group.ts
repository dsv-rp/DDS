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

const cvaHelper = cva(
  ["flex", "gap-1", "items-center", "leading-5", "text-sm"],
  {
    variants: {
      type: {
        helper: ["text-daikinNeutral-800"],
        helperDisabled: ["text-daikinNeutral-200"],
        error: [
          "text-daikinRed-500",
          "font-bold",
          "before:size-4",
          "before:i-daikin-status-error",
        ],
        none: ["hidden"],
      },
    },
  }
);

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
   * Label text displayed at the top of the field.
   */
  @property({ type: String })
  label = "";

  /**
   * Helper text displayed at the top of the field.
   * If `error` is specified and `disabled` is `false`, that takes precedence and helper text is not displayed.
   */
  @property({ type: String })
  helper = "";

  /**
   * Whether the field is disabled.
   * Reflected in `disabled` attribute of the input control in the slot.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the field is required.
   * If `true`, an additional star mark will be displayed at the right of the label text.
   * Reflected in `required` attribute of the input control in the slot.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Error text displayed at the bottom of the field.
   * Ignored if `disabled` is `true`.
   * Reflected in presence of `error` attribute of the input control in the slot.
   */
  @property({ type: String, reflect: true })
  error = "";

  /**
   * Maximum value to display on the counter. When `null`, the counter will be hidden.
   */
  @property({ type: Number, reflect: true, attribute: "textarea-max-count" })
  textareaMaxCount: number | null = null;

  @queryAssignedElements({ selector: "daikin-textarea" })
  _textareas!: DaikinTextarea[];

  @queryAssignedElements({ selector: "daikin-text-input,daikin-textarea" })
  _controls!: ControlElement[];

  @state()
  _hasTextarea = false;

  @state()
  _textareaValueLength = 0;

  private _handleSlotChange(): void {
    this._reflectSlotProperties();

    const textarea = this._textareas[0] as DaikinTextarea | undefined;

    if (textarea) {
      this._hasTextarea = true;
      this._textareaValueLength = textarea.value.length;
    } else {
      this._hasTextarea = false;
    }
  }

  private _handleChangeCount(e: CustomEvent<{ count: number }>): void {
    this._textareaValueLength = e.detail.count;
  }

  private _reflectSlotProperties(): void {
    const isError = !this.disabled && !!this.error;
    for (const control of this._controls) {
      control.disabled = !!this.disabled;
      control.required = !!this.required;
      control.error = isError;
    }
  }

  override render() {
    // Priority: Error -> Helper -> None
    // The error text is not displayed when disabled.
    const helperType =
      this.error.length && !this.disabled
        ? "error"
        : this.helper.length
          ? this.disabled
            ? "helperDisabled"
            : "helper"
          : "none";

    const helperText = {
      error: this.error,
      helper: this.helper,
      helperDisabled: this.helper,
      none: "",
    }[helperType];

    return html`<fieldset class="content" ?disabled=${this.disabled}>
      <label class="flex flex-col justify-center gap-2 w-max font-daikinSerif">
        <div class="flex justify-between items-center gap-2">
          <span
            class=${cvaLabel({
              required: this.required,
            })}
          >
            ${this.label}
          </span>
          ${!!this.textareaMaxCount && !!this._hasTextarea
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
        ${this.required ? html`<span class="sr-only">required</span>` : nothing}
        <slot
          @slotchange=${this._handleSlotChange}
          @change-count=${this._handleChangeCount}
        ></slot>
        <span
          class=${cvaHelper({ type: helperType })}
          aria-live=${helperType === "error" ? "polite" : "off"}
        >
          ${helperText}
        </span>
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
