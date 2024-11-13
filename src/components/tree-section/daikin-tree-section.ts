import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  query,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import { cvaTreeChildren, type DaikinTreeItem } from "../tree-item";
import {
  emitTreeMoveFocus,
  emitTreeSelect,
  getDirectionFromKey,
  handleTreeMoveFocusSection,
  type TreeMoveFocusEvent,
} from "../tree/common";

/**
 * The tree section component that can be used within `daikin-tree` component.
 *
 * The tree section accepts either a tree item or a tree section. By stacking tree sections, you can create a multi-level structure.
 *
 * Hierarchy:
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-item`
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-section` ...
 *
 * @fires toggle - _Cancellable._ A custom event emitted when the user clicks the header.
 * @fires tree-move-focus - _Internal use._ A custom event used to move the focus within a tree.
 *
 * @slot - A slot for tree children. Place `daikin-tree-section` and `daikin-tree-item` elements here.
 * @slot label - A slot for section header content. Place a `span` element here.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/tree-item/index.js";
 * import "@daikin-oss/design-system-web-components/components/tree-section/index.js";
 * ```
 *
 * ```html
 * <daikin-tree-section>
 *   <span slot="label">Tree section</span>
 *   <daikin-tree-item>Tree item 1</daikin-tree-item>
 *   <daikin-tree-item>Tree item 2</daikin-tree-item>
 *   <daikin-tree-item>Tree item 3</daikin-tree-item>
 * </daikin-tree-section>
 * ```
 */
@customElement("daikin-tree-section")
export class DaikinTreeSection extends LitElement {
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
   * Whether the tree section is selected.
   * This is usually specified automatically and the user does not operate it.
   */
  @property({ type: Boolean, reflect: true })
  selected: boolean = false;

  /**
   * Whether the tree section is disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * Whether the tree section is open.
   * Treated as `false` when `disabled` is `true`.
   */
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  /**
   * _Internal use._
   * The current nesting depth when the root's children are 0.
   * Automatically set by the parent.
   *
   * @private
   */
  @property({ type: Number, attribute: false })
  level: number = 0;

  @queryAssignedElements({ selector: "daikin-tree-section,daikin-tree-item" })
  private readonly _children!: readonly (DaikinTreeSection | DaikinTreeItem)[];

  @query("button")
  private readonly _button!: HTMLButtonElement | null;

  private get _open(): boolean {
    return this.open && !this.disabled;
  }

  private _updateChildrenLevel(): void {
    for (const item of this._children) {
      item.level = this.level + 1;
    }
  }

  private _handleClick(): void {
    if (
      this.dispatchEvent(
        new Event("toggle", {
          cancelable: true,
        })
      )
    ) {
      this.open = !this.open;
      emitTreeSelect(this);
    }
  }

  private _handleSlotChange(): void {
    this._updateChildrenLevel();
  }

  private _handleTreeMoveFocus(event: TreeMoveFocusEvent): void {
    handleTreeMoveFocusSection(this, event, this._children);
  }

  private _handleKeyDown(event: KeyboardEvent): void {
    const direction = getDirectionFromKey(event.key);
    if (!direction) {
      return;
    }

    // Prevent scrolling.
    event.preventDefault();

    switch (direction) {
      case "up":
        // The item above the section header is in a previous sibling, so emit an event and let the parent handle it.
        emitTreeMoveFocus(this, "up");
        break;

      case "down": {
        // If the section is open, the first item under the header is the first child, so focus on that.
        // If the section is closed or there is no child in the slot, the next sibling needs to be focused, so emit the `tree-move-focus` event and let the parent handle it.
        const nextItem = this.open && this._children[0];
        if (nextItem) {
          nextItem.focus();
        } else {
          emitTreeMoveFocus(this, "down");
        }
        break;
      }

      case "left":
        if (this._open) {
          // Close the section if open.
          this.open = false;
        } else {
          // Move focus to the parent section/root if closed.
          emitTreeMoveFocus(this, "left");
        }
        break;

      case "right":
        if (!this._open) {
          // Open the section if closed.
          this.open = true;
        } else {
          // Move focus to the first child (if any) if open.
          this._children[0]?.focus();
        }
        break;
    }
  }

  override render() {
    // eslint-disable-next-line lit-a11y/accessible-name
    return html`<div
      role="treeitem"
      aria-selected=${this._open && !this.disabled}
      aria-expanded=${this._open && !this.disabled}
      aria-disabled=${this.disabled}
    >
      <button
        type="button"
        ?disabled=${this.disabled}
        class=${cvaTreeChildren({
          selected: this.selected,
          icon: true,
          open: this._open,
        })}
        style=${`--level:${this.level}`}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot name="label"></slot>
      </button>
      <div role="group" ?hidden=${!this._open}>
        <slot
          @slotchange=${this._handleSlotChange}
          @tree-move-focus=${this._handleTreeMoveFocus}
        ></slot>
      </div>
    </div>`;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("level")) {
      this._updateChildrenLevel();
    }
  }

  /**
   * Focuses on the inner button.
   *s
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._button?.focus(options);
  }

  /**
   * Focuses on the last enabled item in the slot recursively.
   * If the tree is closed or there are no enabled items in the slot, this will focus on itself.
   * This is called from the next item to move the focus to the item above it in the display.
   *
   * @param options focus options
   */
  focusLastItem(options?: FocusOptions): void {
    // console.log(this._children);
    const child =
      this._open && this._children.findLast((element) => !element.disabled);

    if (child) {
      child.focusLastItem(options);
    } else {
      this.focus(options);
    }
  }

  selectedItem(selected?: string): void {
    this.selected = this.value === selected;
    this._children.forEach((section) => section.selectedItem(selected));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree-section": DaikinTreeSection;
  }
}
