import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import type { DaikinCheckbox } from "../checkbox/daikin-checkbox";
import type { DaikinInputGroup } from "../input-group";

type ControlElement = DaikinCheckbox;

const cvaCheckboxGroup = cva(["size-full", "flex", "gap-2"], {
  variants: {
    orientation: {
      horizontal: ["flex-row"],
      vertical: ["flex-col"],
    },
  },
});

type CheckboxGroupProps = MergeVariantProps<typeof cvaCheckboxGroup>;

/**
 * Checkbox groups are used to group multiple checkboxes.
 *
 * Hierarchies:
 * - `daikin-checkbox-group` > `daikin-checkbox`
 * - `daikin-input-group` > `daikin-checkbox-group` > `daikin-checkbox`
 *
 * @slot - A slot for checkbox. Place `daikin-checkbox` elements here.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/checkbox/index.js";
 * import "@daikin-oss/design-system-web-components/components/checkbox-group/index.js";
 * ```
 *
 * ```html
 * <daikin-checkbox-group>
 *   <daikin-checkbox name="name1" value="value1" label="Label Text 1"></daikin-checkbox>
 *   <daikin-checkbox name="name2" value="value2" label="Label Text 2"></daikin-checkbox>
 *   <daikin-checkbox name="name3" value="value3" label="Label Text 3"></daikin-checkbox>
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

  /**
   * Specify the checkbox group orientation
   */
  @property({ type: String })
  orientation: CheckboxGroupProps["orientation"] = "vertical";

  /**
   * Whether the checkbox group is required.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the checkbox group is disabled.
   * Controlled by `daikin-input-group` when used within `daikin-input-group`.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The label text used as the value of aria-label.
   * Set automatically by `reflectInputGroup` method.
   */
  @state()
  private _label: string | null = null;

  @queryAssignedElements({
    selector: "daikin-checkbox",
  })
  private readonly _controls!: readonly ControlElement[];

  private _reflectSlotProperties(): void {
    for (const control of this._controls) {
      control.reflectInputGroup(this);
    }
  }

  private _handleSlotChange(): void {
    this._reflectSlotProperties();
  }

  override render() {
    return html`<fieldset
      aria-label=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(this._label as any)
      }
      aria-required=${
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- workaround lit-analyzer checking
        ifDefined(this.required as any)
      }
    >
      <slot
        class=${cvaCheckboxGroup({ orientation: this.orientation })}
        @slotchange=${this._handleSlotChange}
      >
      </slot>
    </fieldset>`;
  }

  reflectInputGroup(inputGroup: DaikinInputGroup): void {
    this._label = inputGroup.label;
    this.required = !!inputGroup.required;
    this.disabled = inputGroup.disabled;
  }

  override updated() {
    this._reflectSlotProperties();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-checkbox-group": DaikinCheckboxGroup;
  }
}
