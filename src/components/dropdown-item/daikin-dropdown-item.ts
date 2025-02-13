import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import { isSimilarToClick } from "../../utils/is-similar-to-click";
import "../checkbox/daikin-checkbox";

const cvaOption = cva(
  [
    "flex",
    "items-center",
    "gap-1",
    "w-full",
    "min-h-12",
    "font-daikinSerif",
    "leading-[130%]",
    "text-left",
    "relative",

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
          "after:flex-none",
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
        false: ["justify-between", "p-3"],
        true: ["justify-start", "gap-2", "p-2", "after:hidden"],
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

  @query("button,span[role=option]")
  private _focusableElement!: HTMLElement | null;

  private _handleClick(event: PointerEvent): void {
    if (
      this.disabled ||
      (event.target as HTMLElement).tagName === "DAIKIN-CHECKBOX"
    ) {
      return;
    }

    this._emitSelect();
    event.preventDefault();
  }

  private _handleChange(event: Event): void {
    this._emitSelect();
    event.preventDefault();
  }

  private _handleKeydown(event: KeyboardEvent) {
    if (!isSimilarToClick(event.key) || this.disabled) {
      return;
    }

    this._emitSelect();
    event.preventDefault();
  }

  private _handleMousedown(event: MouseEvent) {
    if (event.detail === 2) {
      // Prevent text selection on double click.
      event.preventDefault();
    }
  }

  private _emitSelect(): void {
    this.dispatchEvent(new Event("select", { bubbles: true }));
  }

  override render() {
    const optionClassName = cvaOption({
      selected: this.selected,
      disabled: this.disabled,
      multiple: this.selectable,
    });

    return this.selectable
      ? html`<span
          class=${optionClassName}
          data-value=${this.value}
          role="option"
          aria-selected=${this.selected}
          tabindex="-1"
          aria-disabled=${this.disabled}
          @click=${this._handleClick}
          @keydown=${this._handleKeydown}
          @mousedown=${this._handleMousedown}
        >
          <daikin-checkbox
            check-state=${this.selected ? "checked" : "unchecked"}
            label=${
              /* FIXME: Stop using `textContent` to follow the updates to the text. Rather, we should change checkbox to accept a slot. */
              this.textContent ?? ""
            }
            label-position="hidden"
            tabindex="-1"
            ?disabled=${this.disabled}
            @change=${this._handleChange}
          >
          </daikin-checkbox>
          <slot></slot>
        </span>`
      : html`<button
          type="button"
          class=${optionClassName}
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
    this._focusableElement?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-dropdown-item": DaikinDropdownItem;
  }
}
