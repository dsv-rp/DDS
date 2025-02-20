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
import type { DaikinCheckboxGroup } from "../checkbox-group/daikin-checkbox-group";

const CHECKBOX_CLASS_NAME = cva([
  "block",
  "size-4",
  "border-ddt-color-common-neutral-default",
  "border-2",
  "rounded-sm",
  "relative",
  "appearance-none",

  "before:text-ddt-color-common-text-inverse",
  "before:absolute",
  "before:m-auto",
  "before:inset-0",
  "checked:before:i-daikin-checkbox-checked",
  "checked:before:size-3",
  "indeterminate:before:i-daikin-checkbox-indeterminate",
  "indeterminate:before:size-2.5",

  "focus-visible:outline",
  "focus-visible:outline-2",
  "focus-visible:outline-offset-2",
  "focus-visible:outline-ddt-color-common-border-focus",

  "enabled:group-hover:border-ddt-color-common-neutral-hover",
  "enabled:group-hover:bg-ddt-color-common-surface-hover",
  "enabled:group-active:border-ddt-color-common-neutral-press",
  "enabled:group-active:bg-ddt-color-common-surface-press",

  "enabled:checked:border-ddt-color-common-brand-default",
  "enabled:checked:bg-ddt-color-common-brand-default",
  "enabled:checked:group-hover:bg-ddt-color-common-brand-hover",
  "enabled:checked:group-hover:border-ddt-color-common-brand-hover",
  "enabled:checked:group-hover:before:text-ddt-color-common-text-inverse",
  "enabled:checked:group-active:bg-ddt-color-common-brand-press",
  "enabled:checked:group-active:border-ddt-color-common-brand-press",
  "enabled:checked:group-active:before:text-ddt-color-common-text-inverse",

  "enabled:indeterminate:bg-ddt-color-common-brand-default",
  "enabled:indeterminate:border-ddt-color-common-brand-default",
  "enabled:indeterminate:group-hover:bg-ddt-color-common-brand-hover",
  "enabled:indeterminate:group-hover:border-ddt-color-common-brand-hover",
  "enabled:indeterminate:group-hover:before:text-ddt-color-common-text-inverse",
  "enabled:indeterminate:group-active:bg-ddt-color-common-brand-press",
  "enabled:indeterminate:group-active:border-ddt-color-common-brand-press",
  "enabled:indeterminate:group-active:before:text-ddt-color-common-text-inverse",

  "disabled:border-ddt-color-common-disabled",
  "disabled:bg-ddt-color-common-text-inverse",
  "disabled:checked:bg-ddt-color-common-disabled",
  "disabled:indeterminate:bg-ddt-color-common-disabled",
])();

const cvaLabel = cva([], {
  variants: {
    disabled: {
      false: ["text-ddt-color-common-text-primary"],
      true: ["text-ddt-color-common-disabled"],
    },
    hidden: {
      false: ["inline-block", "pr-2"],
      true: ["hidden"],
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
   * The form name, submitted as a name/value pair when submitting the form.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * The form value, submitted as a name/value pair when submitting the form.
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
   * Specify the checkbox checked state.
   */
  @property({ type: String, reflect: true, attribute: "check-state" })
  checkState: "unchecked" | "indeterminate" | "checked" = "unchecked";

  /**
   * Specify the checkbox disabled state.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify the checkbox disabled state controlled by the parent component.
   * Controlled by `daikin-checkbox-group`.
   *
   * @private
   */
  @property({ type: Boolean, reflect: true, attribute: false })
  disabledByParent = false;

  get checked(): boolean {
    return this.checkState === "checked";
  }

  private get _labelHidden(): boolean {
    return this.labelPosition === "hidden";
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

    // Prevent click event from being emitted twice.
    // https://stackoverflow.com/q/24501497
    if ((event.target as HTMLElement | null)?.tagName !== "INPUT") {
      event.stopPropagation();
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
    const disable = this.disabled || this.disabledByParent;
    // We have to attach event listener to the root element instead of `this` to access non-encapsulated `event.target`.
    // eslint-disable-next-line lit-a11y/click-events-have-key-events -- We're listening to "click" event only for suppressing purposes.
    return html`<label
      class="group flex gap-2 items-center size-full font-daikinSerif"
      @click=${this._handleClick}
    >
      <span class="p-2">
        <input
          class=${CHECKBOX_CLASS_NAME}
          type="checkbox"
          name=${this.name}
          ?disabled=${disable}
          aria-label=${this._labelHidden ? this.label : nothing}
          .checked=${this.checked}
          .indeterminate=${this.checkState === "indeterminate"}
          .value=${this.value}
          @change=${this._handleChange}
        />
      </span>
      <slot
        class=${cvaLabel({
          disabled: disable,
          hidden: this._labelHidden,
        })}
        ?hidden=${this._labelHidden}
      >
        ${this.label}
      </slot>
    </label>`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("checkState")) {
      this._updateFormValue();
    }
  }

  /**
   * This function expose to `daikin-checkbox-group` and reflect it's attributes to `daikin-checkbox`.
   * @ignore
   */
  reflectInputGroup(inputGroup: DaikinCheckboxGroup): void {
    this.disabledByParent = inputGroup.disabled;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-checkbox": DaikinCheckbox;
  }
}
