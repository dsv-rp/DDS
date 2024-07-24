import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaToggle = cva(
  [
    "appearance-none",
    "cursor-pointer",
    "relative",
    "bg-daikinNeutral-200",
    "rounded-3xl",
    "transition-color",
    "duration-300",
    "disabled:bg-daikinNeutral-200",

    "before:content-['']",
    "before:absolute",
    "before:rounded-full",
    "before:transition",
    "before:disabled:bg-daikinNeutral-400",
  ],
  {
    variants: {
      size: {
        default: [
          "w-[51px]",
          "h-[31px]",
          "checked:bg-daikinBlue-500",

          "before:h-[27px]",
          "before:w-[27px]",
          "before:bg-white",
          "before:top-[2px]",
          "before:left-[2px]",
          "before:checked:translate-x-5",
        ],
        small: [
          "w-8",
          "h-[14px]",
          "checked:bg-daikinBlue-50",

          "before:h-5",
          "before:w-5",
          "before:top-[-3px]",
          "before:bg-daikinNeutral-600",
          "before:checked:bg-daikinBlue-500",
          "before:checked:translate-x-3",
        ],
      },
    },
  }
);

type ToggleVariantProps = MergeVariantProps<typeof cvaToggle>;

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-toggle")
export class DaikinToggle extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-flex;
    }
  `;

  static readonly formAssociated = true;

  // define _internals to let toggle can be used in form
  private _internals = this.attachInternals();

  private _updateFormValue() {
    this._internals.setFormValue(this.checked ? this.value : null);
  }

  @query("input")
  private _input: HTMLInputElement | null | undefined;

  private _handleChange(event: Event) {
    if (!this._input) {
      return;
    }
    this._updateFormValue();
    this.dispatchEvent(new Event("change", event));
  }

  /**
   * Specify the component size
   */
  @property({ type: String })
  size: ToggleVariantProps["size"] = "default";

  /**
   * Specify whether the Toggle should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify whether the control is checked
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

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
   * Specify whether the Toggle is in a error state
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  override render() {
    // Specify the component size

    const toggleClassName = cvaToggle({ size: this.size });

    const inputTag = html`<input
      class=${toggleClassName}
      type="checkbox"
      name=${this.name}
      value=${this.value}
      .checked=${this.checked}
      ?disabled=${this.disabled}
      @change=${this._handleChange}
    />`;

    return html`${inputTag}`;
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
