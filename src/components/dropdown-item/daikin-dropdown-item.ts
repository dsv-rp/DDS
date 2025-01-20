import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import { isSimilarToClick } from "../../utils/is-similar-to-click";
import type { DaikinCheckbox } from "../checkbox";
import "../checkbox/daikin-checkbox";

const cvaOption = cva(
  [
    "flex",
    "items-center",
    "justify-between",
    "w-full",
    "min-h-12",
    "font-daikinSerif",
    "leading-5",
    "text-left",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-ddt-color-common-border-focus",
  ],
  {
    variants: {
      selected: {
        false: [
          "var-color-ddt-color-common-background-default/color-primary",
          "hover:var-color-ddt-color-common-surface-hover/color-primary",
          "active:var-color-ddt-color-common-surface-press/color-primary",
        ],
        true: [
          "var-color-ddt-color-common-surface-selected-default/color-primary",
          "hover:var-color-ddt-color-common-surface-selected-hover/color-primary",
          "active:var-color-ddt-color-common-surface-selected-press/color-primary",
          "after:i-daikin-dropdown-check",
          "after:size-6",
        ],
      },
      disabled: {
        false: [
          "text-ddt-color-common-text-primary",
          "bg-[--color-primary]",
          "cursor-pointer",
        ],
        true: [
          "text-ddt-color-common-disabled",
          "bg-ddt-color-common-background-default",
        ],
      },
      multiple: {
        false: ["p-3"],
        true: ["p-2"],
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

  @property({ type: Boolean, reflect: true })
  selectable = false;

  @query("button,div")
  private _focusableElements!: HTMLButtonElement | HTMLDivElement | null;

  @state()
  private _checked = false;

  private _handleClick(): void {
    if (this.disabled) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("select", {
        bubbles: true,
        detail: {
          checked: true,
        },
      })
    );
  }

  private _handleChange(event: Event): void {
    event.preventDefault();
    const target = event.target as DaikinCheckbox;

    this.dispatchEvent(
      new CustomEvent("select", {
        bubbles: true,
        detail: {
          checked: target.checkState === "checked",
        },
      })
    );
  }

  private _handleContainerClick() {
    if (this.disabled) {
      return;
    }

    this._emitSelect();
  }

  private _handleContainerKeydown(event: KeyboardEvent) {
    if (!isSimilarToClick(event.key) || this.disabled) {
      return;
    }

    this._emitSelect();
  }

  private _emitSelect(): void {
    this._checked = !this._checked;

    this.dispatchEvent(
      new CustomEvent("select", {
        bubbles: true,
        detail: {
          checked: this._checked,
        },
      })
    );
  }

  override render() {
    const OPTION_CLASS_NAME = cvaOption({
      selected: this.selected,
      disabled: this.disabled,
      multiple: this.selectable,
    });

    return this.selectable
      ? html`<div
          class=${OPTION_CLASS_NAME}
          data-value=${this.value}
          role="option"
          aria-selected=${this.selected}
          tabindex="-1"
          ?disabled=${this.disabled}
          @click=${this._handleContainerClick}
          @keydown=${this._handleContainerKeydown}
        >
          <div class="flex items-center gap-2.5">
            <daikin-checkbox
              check-state=${this.selected ? "checked" : "unchecked"}
              label-position="hidden"
              label=${this.textContent ?? ""}
              tabindex="-1"
              ?disabled=${this.disabled}
              @change=${this._handleChange}
            ></daikin-checkbox>
            <slot></slot>
          </div>
        </div>`
      : html`<button
          type="button"
          class=${OPTION_CLASS_NAME}
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
    this._focusableElements?.focus(options);
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("selected")) {
      this._checked = this.selected;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown-item": DaikinDropdownItem;
  }
}
