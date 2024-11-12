import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import {
  emitTreeMoveFocus,
  emitTreeSelect,
  getDirectionFromKey,
} from "../tree/common";

export const cvaTreeChildren = cva(
  [
    "flex",
    "items-center",
    "w-full",
    "min-h-12",
    "py-3",
    "pr-4",
    "pl-[calc((var(--level)+1)*16px)]",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-system-state-focus",

    "link-enabled:hover:bg-[--color-hover]",
    "link-enabled:active:bg-[--color-active]",
    "link-disabled:text-system-state-disabled",
  ],
  {
    variants: {
      disabled: {
        false: ["hover:bg-[--color-hover]", "active:bg-[--color-active]"],
        true: ["text-system-state-disabled"],
      },
      selected: {
        false: [
          "enabled:hover:bg-system-background-surface-hover",
          "enabled:active:bg-system-background-surface-press",
          "var-color-system-background-surface-hover/color-hover",
          "var-color-system-background-surface-press/color-active",
        ],
        true: [
          "bg-system-background-surface-selected",
          "var-color-system-background-surface-selectedHover/color-hover",
          "var-color-system-background-surface-selectedActive/color-active",
        ],
      },
      icon: {
        false: ["before:size-6"],
        true: [
          "before:i-daikin-chevron-right",
          "before:size-5",
          "before:m-0.5",
          "before:transition-all",
        ],
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
 * @fires click - A retargeted event of a [click event](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) emitted from the inner `<a>` or `<button>` element. Suppressed if `disabled` is true,
 * @fires tree-move-focus - _Internal use._ A custom event used to move the focus within a tree.
 *
 * @slot - A slot for the tree item content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/tree-item/index.js";
 * ```
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
   * Value of the tree item.
   */
  @property({ type: String })
  value: string = "";

  /**
   * Type of the tree item.
   * If `"link"` is specified, the tree item will be rendered as an `<a>` element.
   */
  @property({ type: String })
  type: "button" | "link" = "button";

  /**
   * Link `href`.
   * Only used if the `type` is `"link"`.
   * If omitted with `type="link"`, the link will be treated as [a placeholder link](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element:~:text=If%20the%20a%20element%20has%20no%20href%20attribute) and rendered as disabled state.
   */
  @property({ type: String })
  href: string | null = null;

  /**
   * Whether the tree item is selected.
   */
  @property({ type: Boolean, reflect: true })
  selected: boolean = false;

  /**
   * Whether the tree item is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * _Internal use._
   * The current nesting depth when the root's children are 0.
   * Automatically set by the parent.
   *
   * @private
   */
  @property({ type: Number, attribute: false })
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

  constructor() {
    super();

    this.addEventListener("click", (event: MouseEvent): void => {
      if (this.disabled) {
        event.stopImmediatePropagation();
      }
    });
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
    const item =
      this.type === "link"
        ? html`<a
            href=${ifDefined(!disabled ? (this.href ?? undefined) : undefined)}
            role=${ifDefined(disabled ? "link" : undefined)}
            aria-disabled=${ifDefined(disabled ? "true" : undefined)}
            class=${itemCN}
            @keydown=${this._handleKeyDown}
          >
            <slot></slot>
          </a>`
        : html`<button
            type="button"
            class=${itemCN}
            ?disabled=${disabled}
            @click=${() => emitTreeSelect(this)}
            @keydown=${this._handleKeyDown}
          >
            <slot></slot>
          </button>`;

    // eslint-disable-next-line lit-a11y/accessible-name -- The accessible name of the `treeitem` will be calculated from the slot content.
    return html`<div
      role="treeitem"
      aria-selected=${this.selected && !this.disabled}
      style=${`--level:${this.level}`}
    >
      ${item}
    </div>`;
  }

  /**
   * Focuses on the inner button.
   *
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._focusableElement.focus(options);
  }

  /**
   * Focuses on the inner button.
   * This is provided to ensure consistency of the interface.
   *
   * @param options focus options
   */
  focusLastItem(options?: FocusOptions): void {
    this._focusableElement.focus(options);
  }

  selectedItem(selected?: string): void {
    this.selected = this.value === selected;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree-item": DaikinTreeItem;
  }
}
