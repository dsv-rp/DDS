import { cva } from "class-variance-authority";
import {
  css,
  html,
  LitElement,
  nothing,
  unsafeCSS,
  type PropertyValues,
} from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const CHECKBOX_CLASS_NAME = cva([
  "block",
  "size-4",
  "relative",
  "border-daikinNeutral-600",
  "border-2",
  "rounded-sm",
  "appearance-none",
  "before:absolute",
  "before:text-white",
  "before:i-daikin-checkbox-checked",
  "indeterminate:before:i-daikin-checkbox-indeterminate",

  "enabled:group-hover:before:text-daikinNeutral-100",
  "enabled:group-active:before:text-daikinNeutral-200",
  "focus-visible:outline",
  "focus-visible:outline-1",
  "focus-visible:outline-offset-1",
  "focus-visible:outline-daikinBlue-700",

  "enabled:checked:border-daikinBlue-500",
  "enabled:checked:bg-daikinBlue-500",
  "enabled:checked:group-hover:bg-daikinBlue-300",
  "enabled:checked:group-hover:border-daikinBlue-300",
  "enabled:checked:group-hover:before:text-white",
  "enabled:checked:group-active:bg-daikinBlue-600",
  "enabled:checked:group-active:border-daikinBlue-600",
  "enabled:checked:group-active:before:text-white",

  "enabled:indeterminate:bg-daikinBlue-500",
  "enabled:indeterminate:border-daikinBlue-500",
  "enabled:indeterminate:group-hover:bg-daikinBlue-300",
  "enabled:indeterminate:group-hover:border-daikinBlue-300",
  "enabled:indeterminate:group-hover:before:text-white",
  "enabled:indeterminate:group-active:bg-daikinBlue-600",
  "enabled:indeterminate:group-active:border-daikinBlue-600",
  "enabled:indeterminate:group-active:before:text-white",

  "disabled:border-daikinNeutral-200",
  "disabled:bg-white",
  "disabled:checked:bg-daikinNeutral-200",
  "disabled:indeterminate:bg-daikinNeutral-200",
])();

const cvaLabel = cva([], {
  variants: {
    disabled: {
      false: [],
      true: ["text-daikinNeutral-200"],
    },
  },
});

/**
 * The checkbox component is a UI element that allows users to select one or more options from a list of choices.
 * It functions similarly to the HTML `<input type="checkbox">` tag, enabling users to toggle the selection of each option independently.
 * This component is ideal for cases where multiple selections are allowed or required.
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<input type="checkbox">` element.
 *
 * @example
 *
 * ```html
 * <daikin-checkbox label="Checkbox label" name="name" value="value"></daikin-checkbox>
 * ```
 */
@customElement("daikin-checkbox")
export class DaikinCheckbox extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-flex;
    }
  `;

  /**
   * Form name of the checkbox
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Form value of the checkbox
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Label text for the checkbox.
   */
  @property({ type: String })
  label = "";

  /**
   * Label position.
   * - `right` (default): The label will be placed to the right of the checkbox.
   * - `hidden`: The label will not be shown.
   */
  @property({ type: String, attribute: "label-position" })
  labelPosition: "right" | "hidden" = "right";

  /**
   * Checked state of the checkbox.
   */
  @property({ type: String, reflect: true, attribute: "check-state" })
  checkState: "unchecked" | "indeterminate" | "checked" = "unchecked";

  /**
   * Whether the checkbox is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  get checked(): boolean {
    return this.checkState === "checked";
  }

  /**
   * A property-only accessor for `checkState` provided for convenience.
   * _Getter_: Returns `true` when `checkState` is `"checked"`, and `false` otherwise.
   * _Setter_: If `true` is set, it updates `checkState` to `"checked"`, and if `false` is set, it updates `checkState` to `"unchecked"`.
   */
  set checked(value: boolean) {
    this.checkState = value ? "checked" : "unchecked";
  }

  static readonly formAssociated = true;

  // define _internals to let checkbox can be used in form
  private _internals = this.attachInternals();

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  private _handleClick(event: PointerEvent) {
    if (this.disabled) {
      event.preventDefault();
    }
  }

  private _handleChange(event: Event) {
    this.checkState = (event.target as HTMLInputElement).checked
      ? "checked"
      : "unchecked";
    this._updateFormValue();
    this.dispatchEvent(new Event("change", event));
  }

  override render() {
    return html`<label class="group flex gap-2 items-center font-daikinSerif">
      <div class="p-2">
        <input
          class=${CHECKBOX_CLASS_NAME}
          type="checkbox"
          name=${this.name}
          value=${this.value}
          aria-label=${this.labelPosition === "hidden" ? this.label : nothing}
          .indeterminate=${this.checkState === "indeterminate"}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          @change=${this._handleChange}
          @click=${this._handleClick}
        />
      </div>
      <span
        class=${cvaLabel({
          disabled: this.disabled,
        })}
        ?hidden=${this.labelPosition === "hidden"}
      >
        ${this.label}
      </span>
    </label>`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("checkState")) {
      this._updateFormValue();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-checkbox": DaikinCheckbox;
  }
}
