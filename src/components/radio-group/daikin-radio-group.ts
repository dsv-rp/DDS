import {
  LitElement,
  css,
  html,
  nothing,
  unsafeCSS,
  type PropertyValues,
} from "lit";
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
 * Radio groups are used to group multiple radio buttons so that make sure that only one will be selected in the group
 *
 * Hierarchies:
 * - `daikin-radio-group` > `daikin-radio`
 *
 * @fires change - A custom event emitted when current checked radio changed.
 *
 * @slot - A slot for radio buttons. Place `daikin-radio` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-radio-group>
 *  <daikin-radio name="name" value="value1" label="Option1"></daikin-radio>
 *  <daikin-radio name="name" value="value2" label="Option2"></daikin-radio>
 *  <daikin-radio name="name" value="value3" label="Option3"></daikin-radio>
 * </daikin-radio-group>
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
  private _radios!: Array<DaikinRadio>;

  /**
   * Specify the label text for radio group
   */
  @property({ type: String, reflect: true })
  label = "";

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

  private _updateRadios(value: string, name: string) {
    for (const daikinRadio of this._radios) {
      daikinRadio.name = name;
      if (daikinRadio.value === value) {
        this.value = value;
        daikinRadio.checked = true;
        daikinRadio.internals.setFormValue(daikinRadio.value);
      } else {
        daikinRadio.checked = false;
        daikinRadio.internals.setFormValue(null);
      }
    }
  }

  private _handleRadioChange = (event: CustomEvent<{ value: string }>) => {
    this._updateRadios((event.target as HTMLInputElement).value, this.name);
  };

  private _handleSlotChange(): void {
    this._updateRadios(this.value, this.name);
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
      // No radios available!
      if (import.meta.env.DEV) {
        console.warn(
          `[daikin-radio-group] No radios that can be activated! This may cause unexpected behavior.`
        );
      }
      return;
    }

    // Get focused radio if any
    const activeElement = document.activeElement;
    const focusedRadioIndex = activeElement
      ? radios.findIndex((radio) => radio.contains(activeElement))
      : -1;

    // If there is no radio focused, focus on the active (current) radio
    if (focusedRadioIndex < 0) {
      const activeRadio = radios.find(
        (radio) => !radio.disabled && radio.checked
      );
      activeRadio?.shadowRoot?.querySelector("input")?.focus();
      event.preventDefault();
      return;
    }

    // If there is a radio focused, move focus forward or backward
    for (let i = 1; i <= radios.length; i++) {
      const index =
        (focusedRadioIndex + moveOffset * i + radios.length * i) %
        radios.length;
      const nextRadio = radios[index];
      if (nextRadio.disabled) {
        continue;
      }
      const nextRadioInput = nextRadio.shadowRoot?.querySelector("input");
      // const target = nextRadio.shadowRoot?.querySelector("input");
      nextRadioInput?.focus();
      nextRadio.checked = true;

      const beforeRadio = radios[focusedRadioIndex];
      beforeRadio.checked = false;
      event.preventDefault();

      this.dispatchEvent(new Event("change"));
      return;
    }
  }

  override render() {
    const radioGroupClassName = radioGroupCN({ orientation: this.orientation });

    return html`<fieldset @keydown=${this._handleKeyDown}>
      ${this.label ? html`<span>${this.label}</span>` : nothing}
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
      this._updateRadios(this.value, this.name);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-radio-group": DaikinRadioGroup;
  }
}
