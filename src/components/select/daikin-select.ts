import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaSelect = cva(
  [
    "block",
    "w-full",
    "h-full",
    "relative",
    "after:i-daikin-dropdown-chevron-down",
    "after:w-6",
    "after:h-6",
    "after:m-auto",
    "after:absolute",
    "after:top-0",
    "after:bottom-0",
    "after:right-3",
    "after:pointer-events-none",

    "slotted-[select]:!appearance-none",
    "slotted-[select]:!flex",
    "slotted-[select]:!items-center",
    "slotted-[select]:!gap-2",
    "slotted-[select]:!w-full",
    "slotted-[select]:!h-full",
    "slotted-[select]:!min-h-12",
    "slotted-[select]:!pl-4",
    "slotted-[select]:!pr-12",
    "slotted-[select]:!text-base",
    "slotted-[select]:!font-daikinSerif",
    "slotted-[select]:!border",
    "slotted-[select]:!border-[--color-base]",
    "slotted-[select]:!rounded-md",
    "slotted-[select]:!font-daikinSerif",
    "slotted-[select]:!leading-5",
    "slotted-[select]:!outline",
    "slotted-[select]:!outline-0",
    "slotted-[select]:!-outline-offset-2",

    "slotted-[select:focus-visible]:!outline-2",
    "slotted-[select:focus-visible]:!outline-[--color-focus]",

    "slotted-[select:enabled]:!cursor-pointer",
    "slotted-[select:enabled]:!text-daikinNeutral-800",
    "slotted-[select:enabled:hover]:!bg-[#f2f2f2]",
    "slotted-[select:enabled:active]:!bg-daikinNeutral-100",

    "slotted-[select:disabled]:!text-daikinNeutral-200",
    "slotted-[select:disabled]:!border-daikinNeutral-200",
  ],
  {
    variants: {
      disabled: {
        false: ["after:text-daikinNeutral-900"],
        true: ["after:text-daikinNeutral-200"],
      },
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
    },
  }
);

/**
 * A select component.
 * This component accepts an HTML `<select>` element in the slot and applies styles to it.
 * The `disabled` property of the component is also reflected in the `<select>` element in the slot.
 *
 * Hierarchy:
 * - `daikin-input-group` > `daikin-select`
 *
 * @slot - A slot for an HTML `<select>` element which may contain `<option>` and `<optgroup>`.
 *
 * @example
 *
 * ```html
 * <daikin-select>
 *   <select name="select">
 *     <option value="value1">Option 1</option>
 *     <option value="value2">Option 2</option>
 *     <optgroup label="Group">
 *       <option value="value3">Option 3</option>
 *       <option value="value4">Option 4</option>
 *     </optgroup>
 *   </select>
 * </daikin-select>
 * ```
 */
@customElement("daikin-select")
export class DaikinSelect extends LitElement {
  static override readonly styles = css`
    ::slotted(select) {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      border: 0 solid;

      font: inherit;
      font-feature-settings: inherit;
      font-variation-settings: inherit;
      letter-spacing: inherit;
      color: inherit;
      background: transparent;
    }

    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * Whether the select component is in an error state.
   */
  @property({ type: Boolean, reflect: true })
  error = false;

  /**
   * Whether the select component is required.
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * Whether the select component is disabled.
   * This value will also be applied to the `disabled` property of the `<select>` element in the slot.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @queryAssignedElements({ selector: "select" })
  private readonly _selects!: readonly HTMLSelectElement[];

  private get _select(): HTMLSelectElement | null {
    return this._selects[0] ?? null;
  }

  private _updateSelect(): void {
    const select = this._select;
    if (select) {
      select.disabled = this.disabled;
    }
  }

  private _handleSlotChange(): void {
    this._updateSelect();
  }

  override render() {
    return html`<slot
      class=${cvaSelect({ disabled: this.disabled, error: this.error })}
      @slotchange=${this._handleSlotChange}
    ></slot>`;
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has("disabled")) {
      this._updateSelect();
    }
  }

  /**
   * Focuses on the `<select>` element in the slot.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._select?.focus(options);
  }

  reflectInputGroup(): void {
    // Nothing to do.
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-select": DaikinSelect;
  }
}