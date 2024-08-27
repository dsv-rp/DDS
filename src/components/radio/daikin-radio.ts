import { cva } from "class-variance-authority";
import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaContainer = cva(
  ["flex", "gap-2", "items-center", "font-daikinSerif"],
  {
    variants: {
      labelPosition: {
        left: ["[&>span]:order-1", "[&>input]:order-2"],
        right: ["[&>span]:order-2", "[&>input]:order-1"],
      },
    },
  }
);

const cvaRadio = cva([
  "flex",
  "justify-center",
  "items-center",
  "size-4",
  "bg-white",
  "border-[1.5px]",
  "border-daikinNeutral-600",
  "rounded-full",
  "relative",
  "appearance-none",
  "aria-controllable:hover:before:content-normal",
  "aria-controllable:hover:before:block",
  "aria-controllable:hover:before:size-1.5",
  "aria-controllable:hover:before:rounded-full",
  "aria-controllable:hover:before:absolute",
  "aria-controllable:hover:before:bg-daikinNeutral-100",
  "aria-controllable:active:before:content-normal",
  "aria-controllable:active:before:block",
  "aria-controllable:active:before:size-1.5",
  "aria-controllable:active:before:rounded-full",
  "aria-controllable:active:before:absolute",
  "aria-controllable:active:before:bg-daikinNeutral-100",
  "aria-controllable:checked:hover:before:hidden",
  "focus-visible:outline-1",
  "focus-visible:outline-offset-[3px]",
  "focus-visible:outline-daikinBlue-700",
  "checked:border-[5px]",
  "checked:border-daikinBlue-500",
  "disabled:border-daikinNeutral-200",
]);

type RadioVariantProps = MergeVariantProps<typeof cvaContainer>;

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
   * Specify the label position
   * when `left` the label will be in left of radio, when `right` label will be in right of radio
   */
  @property({ type: String, attribute: "label-position" })
  labelPosition: RadioVariantProps["labelPosition"] = "right";

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
    return html`<label
      class=${cvaContainer({ labelPosition: this.labelPosition })}
    >
      <input
        class=${cvaRadio()}
        type="radio"
        name=${this.name}
        value=${this.value}
        aria-readonly=${this.readonly}
        ?disabled=${this.disabled}
        .checked=${this.checked}
        @click=${this._handleClick}
        @change=${this._handleChange}
      />
      ${this.label
        ? html`<span class="text-base">${this.label}</span>`
        : nothing}
    </label>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-radio": DaikinRadio;
  }
}
