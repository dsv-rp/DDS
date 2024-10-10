import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const TOGGLE_CLASS_NAME = cva([
  "w-12",
  "h-6",
  "relative",
  "bg-daikinNeutral-600",
  "rounded-full",
  "cursor-pointer",
  "transition-colors",
  "duration-300",
  "appearance-none",
  "enabled:hover:bg-daikinNeutral-400",
  "enabled:active:bg-daikinNeutral-700",
  "focus-visible:outline",
  "focus-visible:outline-1",
  "focus-visible:outline-offset-1",
  "focus-visible:outline-daikinBlue-700",

  "enabled:checked:bg-daikinBlue-500",
  "enabled:checked:hover:bg-daikinBlue-300",
  "enabled:checked:active:bg-daikinBlue-600",
  "disabled:bg-daikinNeutral-200",
  "disabled:cursor-default",

  "before:size-4",
  "before:m-auto",
  "before:rounded-full",
  "before:absolute",
  "before:top-0",
  "before:bottom-0",
  "before:left-1",
  "before:transition",
  "before:duration-300",
  "before:checked:translate-x-6",
  "enabled:before:bg-white",
  "disabled:before:bg-daikinNeutral-100",
])();

/**
 * The toggle switch component is a UI element that allows users to switch between two states, typically "on" and "off".
 * It functions similarly to a `daikin-checkbox` component but provides a more visually intuitive way to represent binary options.
 * This component is ideal for scenarios where the binary choice has a significant or immediate effect, such as enabling or disabling a feature or setting.
 * Unlike `daikin-checkbox`, this component doesn't have a label and a "indeterminate" state.
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<input type="checkbox">` element.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/toggle/index.js";
 * ```
 *
 * ```html
 * <daikin-toggle name="name" value="value"></daikin-toggle>
 * ```
 */
@customElement("daikin-toggle")
export class DaikinToggle extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-flex;
    }
  `;

  /**
   * Form name of the toggle switch.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Form value of the toggle switch.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Whether the toggle switch is turned on.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Whether the toggle switch is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  static readonly formAssociated = true;

  // Define _internals to let the toggle switch can be used in a form.
  private _internals = this.attachInternals();

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  private _handleChange(event: Event) {
    // DDS-1317 To ensure `event.target.checked` has the correct value, we have to update `this.checked` before emitting the "change" event.
    this.checked = (event.target as HTMLInputElement).checked;
    this._updateFormValue();
    this.dispatchEvent(new Event("change", event));
  }

  override render() {
    return html`<input
      class=${TOGGLE_CLASS_NAME}
      type="checkbox"
      name=${this.name}
      value=${this.value}
      .checked=${this.checked}
      ?disabled=${this.disabled}
      @change=${this._handleChange}
    />`;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("checked")) {
      this._updateFormValue();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-toggle": DaikinToggle;
  }
}
