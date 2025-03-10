import { cva } from "class-variance-authority";
import { css, html, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";

const cvaOption = cva(
  [
    "flex",
    "items-center",
    "justify-between",
    "w-full",
    "min-h-12",
    "text-ddt-color-common-text-primary",
    "bg-ddt-color-common-background-default",
    "p-3",
    "font-daikinSerif",
    "leading-5",
    "text-left",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-ddt-color-common-border-focus",

    "disabled:text-ddt-color-common-disabled",
  ],
  {
    variants: {
      selected: {
        false: [
          "enabled:hover:bg-ddt-color-common-surface-hover",
          "enabled:active:bg-ddt-color-common-surface-press",
        ],
        true: [
          "enabled:bg-ddt-color-common-surface-selected-default",
          "enabled:hover:bg-ddt-color-common-surface-selected-hover",
          "enabled:active:bg-ddt-color-common-surface-selected-press",
          "after:i-daikin-dropdown-check",
          "after:size-6",
        ],
      },
    },
  }
);

/**
 * The dropdown item (option) component that can be used within `daikin-dropdown` component.
 *
 * Hierarchy:
 * - `daikin-dropdown` > `daikin-dropdown-item`
 *
 * @fires select - A custom event emitted when a user clicks the item. For internal use (`daikin-dropdown`).
 *
 * @slot - A slot for the item content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/dropdown-item/index.js";
 * ```
 *
 * ```html
 * <daikin-dropdown-item value="value">Dropdown item</daikin-dropdown-item>
 * ```
 */
@ddsElement("daikin-dropdown-item")
export class DaikinDropdownItem extends DDSElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * Form value of the dropdown item.
   */
  @property({ type: String })
  value = "";

  /**
   * Whether the dropdown item is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Whether the dropdown item is selected.
   * Set automatically by `daikin-dropdown` component.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  @query("button")
  private _button!: HTMLButtonElement | null;

  private _handleClick(): void {
    if (this.disabled) {
      return;
    }

    this.dispatchEvent(
      new Event("select", {
        bubbles: true,
      })
    );
  }

  override render() {
    return html`<button
      type="button"
      class=${cvaOption({ selected: this.selected })}
      data-value=${this.value}
      role="option"
      aria-selected=${this.selected}
      tabindex="-1"
      ?disabled=${this.disabled}
      @click=${this._handleClick}
    >
      <slot></slot>
    </button>`;
  }

  /**
   * Focuses on the inner button.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._button?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown-item": DaikinDropdownItem;
  }
}
