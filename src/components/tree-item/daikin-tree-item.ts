import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
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
    "leading-[130%]",

    "focus-visible:outline",
    "focus-visible:outline-2",
    "focus-visible:-outline-offset-2",
    "focus-visible:outline-ddt-color-common-border-focus",
  ],
  {
    variants: {
      disabled: {
        false: [
          "text-ddt-color-common-text-primary",
          "bg-[--color-base]",
          "cursor-pointer",
        ],
        true: ["text-ddt-color-common-disabled"],
      },
      selected: {
        false: [
          "var-color-transparent/color-base",
          "hover:var-color-ddt-color-common-surface-hover/color-base",
          "active:var-color-ddt-color-common-surface-press/color-base",
        ],
        true: [
          "var-color-ddt-color-common-surface-selected-default/color-base",
          "hover:var-color-ddt-color-common-surface-selected-hover/color-base",
          "active:var-color-ddt-color-common-surface-selected-press/color-base",
        ],
      },
      icon: {
        false: ["before:size-6"],
        true: [
          "before:i-daikin-chevron-right",
          "before:size-5",
          "before:m-0.5",
          "before:transition-all",
          "before:flex-none",
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
   * Controlled by `daikin-tree`.
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

  private readonly _focusableRef: Ref<HTMLElement> = createRef();

  private get _selected(): boolean {
    return this.selected && !this.disabled;
  }

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
      ${ref(this._focusableRef)}
      class=${cvaTreeChildren({
        disabled: this.disabled,
        selected: this._selected,
        icon: false,
        open: false,
      })}
      role="treeitem"
      aria-disabled=${this.disabled}
      aria-selected=${this._selected}
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
        this.selectItem([]);
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
    this._focusableRef.value?.focus(options);
  }

  /**
   * Focuses on the inner button.
   * This is provided to ensure consistency of the interface.
   *
   * @param options focus options
   * @private
   */
  focusLastItem(options?: FocusOptions): void {
    this._focusableRef.value?.focus(options);
  }

  /**
   * Updates the selection state (`this.selected`) to true if the argument `value` matches `this.value`. Otherwise, sets it to false.
   *
   * @param value Tree item value.
   * @private
   */
  selectItem(value: string[]): void {
    if (this.disabled) {
      return;
    }

    this.selected = value.includes(this.value);
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
