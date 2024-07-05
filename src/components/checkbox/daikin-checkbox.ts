import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
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
    defaultVariants: {
      size: "small",
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
 * Primary UI component for user interaction
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
  @property()
  name = "";

  /**
   * The value.
   */
  @property()
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

    const isChecked = this.checkState === "checked";
    const isIndeterminate = this.checkState === "indeterminate";

    const labelText = this.label
      ? html`<span class=${labelClassName}>${this.label}</span>`
      : html``;
    const inputTag = html`<input
      class=${checkboxClassName}
      type="checkbox"
      name=${this.name}
      value=${this.value}
      aria-readonly=${this.readonly}
      .indeterminate=${isIndeterminate}
      .checked=${isChecked}
      ?readonly=${this.readonly}
      ?disabled=${this.disabled}
      @click=${(e: PointerEvent) => this._handleClick(e)}
      @change=${(e: Event) => this.dispatchEvent(new Event("change", e))}
    />`;
    const content =
      this.labelPosition === "left"
        ? html`${labelText}${inputTag}`
        : html`${inputTag}${labelText}`;
    return html`<label class="inline-flex gap-[10px] items-center"
      >${content}</label
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-checkbox": DaikinCheckbox;
  }
}
