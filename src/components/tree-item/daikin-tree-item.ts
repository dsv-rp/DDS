import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import { emitTreeMoveFocus, getDirectionFromKey } from "../tree/common";

export const cvaTreeChildren = cva(
  [
    "flex",
    "items-center",
    "gap-1",
    "w-full",
    "min-h-12",
    "py-3",
    "pr-3",
    "pl-[calc(var(--level)*28px+12px)]",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-daikinBlue-700",

    "before:size-6",
    "before:transition-all",

    "link-enabled:hover:bg-[--color-hover]",
    "link-enabled:active:bg-[--color-active]",
    "link-disabled:text-daikinNeutral-200",
  ],
  {
    variants: {
      disabled: {
        false: ["hover:bg-[--color-hover]", "active:bg-[--color-active]"],
        true: ["text-daikinNeutral-200"],
      },
      selected: {
        false: [
          "bg-white",
          "enabled:hover:bg-daikinNeutral-100",
          "enabled:active:bg-daikinNeutral-200",
          "var-color-daikinNeutral-100/color-hover",
          "var-color-daikinNeutral-200/color-active",
        ],
        true: [
          "bg-daikinBlue-50",
          "var-color-daikinBlue-50/color-hover",
          "var-color-daikinBlue-100/color-active",
        ],
      },
      icon: {
        false: [],
        true: ["before:i-daikin-chevron-right"],
      },
      open: {
        false: [],
        true: ["before:rotate-90"],
      },
    },
  }
);

/**
 * The tree item component that can be used within `daikin-tree` and `daikin-tree-section` component.
 *
 * This can be placed either under the tree section or directly under the tree. Elements cannot be placed any deeper than tree item.
 *
 * Hierarchy:
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-item`
 * - `daikin-tree` > `daikin-tree-item`
 *
 * @example
 *
 * ```html
 * <daikin-tree-item>Tree item</daikin-tree-item>
 * ```
 */
@customElement("daikin-tree-item")
export class DaikinTreeItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
    }
  `;

  /**
   * Type of tree item
   */
  @property({ type: String })
  type: "button" | "link" = "button";

  /**
   * Destination when the link is clicked
   */
  @property({ type: String })
  href: string | null = null;

  /**
   * Whether the tree item is selected
   */
  @property({ type: Boolean, reflect: true })
  selected: boolean = false;

  /**
   * Whether the tree item is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * This receives the number of levels in the tree item.
   * This is not specified by the user.
   */
  @property({ type: Number, reflect: true })
  level: number = 0;

  @query("a,button")
  private readonly _focusableElement!: HTMLAnchorElement | HTMLButtonElement;

  private _handleKeyDown(event: KeyboardEvent) {
    const direction = getDirectionFromKey(event.key);
    if (!direction) {
      return;
    }

    // Prevent scrolling.
    event.preventDefault();

    if (direction !== "right") {
      // In the leaf node, the right key is a no-op.
      // The focus moves to the siblings or ancestors, so emit an event and let the parent handle it.
      emitTreeMoveFocus(this, direction);
    }
  }

  override render() {
    const itemCN = cvaTreeChildren({
      disabled: this.disabled,
      selected: this.selected,
      icon: false,
      open: false,
    });

    const disabled =
      this.disabled || (this.type === "link" && this.href == null);

    const item = {
      button: html`<button
        type="button"
        class=${itemCN}
        ?disabled=${disabled}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </button>`,
      link: html`<a
        href=${ifDefined(!disabled ? (this.href ?? undefined) : undefined)}
        role=${ifDefined(disabled ? "link" : undefined)}
        aria-disabled=${ifDefined(disabled ? "true" : undefined)}
        class=${itemCN}
        @keydown=${this._handleKeyDown}
      >
        <slot></slot>
      </a>`,
    }[this.type];

    // eslint-disable-next-line lit-a11y/accessible-name -- The accessible name of the `treeitem` will be calculated from the slot content.
    return html`<div
      role="treeitem"
      aria-selected=${this.selected}
      style=${`--level:${this.level}`}
    >
      ${item}
    </div>`;
  }

  /**
   * Focuses on the inner button.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._focusableElement.focus(options);
  }

  /**
   * Focuses on the inner button.
   * This is provided to ensure consistency of the interface.
   * @param options focus options
   */
  focusLastItem(options?: FocusOptions): void {
    this._focusableElement.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree-item": DaikinTreeItem;
  }
}
