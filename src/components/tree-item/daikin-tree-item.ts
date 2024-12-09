import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import { isSimpleKeyEvent } from "../../utils/is-simple-key";
import {
  emitTreeMoveFocus,
  emitTreeSelect,
  emitTreeUnselect,
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
    "pl-[calc((var(--level)+1)*1rem)]",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-system-state-focus",
  ],
  {
    variants: {
      disabled: {
        false: ["bg-[--color-base]", "cursor-pointer"],
        true: ["text-system-state-disabled"],
      },
      selected: {
        false: [
          "var-color-transparent/color-base",
          "hover:var-color-system-background-surface-hover/color-base",
          "active:var-color-system-background-surface-press/color-base",
        ],
        true: [
          "var-color-system-background-surface-selected/color-base",
          "hover:var-color-system-background-surface-selectedHover/color-base",
          "active:var-color-system-background-surface-selectedActive/color-base",
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
   * Whether the tree item is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * Whether the tree item is selected.
   * Ignored if disabled.
   * Controlled by `daikin-tree` if its `selectable` is true.
   * If the tree's `selected` is false, you can manually set this property to control the display of the selected state.
   */
  @property({ type: Boolean, reflect: true })
  selected: boolean = false;

  /**
   * _Internal use._
   * The current nesting depth when the root's children are 0.
   * Automatically set by the parent.
   *
   * @private
   */
  @property({ type: Number, attribute: false })
  level: number = 0;

  @query("div")
  private readonly _div!: HTMLElement;

  private _handleKeyDown(event: KeyboardEvent) {
    if (!isSimpleKeyEvent(event)) {
      return;
    }

    if (!this.disabled && ["Enter", " "].includes(event.key)) {
      event.preventDefault();
      emitTreeSelect(this);

      return;
    }

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
    // eslint-disable-next-line lit-a11y/accessible-name -- The accessible name of the `treeitem` will be calculated from the slot content.
    return html`<div
      class=${cvaTreeChildren({
        disabled: this.disabled,
        selected: this.selected && !this.disabled,
        icon: false,
        open: false,
      })}
      role="treeitem"
      aria-disabled=${this.disabled}
      aria-selected=${this.selected && !this.disabled}
      tabindex=${ifDefined(!this.disabled ? 0 : undefined)}
      style=${`--level:${this.level}`}
      @click=${() => emitTreeSelect(this)}
      @keydown=${this._handleKeyDown}
    >
      <slot></slot>
    </div>`;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("disabled")) {
      if (this.disabled) {
        this.selectItem(null);
        emitTreeUnselect(this);
      }
    }
  }

  /**
   * Focuses on the inner button.
   *
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._div.focus(options);
  }

  /**
   * Focuses on the inner button.
   * This is provided to ensure consistency of the interface.
   *
   * @param options focus options
   * @private
   */
  focusLastItem(options?: FocusOptions): void {
    this._div.focus(options);
  }

  /**
   * Updates the selection state (`this.selected`) to true if the argument `value` matches `this.value`. Otherwise, sets it to false.
   *
   * @param value Tree item value.
   * @private
   */
  selectItem(value: string | null): void {
    if (this.disabled && value != null) {
      return;
    }

    this.selected = this.value === value;
  }

  /**
   * Returns `this.value` if selected, or `null` if not selected.
   *
   * @returns `this.value` if selected. `null` if not selected.
   * @private
   */
  getSelectedItem(): string | null {
    return !this.disabled && this.selected ? this.value : null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree-item": DaikinTreeItem;
  }
}
