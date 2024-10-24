import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaSelect = cva(
  [
    "slotted-[select]:flex",
    "slotted-[select]:items-center",
    "slotted-[select]:gap-2",
    "slotted-[select]:w-full",
    "slotted-[select]:h-full",
    "slotted-[select]:min-h-12",
    "slotted-[select]:!pl-4",
    "slotted-[select]:!pr-3",
    "slotted-[select]:text-base",
    "slotted-[select]:font-daikinSerif",
    "slotted-[select]:!border",
    "slotted-[select]:rounded-md",
    "slotted-[select]:leading-5",
    "slotted-[select]:outline",
    "slotted-[select]:outline-0",
    "slotted-[select]:-outline-offset-2",
    "slotted-[select]:appearance-none",

    "slotted-[select:focus-visible]:outline-2",
    "slotted-[select:focus-visible]:outline-[--color-focus]",

    "slotted-[select:enabled]:cursor-pointer",
    "slotted-[select:enabled]:hover:bg-[#f2f2f2]",
    "slotted-[select:enabled]:active:bg-daikinNeutral-100",
  ],
  {
    variants: {
      error: {
        false: [
          "var-color-daikinNeutral-600/color-base",
          "var-color-daikinBlue-700/color-focus",
        ],
        true: [
          "var-color-daikinRed-500/color-base",
          "var-color-daikinRed-500/color-focus",
        ],
      },
      disabled: {
        false: [
          "slotted-[select]:!text-daikinNeutral-800",
          "slotted-[select]:!border-[--color-base]",
        ],
        true: [
          "slotted-[select]:!text-daikinNeutral-200",
          "slotted-[select]:!border-daikinNeutral-200",
        ],
      },
    },
  }
);

// For chevron only
const cvaSelectContainer = cva(
  [
    "relative",

    "after:i-daikin-dropdown-chevron-down",
    "after:w-6",
    "after:h-6",
    "after:absolute",
    "after:m-auto",
    "after:top-0",
    "after:bottom-0",
    "after:right-3",
    "after:pointer-events-none",
  ],
  {
    variants: {
      disabled: {
        false: ["after:text-daikinNeutral-900"],
        true: ["after:text-daikinNeutral-200"],
      },
    },
  }
);

/**
 * A select component. It can contain the HTML standard `select`, and all operations are delegated to it. Here, only the style is changed based on the DDS design.
 *
 * For disabled and error, you must also specify them in daikin-select.
 *
 * Note: The `disabled` attributes of `daikin-select` and `select` are not synchronized.
 *
 * Hierarchy:
 * - `daikin-input-group` > `daikin-select`
 *
 * @slot - HTML standard `select`. Contains `optgroup` and `option`.
 *
 * @example
 *
 * ```html
 * <daikin-select>
 *   <select name="select">
 *     <option value="value1">Option 1</option>
 *     <option value="value2">Option 2</option>
 *     <option value="value3">Option 3</option>
 *   </select>
 * </daikin-select>
 * ```
 */
@customElement("daikin-select")
export class DaikinSelect extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * Whether the select is error.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Whether the select is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @queryAssignedElements({ selector: "select" })
  private readonly _selects!: readonly HTMLSelectElement[];

  override render() {
    return html`<div class=${cvaSelectContainer({ disabled: this.disabled })}>
      <slot
        class=${cvaSelect({ disabled: this.disabled, error: this.error })}
      ></slot>
    </div>`;
  }

  override focus(options?: FocusOptions): void {
    this._selects[0].focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-select": DaikinSelect;
  }
}
