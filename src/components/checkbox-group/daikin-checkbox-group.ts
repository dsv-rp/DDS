import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import type { DaikinInputGroup } from "../input-group";

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

  /**
   * Specify the checkbox group orientation
   */
  @property({ type: String })
  orientation: CheckboxGroupProps["orientation"] = "horizontal";

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
      <slot class=${cvaCheckboxGroup({ orientation: this.orientation })}>
      </slot>
    </fieldset>`;
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
