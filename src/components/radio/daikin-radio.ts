import { cva } from "class-variance-authority";
import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const RADIO_CLASS_NAME = cva([
  "flex",
  "justify-center",
  "items-center",
  "size-4",
  "bg-white",
  "border-2",
  "border-daikinNeutral-600",
  "rounded-full",
  "relative",
  "appearance-none",
  "before:block",
  "before:size-1.5",
  "before:rounded-full",
  "before:absolute",
  "enabled:unchecked:group-hover:before:bg-daikinNeutral-100",
  "enabled:unchecked:group-active:before:bg-daikinNeutral-200",
  "focus-visible:outline",
  "focus-visible:outline-1",
  "focus-visible:outline-offset-1",
  "focus-visible:outline-daikinBlue-700",
  "checked:border-[5px]",
  "enabled:checked:border-daikinBlue-500",
  "enabled:checked:group-hover:border-daikinBlue-300",
  "enabled:checked:group-active:border-daikinBlue-600",
  "disabled:border-daikinNeutral-200",
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
 * The radio button component is a UI element that allows users to select one options from a set of choices.
 * It functions similarly to the HTML `<input type="radio">` tag. \
 * Please note that **a radio group component is not yet available**, so you'll need to manually group radio buttons when using multiple instances.
 *
 * @fires change - A cloned event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<input type="radio">` element.
 *
 * @example
 *
 * ```html
 *  <daikin-radio name="name" value="value" label="Radio button label"></daikin-radio>
 * ```
 */
@customElement("daikin-radio")
export class DaikinRadio extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
    }
  `;

  /**
   * The form name
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * The form value
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Specify the label text for the radio
   */
  @property({ type: String })
  label = "";

  /**
   * Specify the label position.
   * - `right` (default): The label will be placed to the right of the radio button.
   * - `hidden`: The label will not be shown.
   */
  @property({ type: String, attribute: "label-position" })
  labelPosition: "right" | "hidden" = "right";

  /**
   * Specify whether the radio is be checked
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * Specify whether the Radio should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  static readonly formAssociated = true;

  // define internals to let radio can be used in form
  private _internals = this.attachInternals();

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  private _handleClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
    }
  }

  private _handleChange(event: Event) {
    this.checked = (event.target as HTMLInputElement).checked;
    this._updateFormValue();
    this.dispatchEvent(new Event("change", event));
  }

  override render() {
    return html`<label class="group flex gap-2 items-center font-daikinSerif">
      <div class="p-2">
        <input
          class=${RADIO_CLASS_NAME}
          type="radio"
          name=${this.name}
          value=${this.value}
          aria-label=${this.labelPosition === "hidden" ? this.label : nothing}
          ?disabled=${this.disabled}
          .checked=${this.checked}
          @click=${this._handleClick}
          @change=${this._handleChange}
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

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("checked")) {
      this._updateFormValue();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-radio": DaikinRadio;
  }
}
