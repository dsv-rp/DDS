import { cva } from "class-variance-authority";
import { css, html, nothing, unsafeCSS } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import type { DaikinDropdown } from "../dropdown/daikin-dropdown";
import type { DaikinRadioGroup } from "../radio-group/daikin-radio-group";
import type { DaikinSelect } from "../select/daikin-select";
import type { DaikinTextArea } from "../text-area/daikin-text-area";
import type { DaikinTextField } from "../text-field/daikin-text-field";

type ControlElement =
  | DaikinDropdown
  | DaikinRadioGroup
  | DaikinSelect
  | DaikinTextField
  | DaikinTextArea;

const cvaLabel = cva(["flex", "items-center", "font-bold", "leading-[130%]"], {
  variants: {
    disabled: {
      false: [],
      true: ["text-ddt-color-common-disabled"],
    },
  },
});

const cvaHelper = cva(
  ["flex", "gap-1", "items-center", "leading-[130%]", "text-sm"],
  {
    variants: {
      type: {
        helper: ["text-ddt-color-common-text-secondary"],
        helperDisabled: ["text-ddt-color-common-disabled"],
        error: [
          "text-ddt-color-common-danger-default",
          "font-bold",
          "before:size-4",
          "before:i-daikin-status-error",
          "before:flex-none",
        ],
        textareaLimitExceedError: [
          "text-ddt-color-common-danger-default",
          "font-bold",
          "before:size-4",
          "before:i-daikin-status-error",
          "before:flex-none",
        ],
        none: ["hidden"],
      },
    },
  }
);

const cvaCounter = cva(["text-sm", "font-bold", "ml-auto"], {
  variants: {
    variant: {
      normal: ["text-ddt-color-common-text-secondary"],
      disabled: ["text-ddt-color-common-disabled"],
      error: ["text-ddt-color-common-danger-default"],
    },
  },
});

type HelperType = MergeVariantProps<typeof cvaHelper>["type"];

/**
 * The input group component serves as a wrapper for an input control component (full list below), providing additional elements such as label text, helper text, or a counter.
 * It enhances the user experience by associating supplementary information or functionality directly with the input field.
 * This component is particularly useful for creating complex forms where clear communication and guidance are essential.
 *
 * Hierarchies:
 * - `daikin-input-group` > `daikin-dropdown` > `daikin-dropdown-item`
 * - `daikin-input-group` > `daikin-radio-group` > `daikin-radio`
 * - `daikin-input-group` > `daikin-select`
 * - `daikin-input-group` > `daikin-text-area`
 * - `daikin-input-group` > `daikin-text-field`
 *
 * @slot - A slot for an input component. See **Hierarchies** for supported components.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/input-group/index.js";
 * <!-- Import the following as necessary. -->
 * import "@daikin-oss/design-system-web-components/components/dropdown/index.js";
 * import "@daikin-oss/design-system-web-components/components/dropdown-item/index.js";
 * import "@daikin-oss/design-system-web-components/components/radio/index.js";
 * import "@daikin-oss/design-system-web-components/components/radio-group/index.js";
 * import "@daikin-oss/design-system-web-components/components/select/index.js";
 * import "@daikin-oss/design-system-web-components/components/text-area/index.js";
 * import "@daikin-oss/design-system-web-components/components/text-field/index.js";
 * ```
 *
 * With Dropdown:
 *
 * ```html
 * <daikin-input-group>
 *   <daikin-dropdown>
 *     <daikin-dropdown-item value="value1">
 *       Dropdown item 1
 *     </daikin-dropdown-item>
 *     <daikin-dropdown-item value="value2">
 *       Dropdown item 2
 *     </daikin-dropdown-item>
 *     <daikin-dropdown-item value="value3">
 *       Dropdown item 3
 *     </daikin-dropdown-item>
 *   </daikin-dropdown>
 * </daikin-input-group>
 * ```
 *
 * With Radio Group:
 *
 * ```html
 * <daikin-input-group>
 *   <daikin-radio-group>
 *     <daikin-radio value="value1">Radio option 1</daikin-radio>
 *     <daikin-radio value="value2">Radio option 2</daikin-radio>
 *     <daikin-radio value="value3">Radio option 3</daikin-radio>
 *   </daikin-radio-group>
 * </daikin-input-group>
 * ```
 *
 * With Select:
 *
 * ```html
 * <daikin-input-group>
 *   <daikin-select>
 *     <select name="select">
 *       <option value="value1">Option 1</option>
 *       <option value="value2">Option 2</option>
 *       <option value="value3">Option 3</option>
 *     </select>
 *   </daikin-select>
 * </daikin-input-group>
 * ```
 *
 * With Text Field:
 *
 * ```html
 * <daikin-input-group>
 *   <daikin-text-field value="Content of Text Field"></daikin-text-field>
 * </daikin-input-group>
 * ```
 *
 * With TextArea:
 *
 * ```html
 * <daikin-input-group>
 *   <daikin-text-area value="Content of TextArea"></daikin-text-area>
 * </daikin-input-group>
 * ```
 * ```
 */
