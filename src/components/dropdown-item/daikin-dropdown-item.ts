import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaOption = cva(
  [
    "flex",
    "items-center",
    "justify-between",
    "w-full",
    "min-h-12",
    "text-system-element-text-primary",
    "bg-system-element-text-inverse",
    "p-3",
    "font-daikinSerif",
    "leading-5",
    "text-left",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-system-state-focus",

    "disabled:text-system-state-disabled",
  ],
  {
    variants: {
      selected: {
        false: [
          "enabled:hover:bg-system-background-surface-hover",
          "enabled:active:bg-system-background-surface-press",
        ],
        true: [
          "enabled:bg-system-background-surface-selected",
          "enabled:hover:bg-system-background-surface-selectedHover",
          "enabled:active:bg-system-background-surface-selectedActive",
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
 * ```html
 * <daikin-dropdown-item value="value">Dropdown item</daikin-dropdown-item>
 * ```
 */
@customElement("daikin-dropdown-item")
export class DaikinDropdownItem extends LitElement {
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

  override focus(options?: FocusOptions): void {
    this._button?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown-item": DaikinDropdownItem;
  }
}
