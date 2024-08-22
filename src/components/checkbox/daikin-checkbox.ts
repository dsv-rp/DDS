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

const cvaCheckbox = cva(
  [
    "appearance-none",

    "inline-block",
    "relative",
    "rounded-sm",
    "border-solid",
    "border-2",

    "after:absolute",
    "after:text-white",

    "checked:after:i-daikin-checkbox-checked",
    "indeterminate:after:i-daikin-checkbox-indeterminate",

    "focus-visible:outline-none",

    "border-daikinNeutral-400",

    "enabled:indeterminate:border-daikinBlue-600",
    "enabled:indeterminate:bg-daikinBlue-600",

    "enabled:checked:border-daikinBlue-600",
    "enabled:checked:bg-daikinBlue-600",

    "aria-controllable:focus-visible:border-daikinBlue-700",
    "aria-controllable:hover:border-daikinBlue-300",
    "aria-controllable:active:border-daikinBlue-600",

    "aria-controllable:checked:focus-visible:border-daikinBlue-700",
    "aria-controllable:checked:focus-visible:border-daikinBlue-700",
    "aria-controllable:checked:focus-visible:bg-daikinBlue-700",
    "aria-controllable:checked:focus-visible:bg-daikinBlue-700",
    "aria-controllable:checked:hover:border-daikinBlue-300",
    "aria-controllable:checked:hover:bg-daikinBlue-300",
    "aria-controllable:checked:active:border-daikinBlue-600",
    "aria-controllable:checked:active:bg-daikinBlue-600",

    "aria-controllable:indeterminate:active:border-daikinBlue-600",
    "aria-controllable:indeterminate:active:bg-daikinBlue-600",
    "aria-controllable:indeterminate:hover:border-daikinBlue-300",
    "aria-controllable:indeterminate:hover:bg-daikinBlue-300",
    "aria-controllable:indeterminate:focus-visible:border-daikinBlue-700",
    "aria-controllable:indeterminate:focus-visible:bg-daikinBlue-700",

    "disabled:border-daikinNeutral-200",
    "disabled:bg-white",
    "disabled:indeterminate:bg-daikinNeutral-200",
    "disabled:checked:bg-daikinNeutral-200",
  ],
  {
    variants: {
      size: {
        small: ["w-[18px]", "h-[18px]"],
        large: ["w-5", "h-5"],
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
    defaultVariants: {
      size: "small",
    },
  }
);

type CheckboxVariantProps = MergeVariantProps<
  typeof cvaCheckbox | typeof cvaLabel
>;

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
      display: inline-block;
    }
  `;

  private _handleClick(event: PointerEvent) {
    if (this.readonly || this.disabled) {
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
   * Specify the component size
   */
  @property({ type: String })
  size: CheckboxVariantProps["size"] = "small";

  /**
   * Specify the label position
   * when `left` the label will be in left of checkbox, when `right` label will be in right of checkbox
   */
  @property({ type: String, attribute: "label-position" })
  labelPosition: "left" | "right" = "right";

  /**
   * Specify whether the Checkbox should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify whether the checkbox is read only
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

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
    // Specify the component size
    const checkboxClassName = cvaCheckbox({ size: this.size });
    const labelClassName = cvaLabel({ size: this.size });

    const isIndeterminate = this.checkState === "indeterminate";

    const labelText = this.label
      ? html`<span class=${labelClassName}>${this.label}</span>`
      : nothing;
    const inputTag = html`<input
      class=${checkboxClassName}
      type="checkbox"
      name=${this.name}
      value=${this.value}
      aria-readonly=${this.readonly}
      .indeterminate=${isIndeterminate}
      .checked=${this.checked}
      ?readonly=${this.readonly}
      ?disabled=${this.disabled}
      @change=${this._handleChange}
      @click=${this._handleClick}
    />`;
    const content =
      this.labelPosition !== "right"
        ? html`${labelText}${inputTag}`
        : html`${inputTag}${labelText}`;
    return html`<label
      class="inline-flex gap-[10px] items-center font-daikinSerif"
    >
      ${content}
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
