import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";

import { cva } from "class-variance-authority";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import { DaikinRadio } from "../radio/daikin-radio";

const radioGroupCN = cva(["flex"], {
  variants: {
    orientation: {
      horizontal: ["flex-col"],
      vertical: ["flex-row", "gap-3"],
    },
  },
});

type RadioGroupProps = MergeVariantProps<typeof radioGroupCN>;

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-radio-group")
export class DaikinRadioGroup extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
    }
  `;

  @queryAssignedElements()
  private _radios!: Array<DaikinRadio>;

  private _handleSlotChange(): void {
    for (const radio of this._radios) {
      if (radio.value === this.defaultSelected) {
        radio.checked = true;
        this.value = radio.value;
      }
      if (this.disabled) {
        radio.disabled = true;
      }
    }
  }

  /**
   * Specify the label text for radio group
   */
  @property({ type: String })
  label = "";

  /**
   * Specify the radio group orientation
   */
  @property({ type: String })
  orientation: RadioGroupProps["orientation"] = "horizontal";

  /**
   * The `value` attribute for the `<input>` for selection.
   */
  @property()
  defaultSelected!: string;

  /**
   * Specify the label position
   * when `left` the label will be in left of radioGroup, when `right` label will be in right of radioGroup
   */
  @property({ type: String, attribute: "label-position" })
  labelPosition: "left" | "right" = "right";

  /**
   * Specify whether the RadioGroup should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `value` of the currently selected radio.
   * see {@link DaikinRadio.value}
   */
  @property()
  value = "";

  private _handleRadioChange = (event: CustomEvent<{ value: string }>) => {
    const detail = event.detail;
    for (const daikinRadio of this._radios) {
      if (daikinRadio.value === detail.value) {
        this.value = detail.value;
        daikinRadio.checked = true;
        daikinRadio.internals.setFormValue(daikinRadio.value);
      } else {
        daikinRadio.checked = false;
        daikinRadio.internals.setFormValue(null);
      }
    }
  };

  override render() {
    const radioGroupClassName = radioGroupCN({ orientation: this.orientation });

    return html`<fieldset ?disabled=${this.disabled}>
      ${this.label ? html` <span class="">${this.label}</span>` : ""}
      <slot
        class=${radioGroupClassName}
        @slotchange=${this._handleSlotChange}
        @change=${this._handleRadioChange}
      >
      </slot>
    </fieldset>`;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("disabled")) {
      // check default radio
      for (const radio of this._radios) {
        if (this.disabled) {
          radio.disabled = true;
        } else {
          radio.disabled = false;
        }
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-radio-group": DaikinRadioGroup;
  }
}