@ddsElement("daikin-input-group")
export class DaikinInputGroup extends DDSElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * Label text displayed at the top of the field.
   */
  @property({ type: String, reflect: true })
  label: string | null = null;

  /**
   * Helper text displayed at the top of the field.
   * If `error` is specified and `disabled` is `false`, that takes precedence and helper text is not displayed.
   */
  @property({ type: String, reflect: true })
  helper: string | null = null;

  /**
   * Text indicating that the field is required.
   * If a non-empty string is set,
   * - the text will be displayed in red to the right of the label, and
   * - the `required` attribute will be set for the input control in the slot.
   * Ignored if `disabled` is `true`.
   */
  @property({ type: String, reflect: true })
  required: string | null = null;

  /**
   * Error text displayed at the top of the field.
   * Ignored if `disabled` is `true`.
   * Reflected in presence of `error` attribute of the input control in the slot.
   */

  @property({ type: String, reflect: true })
  error: string | null = null;

  /**
   * Whether the field is disabled.
   * Reflected in `disabled` attribute of the input control in the slot.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The maximum number of characters that can be input into the text area.
   * If set, a counter will be displayed at the bottom of the text area.
   * Users can enter more characters than the limit, but in that case the counter will turn red and an error message will be displayed (if specified) to indicate that the limit has been exceeded.
   */
  @property({ type: Number, reflect: true, attribute: "textarea-max-count" })
  textareaMaxCount: number | null = null;

  /**
   * An error message displayed when the number of characters in the text area exceeds the limit (optional).
   * When the number of characters in the text area exceeds the limit, this is displayed below the label by overriding `helper` and `error`.
   * Only used when a text area is assigned to a slot and `textareaMaxCount` is set.
   */
  @property({
    type: String,
    reflect: true,
    attribute: "textarea-limit-exceed-error",
  })
  textareaLimitExceedError: string | null = null;

  @queryAssignedElements({ selector: "daikin-text-area" })
  private readonly _textareas!: readonly DaikinTextArea[];

  @queryAssignedElements({
    selector:
      "daikin-dropdown,daikin-radio-group,daikin-select,daikin-text-field,daikin-text-area",
  })
  private readonly _controls!: readonly ControlElement[];

  @state()
  private _textareaCount: number | null = null;

  get textareaLimitExceeded(): boolean {
    return (
      this.textareaMaxCount != null &&
      this._textareaCount != null &&
      this.textareaMaxCount < this._textareaCount
    );
  }

  private _handleSlotChange(): void {
    this._reflectSlotProperties();

    const textarea = this._textareas[0] as DaikinTextArea | undefined;
    this._textareaCount = textarea?.count ?? null;
  }

  private _handleInput(event: Event): void {
    // Update counter if emitted by textarea.
    if ((event.target as HTMLElement).tagName === "DAIKIN-TEXT-AREA") {
      this._textareaCount = (event.target as DaikinTextArea).count;
    }
  }

  private _reflectSlotProperties(): void {
    for (const control of this._controls) {
      control.reflectInputGroup(this);
    }
  }

  override render() {
    // Priority: Error -> Helper -> None
    // The error text is not displayed when disabled.
    const helperTextVariant: HelperType = (() => {
      if (
        this.textareaLimitExceeded &&
        !!this.textareaLimitExceedError &&
        !this.disabled
      ) {
        return "textareaLimitExceedError";
      } else if (!!this.error && !this.disabled) {
        return "error";
      } else if (!!this.helper && this.disabled) {
        return "helperDisabled";
      } else if (this.helper) {
        return "helper";
      } else {
        return "none";
      }
    })();

    const helperText = {
      helper: this.helper,
      helperDisabled: this.helper,
      error: this.error,
      textareaLimitExceedError: this.textareaLimitExceedError,
      none: "",
    }[helperTextVariant];

    return html`<fieldset class="content" ?disabled=${this.disabled}>
      <label
        class="flex flex-col justify-center gap-2 w-full text-ddt-color-common-text-primary font-daikinSerif"
      >
        <div class="flex items-center flex-wrap gap-1 font-bold">
          ${this.label
            ? html`<span class=${cvaLabel({ disabled: this.disabled })}>
                ${this.label}
              </span>`
            : nothing}
          ${this.required && !this.disabled
            ? html`<span class="text-ddt-color-common-danger-default text-xs">
                ${this.required}
              </span>`
            : nothing}
        </div>
        <span
          class=${cvaHelper({ type: helperTextVariant })}
          aria-live=${helperTextVariant === "error" ? "polite" : "off"}
        >
          ${helperText}
        </span>
        <slot
          @slotchange=${this._handleSlotChange}
          @input=${this._handleInput}
        ></slot>
        ${this.textareaMaxCount != null && this._textareaCount != null
          ? html`<span
              class=${cvaCounter({
                variant: this.disabled
                  ? "disabled"
                  : this.textareaLimitExceeded
                    ? "error"
                    : "normal",
              })}
              >${this._textareaCount}/${this.textareaMaxCount}</span
            >`
          : nothing}
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
