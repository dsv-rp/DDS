import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

export const cvaTreeChildren = cva(
  [
    "flex",
    "items-center",
    "gap-3",
    "w-full",
    "min-h-12",
    "py-3",
    "pr-3",
    "pl-[--padding-left]",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-daikinBlue-700",
  ],
  {
    variants: {
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
          "after:i-daikin-dropdown-check",
          "after:size-5",
          "enabled:after:text-daikinNeutral-900",
          "disabled:after:text-daikinNeutral-200",
          "var-color-daikinBlue-50/color-hover",
          "var-color-daikinBlue-100/color-active",
        ],
      },
      disabled: {
        false: ["hover:bg-[--color-hover]", "active:bg-[--color-active]"],
        true: ["text-daikinNeutral-200"],
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
   * This receives the number of levels in the tree item. This is not specified by the user.
   */
  @property({ type: Number })
  hierarchy: number = 0;

  override render() {
    const itemCN = cvaTreeChildren({
      disabled: this.disabled,
      selected: this.selected,
    });

    const variant =
      this.type === "link" && !!this.href
        ? this.disabled
          ? "linkDisabled"
          : "link"
        : "button";

    const item = {
      button: html`<button
        type="button"
        class=${itemCN}
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </button>`,
      link: html`<a href=${this.href as string} class=${itemCN}>
        <slot></slot>
      </a>`,
      linkDisabled: html`<span class=${itemCN}>
        <slot></slot>
      </span>`,
    }[variant];

    return html`<div
      role="treeitem"
      aria-selected="false"
      aria-labelledby=${this.textContent ?? ""}
      style=${`--padding-left:${12 + (this.hierarchy + 1) * 36}px`}
    >
      ${item}
    </div>`;
  }

  /**
   * Focuses on the inner button.
   * @param options focus options
   */
  override focus(options?: FocusOptions | undefined): void {
    this.shadowRoot?.querySelector("button")?.focus(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree-item": DaikinTreeItem;
  }
}
