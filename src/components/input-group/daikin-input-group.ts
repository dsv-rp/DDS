import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinTextField } from "../text-field/daikin-text-field";
import type { DaikinTextarea } from "../textarea/daikin-textarea";

type ControlElement = DaikinTextField | DaikinTextarea;

const cvaLabel = cva(["flex", "items-center", "font-bold", "leading-5"], {
  variants: {
    disabled: {
      false: [],
      true: ["text-[#BFBFBF]"],
    },
  },
});

const cvaHelper = cva(
  ["flex", "gap-1", "items-center", "leading-5", "text-sm"],
  {
    variants: {
      type: {
        helper: [],
        helperDisabled: ["text-[#BFBFBF]"],
        error: [
          "text-[#D80C18]",
          "font-bold",
          "before:size-4",
          "before:i-daikin-status-error",
        ],
        none: ["hidden"],
      },
    },
  }
);

/**
 * The input group component serves as a wrapper for a `daikin-text-field` or `daikin-textarea` component, providing additional elements such as labels, helper texts, or a counter.
 * It enhances the user experience by associating supplementary information or functionality directly with the input field.
 * This component is particularly useful for creating complex forms where clear communication and guidance are essential.
 *
 * Hierarchies:
 * - `daikin-input-group` > `daikin-text-field`
 * - `daikin-input-group` > `daikin-textarea`
 *
 * @slot - A slot for a input component. Place a `daikin-text-field` or `daikin-textarea` element here.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/input-group/index.js";
 * import "@daikin-oss/design-system-web-components/components/text-field/index.js";
 * import "@daikin-oss/design-system-web-components/components/textarea/index.js";
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
      width: 100%;
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
   * Error text displayed at the right of the label.
   * Ignored if `disabled` is `true`.
   * If `true`, an additional star mark will be displayed at the right of the label text.
   * Reflected in `required` attribute of the input control in the slot.
   */
  @property({ type: String, reflect: true })
  required = "";

  /**
   * Error text displayed at the top of the field.
   * Ignored if `disabled` is `true`.
   * Reflected in presence of `error` attribute of the input control in the slot.
   */
  @property({ type: String, reflect: true })
  error = "";

  /**
   * Whether the field is disabled.
   * Reflected in `disabled` attribute of the input control in the slot.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether to display the counter in the Textarea
   */
  @property({ type: Boolean, reflect: true })
  textareaCounter = false;

  @queryAssignedElements({ selector: "daikin-textarea" })
  private readonly _textareas!: readonly DaikinTextarea[];

  @queryAssignedElements({ selector: "daikin-text-field,daikin-textarea" })
  private readonly _controls!: readonly ControlElement[];

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
      <label
        class="flex flex-col justify-center gap-2 w-full text-[#414141] font-daikinSerif"
      >
        <div class="flex items-center gap-1 font-bold">
          <span class=${cvaLabel({ disabled: this.disabled })}>
            ${this.label}
          </span>
          ${this.required.length && !this.disabled
            ? html`<span class="text-[#D80C18] text-xs">${this.required}</span>`
            : nothing}
        </div>
        <span
          class=${cvaHelper({ type: helperType })}
          aria-live=${helperType === "error" ? "polite" : "off"}
        >
          ${helperText}
        </span>
        <slot @slotchange=${this._handleSlotChange}></slot>
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
