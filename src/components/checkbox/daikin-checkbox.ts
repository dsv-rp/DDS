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
  "border-system-state-neutral-active",
  "border-2",
  "rounded-sm",
  "relative",
  "appearance-none",

  "before:text-system-element-text-inverse",
  "before:absolute",
  "before:m-auto",
  "before:inset-0",
  "checked:before:i-daikin-checkbox-checked",
  "indeterminate:before:i-daikin-checkbox-indeterminate",
  "indeterminate:before:size-2.5",

  "focus-visible:outline",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-system-state-focus",

  "enabled:group-hover:border-system-state-neutral-hover",
  "enabled:group-hover:bg-system-background-surface-hover",
  "enabled:group-active:border-system-state-neutral-press",
  "enabled:group-active:bg-system-background-surface-press",

  "enabled:checked:border-system-state-primary-active",
  "enabled:checked:bg-system-state-primary-active",
  "enabled:checked:group-hover:bg-system-state-primary-hover",
  "enabled:checked:group-hover:border-system-state-primary-hover",
  "enabled:checked:group-hover:before:text-system-element-text-inverse",
  "enabled:checked:group-active:bg-system-state-primary-press",
  "enabled:checked:group-active:border-system-state-primary-press",
  "enabled:checked:group-active:before:text-system-element-text-inverse",

  "enabled:indeterminate:bg-system-state-primary-active",
  "enabled:indeterminate:border-system-state-primary-active",
  "enabled:indeterminate:group-hover:bg-system-state-primary-hover",
  "enabled:indeterminate:group-hover:border-system-state-primary-hover",
  "enabled:indeterminate:group-hover:before:text-system-element-text-inverse",
  "enabled:indeterminate:group-active:bg-system-state-primary-press",
  "enabled:indeterminate:group-active:border-system-state-primary-press",
  "enabled:indeterminate:group-active:before:text-system-element-text-inverse",

  "disabled:border-system-state-disabled",
  "disabled:bg-system-element-text-inverse",
  "disabled:checked:bg-system-state-disabled",
  "disabled:indeterminate:bg-system-state-disabled",
])();

const cvaLabel = cva(["pr-2"], {
  variants: {
    disabled: {
      false: ["text-system-element-text-primary"],
      true: ["text-system-state-disabled"],
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
 * ```js
 * import "@daikin-oss/design-system-web-components/components/checkbox/index.js";
 * ```
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
   * Form name of the checkbox.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Form value of the checkbox.
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

  // define _internals to let the checkbox can be used in a form
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
      <span class="p-2">
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
      </span>
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
