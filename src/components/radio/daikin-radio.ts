import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaRadio = cva(
  [
    "appearance-none",
    "relative",

    "after:absolute",
    "after:i-daikin-radio-unchecked",
    "checked:after:i-daikin-radio-checked",
    "enabled:after:text-[#8C8C8C]",
    "enabled:checked:after:text-daikinBlue-500",

    "aria-controllable:hover:after:i-daikin-radio-checked",
    "aria-controllable:hover:after:text-daikinBlue-300",
    "aria-controllable:active:after:i-daikin-radio-checked",
    "aria-controllable:active:after:text-daikinBlue-500",

    "focus-visible:outline-none",
    "aria-controllable:focus-visible:after:i-daikin-radio-unchecked",
    "aria-controllable:focus-visible:checked:after:i-daikin-radio-checked",
    "aria-controllable:focus-visible:after:text-daikinBlue-700",

    "disabled:after:text-daikinNeutral-200",
  ],
  {
    variants: {
      size: {
        small: ["w-[14px]", "h-[14px]"],
        large: ["w-4", "h-4"],
      },
    },
  }
);

const cvaLabel = cva(
  ["leading-8", "not-italic", "font-normal", "align-middle"],
  {
    variants: {
      size: {
        small: ["text-sm"],
        large: ["text-base"],
      },
    },
  }
);

type RadioVariantProps = MergeVariantProps<typeof cvaRadio | typeof cvaLabel>;

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

  private _handleClick(event: MouseEvent) {
    if (this.readonly || this.disabled) {
      event.preventDefault();
    }
  }

  static readonly formAssociated = true;

  // define internals to let radio can be used in form
  private _internals = this.attachInternals();

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has("checked")) {
      this._updateFormValue();
    }
  }

  private _handleChange(event: Event) {
    const input = this.shadowRoot?.querySelector("input") as HTMLInputElement;
    this.checked = input.checked;
    this._updateFormValue();
    const newEvent = new Event("change", event);
    this.dispatchEvent(newEvent);
  }

  /**
   * Specify the label text for the radio
   */
  @property({ type: String })
  label = "";

  /**
   * Specify the component size
   */
  @property({ type: String })
  size: RadioVariantProps["size"] = "small";

  /**
   * Specify the label position
   * when `left` the label will be in left of radio, when `right` label will be in right of radio
   */
  @property({ type: String, attribute: "label-position" })
  labelPosition: "left" | "right" = "right";

  /**
   * Specify whether the Radio should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify whether the radio is read only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Specify whether the radio is be checked
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * The form name.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * The form value.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Specify whether the Radio is in a error state
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  override render() {
    const labelClassName = cvaLabel({ size: this.size });
    const radioClassName = cvaRadio({ size: this.size });

    const labelText = this.label
      ? html`<span class="${labelClassName}">${this.label}</span>`
      : html``;

    const inputTag = html`<input
      class=${radioClassName}
      type="radio"
      name=${this.name}
      value=${this.value}
      aria-readonly=${this.readonly}
      ?disabled=${this.disabled}
      .checked=${this.checked}
      @click=${this._handleClick}
      @change=${this._handleChange}
    />`;

    const inputArea =
      this.labelPosition === "left"
        ? html`${labelText}${inputTag}`
        : html`${inputTag}${labelText}`;

    return html`<label
      class="inline-flex w-full h-full gap-[8px] items-center font-daikinSerif"
      >${inputArea}</label
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-radio": DaikinRadio;
  }
}
