import { cva } from "class-variance-authority";
import { css, html, unsafeCSS, type PropertyValues } from "lit";
import { property, queryAssignedElements, state } from "lit/decorators.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinInputGroup } from "../input-group";

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
    "after:right-[calc(0.75rem+1px)]",
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
    "slotted-[select]:!rounded",
    "slotted-[select]:!leading-5",
    "slotted-[select]:!outline",
    "slotted-[select]:!outline-0",
    "slotted-[select]:!-outline-offset-2",

    "slotted-[select:focus-visible]:!outline-2",
    "slotted-[select:focus-visible]:!outline-[--color-focus]",

    "slotted-[select:enabled]:!cursor-pointer",
    "slotted-[select:enabled]:!text-ddt-color-common-text-primary",
    "slotted-[select:enabled:hover]:!bg-ddt-color-common-surface-hover",
    "slotted-[select:enabled:active]:!bg-ddt-color-common-surface-press",

    "slotted-[select:disabled]:!text-ddt-color-common-disabled",
    "slotted-[select:disabled]:!border-ddt-color-common-disabled",
  ],
  {
    variants: {
      disabled: {
        false: ["after:text-ddt-color-common-text-primary"],
        true: ["after:text-ddt-color-common-disabled"],
      },
      error: {
        false: [
          "slotted-[select:enabled]:var-color-ddt-color-common-neutral-default/color-base",
          "slotted-[select:enabled:hover]:var-color-ddt-color-common-neutral-hover/color-base",
          "slotted-[select:enabled:active]:var-color-ddt-color-common-neutral-press/color-base",
          "var-color-ddt-color-common-border-focus/color-focus",
        ],
        true: [
          "var-color-ddt-color-common-danger-default/color-base",
          "var-color-ddt-color-common-danger-default/color-focus",
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
 * ```js
 * import "@daikin-oss/design-system-web-components/components/select/index.js";
 * ```
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
@ddsElement("daikin-select")
export class DaikinSelect extends DDSElement {
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

  /**
   * The label text used as the value of aria-label.
   * Set automatically by `reflectInputGroup` method.
   */
  @state()
  private _label: string | null = null;

  private get _select(): HTMLSelectElement | null {
    return this._selects[0] ?? null;
  }

  private _updateSelect(): void {
    const select = this._select;
    if (!select) {
      return;
    }

    select.disabled = this.disabled;
    select.required = this.required;
    select.ariaLabel = this._label;
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
    if (
      changedProperties.has("disabled") ||
      changedProperties.has("required")
    ) {
      this._updateSelect();
    }
  }

  /**
   * This method is used by `daikin-input-group` to reflect it's attributes to this component.
   * @private
   */
  reflectInputGroup(inputGroup: DaikinInputGroup): void {
    const isError = !inputGroup.disabled && !!inputGroup.error;
    this.disabled = !!inputGroup.disabled;
    this.required = !!inputGroup.required;
    this.error = isError;
    this._label = inputGroup.label;

    this._updateSelect();
  }

  /**
   * Focuses on the `<select>` element in the slot.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._select?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-select": DaikinSelect;
  }
}
