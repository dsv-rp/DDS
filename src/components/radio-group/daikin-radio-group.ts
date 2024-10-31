import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import { DaikinRadio } from "../radio/daikin-radio";

const radioGroupCN = cva(["flex", "gap-2", "py-2", "pr-2"], {
  variants: {
    orientation: {
      horizontal: ["flex-col"],
      vertical: ["flex-row", "gap-3"],
    },
  },
});

type RadioGroupProps = MergeVariantProps<typeof radioGroupCN>;

/**
 * Radio groups are used to group multiple radio buttons so that make sure that only one will be selected in the group
 *
 * Hierarchies:
 * - `daikin-radio-group` > `daikin-radio`
 * - `daikin-input-group` > `daikin-radio-group` > `daikin-radio`
 *
 * @fires change - A custom event emitted when current checked radio changed.
 *
 * @slot - A slot for radio buttons. Place `daikin-radio` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-radio-group name="name">
 *   <daikin-radio value="value1" label="Option1"></daikin-radio>
 *   <daikin-radio value="value2" label="Option2"></daikin-radio>
 *   <daikin-radio value="value3" label="Option3"></daikin-radio>
 * </daikin-radio-group>
 * ```
 *
 * ```html
 * <daikin-input-group label="Label text" helper="Helper text">
 *   <daikin-radio-group name="name">
 *     <daikin-radio value="value1" label="Option1"></daikin-radio>
 *     <daikin-radio value="value2" label="Option2"></daikin-radio>
 *     <daikin-radio value="value3" label="Option3"></daikin-radio>
 *   </daikin-radio-group>
 * </daikin-input-group>
 * ```
 */
@customElement("daikin-radio-group")
export class DaikinRadioGroup extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
    }
  `;

  @queryAssignedElements({ selector: "daikin-radio" })
  private readonly _radios!: Array<DaikinRadio>;

  /**
   * Specify the radio group orientation
   */
  @property({ type: String })
  orientation: RadioGroupProps["orientation"] = "horizontal";

  /**
   * The form name.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * `value` of the currently selected radio.
   * see {@link DaikinRadio.value}
   */
  @property({ type: String, reflect: true })
  value = "";

  private _updateRadios() {
    const radios = this._radios;
    const selectedRadio = radios.find((radio) => radio.value === this.value);
    const firstEnabledRadio = radios.find((radio) => !radio.disabled);
    for (const daikinRadio of this._radios) {
      if (this.name) {
        daikinRadio.name = this.name;
      }
      const isSelected = daikinRadio === selectedRadio;
      daikinRadio.checked = isSelected;
      // If none of the radio buttons are selected, the first radio button can be focused.
      daikinRadio.skipTab = selectedRadio
        ? !isSelected
        : daikinRadio !== firstEnabledRadio;
    }
  }

  private readonly _handleRadioChange = (
    event: CustomEvent<{ value: string }>
  ) => {
    this.value = (event.target as HTMLInputElement).value;
  };

  private _handleSlotChange(): void {
    this._updateRadios();
  }

  /**
   * Handles keyboard interactions in the radio list.
   * https://www.w3.org/WAI/ARIA/apg/patterns/radio/
   */
  private _handleKeyDown(event: KeyboardEvent): void {
    const moveOffset = {
      ArrowRight: 1,
      ArrowDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
    }[event.key];
    if (!moveOffset) {
      return;
    }

    // Retrieve all radios
    const radios = this._radios;

    // Check if there is at least one radio available
    if (!radios.some((radio) => !radio.disabled)) {
      return;
    }

    // Get focused radio if any
    const activeElement = document.activeElement;
    const focusedRadioIndex = activeElement
      ? radios.findIndex((radio) => radio.contains(activeElement))
      : -1;

    // If there is no radio focused, focus on the active (current) radio
    if (focusedRadioIndex < 0) {
      const activeRadio =
        radios.find((radio) => radio.checked) ??
        radios.find((radio) => !radio.disabled);
      if (activeRadio) {
        activeRadio.checked = true;
        activeRadio.focus();
        event.preventDefault();
      }
      return;
    }

    // If there is a radio focused, move focus forward or backward
    for (let i = 1; i <= radios.length; i++) {
      const index =
        (focusedRadioIndex + moveOffset * i + radios.length) % radios.length;
      const nextRadio = radios[index];
      if (nextRadio.disabled) {
        continue;
      }
      nextRadio.focus();
      nextRadio.checked = true;
      this.value = nextRadio.value;

      const beforeRadio = radios[focusedRadioIndex];
      beforeRadio.checked = false;
      event.preventDefault();

      this.dispatchEvent(new Event("change"));
      return;
    }
  }

  override render() {
    const radioGroupClassName = radioGroupCN({ orientation: this.orientation });

    return html`<fieldset role="radiogroup" @keydown=${this._handleKeyDown}>
      <slot
        class=${radioGroupClassName}
        @slotchange=${this._handleSlotChange}
        @change=${this._handleRadioChange}
      >
      </slot>
    </fieldset>`;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("value") || changedProperties.has("name")) {
      this._updateRadios();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-radio-group": DaikinRadioGroup;
  }
}
