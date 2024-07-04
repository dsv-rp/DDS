import ctl from "@netlify/classnames-template-literals";
import { css, html, LitElement, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

import { cva, type VariantProps } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css";
import type { OmitNull } from "../../typeUtils";

const hideRadioCN = ctl(`
  opacity-0
  absolute
  peer
`);

const labelCN = cva(
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

const radioCN = cva(
  [
    "relative",
    "after:absolute",
    "after:!w-full",
    "after:!h-full",
    "after:i-daikin-radio-unchecked",
    "after:text-[#8C8C8C]",
    "peer-checked:after:i-daikin-radio-checked",
    "peer-checked:after:text-daikinBlue-500",

    "peer-hover:after:i-daikin-radio-checked",
    "peer-hover:after:text-daikinBlue-300",

    "peer-active:after:i-daikin-radio-checked",
    "peer-active:after:text-daikinBlue-500",

    "peer-focus-visible:after:i-daikin-radio-unchecked",
    "peer-focus-visible:peer-checked:after:i-daikin-radio-checked",
    "peer-focus-visible:after:text-daikinBlue-700",

    "peer-disabled:after:i-daikin-radio-unchecked",
    "peer-disabled:peer-checked:after:i-daikin-radio-checked",
    "peer-disabled:after:text-daikinNeutral-200",
  ],
  {
    variants: {
      size: {
        small: ["w-[14px]", "h-[14px]"],
        large: ["w-4", "h-4"],
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);

type LabelProps = OmitNull<VariantProps<typeof labelCN>>;
type RadioProps = OmitNull<VariantProps<typeof radioCN>>;
type ComponentSizeProps = LabelProps["size"] & RadioProps["size"];

export interface DaikinRadioProps {
  label: string;
  size: ComponentSizeProps;
  disabled: boolean;
  labelPosition: "left" | "right";
  readonly: boolean;
  checked: boolean;
  name: string;
  value: string;
  error: boolean;
}

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-radio")
class DaikinRadio extends LitElement implements DaikinRadioProps {
  static styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
    }
  `;

  private _handleClick(event: MouseEvent) {
    if (this.readonly) {
      event.preventDefault();
    }
  }

  static formAssociated = true;

  // define internals to let radio can be used in form
  @property({ type: Object })
  internals;

  constructor() {
    super();
    this.internals = this.attachInternals();
  }

  private _updateFormValue() {
    if (this.checked) {
      this.internals.setFormValue(this.value);
    } else {
      this.internals.setFormValue(null);
    }
  }

  updated(changedProperties: Map<string, any>) {
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
   * Specify the label text for check box
   */
  @property({ type: String })
  label = "";

  /**
   * Specify the component size
   */
  @property({ type: String })
  size: ComponentSizeProps = "small";

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
   * The value.
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Specify whether the Radio is in a error state
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  render() {
    // Specify the component size
    const labelClassName = labelCN({ size: this.size });
    const radioClassName = radioCN({ size: this.size });

    const labelText = this.label
      ? html`<span class="${labelClassName}">${this.label}</span>`
      : html``;
    const inputTag = html`<input
        class="${hideRadioCN}"
        type="radio"
        name="${this.name}"
        value="${this.value}"
        ?checked=${this.checked}
        ?readonly=${this.readonly}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @change=${this._handleChange}
      /><span class="${radioClassName}"></span>`;
    const inputArea =
      this.labelPosition === "left"
        ? html`${labelText}${inputTag}`
        : html`${inputTag}${labelText}`;
    return html`<label class="inline-flex gap-[8px] items-center"
      >${inputArea}</label
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-radio": DaikinRadio;
  }
}

export default DaikinRadio;
