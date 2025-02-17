import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import { DaikinCheckbox } from "../checkbox/daikin-checkbox";
import type { DaikinInputGroup } from "../input-group";

const cvaCheckboxGroup = cva(["size-full", "flex", "gap-2"], {
  variants: {
    orientation: {
      horizontal: ["flex-col"],
      vertical: ["flex-row", "gap-3"],
    },
  },
});

type CheckboxGroupProps = MergeVariantProps<typeof cvaCheckboxGroup>;

/**
 * Checkbox groups are used to group multiple checkbox buttons so that make sure that only one will be selected in the group
 *
 * Hierarchies:
 * - `daikin-checkbox-group` > `daikin-checkbox`
 * - `daikin-input-group` > `daikin-checkbox-group` > `daikin-checkbox`
 *
 * @fires change - A custom event emitted when current checked checkbox changed.
 *
 * @slot - A slot for checkbox buttons. Place `daikin-checkbox` elements here.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/checkbox/index.js";
 * import "@daikin-oss/design-system-web-components/components/checkbox-group/index.js";
 * ```
 *
 * ```html
 * <daikin-checkbox-group name="name">
 *   <daikin-checkbox value="value1" label="Option1"></daikin-checkbox>
 *   <daikin-checkbox value="value2" label="Option2"></daikin-checkbox>
 *   <daikin-checkbox value="value3" label="Option3"></daikin-checkbox>
 * </daikin-checkbox-group>
 * ```
 */
@customElement("daikin-checkbox-group")
export class DaikinCheckboxGroup extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-block;
    }
  `;

  @queryAssignedElements({ selector: "daikin-checkbox" })
  private readonly _checkboxes!: Array<DaikinCheckbox>;

  /**
   * Specify the checkbox group orientation
   */
  @property({ type: String })
  orientation: CheckboxGroupProps["orientation"] = "horizontal";

  /**
   * The form name.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * `value` of the currently selected checkbox.
   * see {@link DaikinCheckbox.value}
   */
  @property({ type: String, reflect: true })
  value = "";

  /**
   * Whether the checkbox group is required.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * The label text used as the value of aria-label.
   * Set automatically by `reflectInputGroup` method.
   */
  @state()
  private _label: string | null = null;

  private _updateCheckboxes() {
    const checkboxes = this._checkboxes;
    const selectedCheckbox = checkboxes.find(
      (checkbox) => checkbox.value === this.value
    );
    const firstEnabledCheckbox = checkboxes.find(
      (checkbox) => !checkbox.disabled
    );
    for (const daikinCheckbox of this._checkboxes) {
      if (this.name) {
        daikinCheckbox.name = this.name;
      }
      const isSelected = daikinCheckbox === selectedCheckbox;
      daikinCheckbox.checked = isSelected;
      // If none of the checkbox buttons are selected, the first checkbox button can be focused.
      daikinCheckbox.skipTab = selectedCheckbox
        ? !isSelected
        : daikinCheckbox !== firstEnabledCheckbox;
    }
  }

  private readonly _handleCheckboxChange = (
    event: CustomEvent<{ value: string }>
  ) => {
    this.value = (event.target as HTMLInputElement).value;
  };

  private _handleSlotChange(): void {
    this._updateCheckboxes();
  }

  /**
   * Handles keyboard interactions in the checkbox list.
   * https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
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

    event.preventDefault();

    // get all active checkboxes
    const enabledCheckboxes = this._checkboxes.filter(
      ({ disabled }) => !disabled
    );

    // Check if there is at least one checkbox available
    if (!enabledCheckboxes.length) {
      return;
    }

    // Get focused checkbox if any
    const activeElement = document.activeElement;
    const focusedCheckboxIndex = activeElement
      ? enabledCheckboxes.findIndex((checkbox) =>
          checkbox.contains(activeElement)
        )
      : -1;

    // If there is no checkbox focused, focus on the active (current) checkbox
    if (focusedCheckboxIndex < 0) {
      const activeCheckbox =
        enabledCheckboxes.find((checkbox) => checkbox.checked) ??
        enabledCheckboxes[0];
      this.value = activeCheckbox.value;
      activeCheckbox.focus();
      return;
    }

    // If there is a checkbox focused, move focus forward or backward
    const newIndex =
      (focusedCheckboxIndex + moveOffset + enabledCheckboxes.length) %
      enabledCheckboxes.length;
    if (newIndex !== focusedCheckboxIndex) {
      const newCheckbox = enabledCheckboxes[newIndex];
      this.value = newCheckbox.value;
      newCheckbox.focus();
      this.dispatchEvent(new Event("change"));
    }
  }

  override render() {
    return html`<fieldset
      role="radiogroup"
      aria-label=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(this._label as any)
      }
      aria-required=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(this.required as any)
      }
      @keydown=${this._handleKeyDown}
    >
      <slot
        class=${cvaCheckboxGroup({ orientation: this.orientation })}
        @slotchange=${this._handleSlotChange}
        @change=${this._handleCheckboxChange}
      >
      </slot>
    </fieldset>`;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("value") || changedProperties.has("name")) {
      this._updateCheckboxes();
    }
  }

  reflectInputGroup(inputGroup: DaikinInputGroup): void {
    this._label = inputGroup.label;
    this.required = !!inputGroup.required;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-checkbox-group": DaikinCheckboxGroup;
  }
}
