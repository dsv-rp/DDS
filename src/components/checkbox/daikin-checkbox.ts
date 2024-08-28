import { cva } from "class-variance-authority";
import {
  css,
  html,
  LitElement,
  nothing,
  unsafeCSS,
  type PropertyValues,
} from "lit";
import { customElement, property, query } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaContainer = cva(
  ["flex", "gap-2.5", "items-center", "font-daikinSerif"],
  {
    variants: {
      labelPosition: {
        left: ["[&>span]:order-1", "[&>input]:order-2"],
        right: ["[&>span]:order-2", "[&>input]:order-1"],
        hidden: [],
      },
    },
  }
);

const cvaCheckbox = cva([
  "inline-block",
  "size-[18px]",
  "relative",
  "border-daikinNeutral-600",
  "border-2",
  "rounded-sm",
  "appearance-none",
  "before:absolute",
  "before:text-white",
  "before:i-daikin-checkbox-checked",
  "indeterminate:before:i-daikin-checkbox-indeterminate",

  "aria-controllable:hover:before:text-daikinNeutral-100",
  "aria-controllable:active:before:text-daikinNeutral-200",
  "aria-controllable:focus-visible:outline-daikinBlue-700",
  "focus-visible:outline-none",
  "aria-controllable:focus-visible:outline-1",
  "aria-controllable:focus-visible:outline-offset-1",

  "aria-controllable:checked:border-daikinBlue-500",
  "aria-controllable:checked:bg-daikinBlue-500",
  "aria-controllable:checked:hover:bg-daikinBlue-300",
  "aria-controllable:checked:hover:border-daikinBlue-300",
  "aria-controllable:checked:hover:before:text-white",
  "aria-controllable:checked:active:bg-daikinBlue-600",
  "aria-controllable:checked:active:border-daikinBlue-600",
  "aria-controllable:checked:active:before:text-white",

  "aria-controllable:indeterminate:bg-daikinBlue-500",
  "aria-controllable:indeterminate:border-daikinBlue-500",
  "aria-controllable:indeterminate:hover:bg-daikinBlue-300",
  "aria-controllable:indeterminate:hover:border-daikinBlue-300",
  "aria-controllable:indeterminate:hover:before:text-white",
  "aria-controllable:indeterminate:active:bg-daikinBlue-600",
  "aria-controllable:indeterminate:active:border-daikinBlue-600",
  "aria-controllable:indeterminate:active:before:text-white",

  "disabled:border-daikinNeutral-200",
  "disabled:bg-white",
  "disabled:checked:bg-daikinNeutral-200",
  "disabled:indeterminate:bg-daikinNeutral-200",
]);

type CheckboxVariantProps = MergeVariantProps<typeof cvaContainer>;

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
      width: max-content;
      height: max-content;
    }
  `;

  private _handleClick(event: PointerEvent) {
    if (this.disabled) {
      event.preventDefault();
    }
  }

  static readonly formAssociated = true;

  // define _internals to let checkbox can be used in form
  private _internals = this.attachInternals();

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  @query("input")
  private _input: HTMLInputElement | null | undefined;

  get checked() {
    return this.checkState === "checked";
  }

  private _handleChange(event: Event) {
    if (!this._input) {
      return;
    }
    this.checkState = this._input.checked ? "checked" : "unchecked";
    this._updateFormValue();
    this.dispatchEvent(new Event("change", event));
  }

  /**
   * Specify the label text for check box
   */
  @property({ type: String })
  label = "";

  /**
   * Specify the label position
   * when `left` the label will be in left of checkbox, when `right` label will be in right of checkbox
   */
  @property({ type: String, attribute: "label-position" })
  labelPosition: CheckboxVariantProps["labelPosition"] = "right";

  /**
   * Specify whether the Checkbox should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify whether the checkbox is be checked
   */
  @property({ type: String, reflect: true, attribute: "check-state" })
  checkState: "unchecked" | "indeterminate" | "checked" = "unchecked";

  /**
   * The form name.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * The value.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Specify whether the Checkbox is in a error state
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  override render() {
    return html`<label
      class=${cvaContainer({ labelPosition: this.labelPosition })}
    >
      <input
        class=${cvaCheckbox()}
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
      ${this.labelPosition === "hidden"
        ? nothing
        : html`<span class="text-base">${this.label}</span>`}
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
