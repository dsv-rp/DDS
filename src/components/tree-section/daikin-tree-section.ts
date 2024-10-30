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
 * @fires click - When an item in the tree section is clicked.
 *
 * @slot - A slot for tree children. Place `daikin-tree-section` and `daikin-tree-item` elements here.
 * @slot label - A slot for label text. Place a `span` element here.
 *
 * @example
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
   * Whether the tree section is selected
   */
  @property({ type: Boolean, reflect: true })
  selected: boolean = false;

  /**
   * Whether the tree section is disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled: boolean = false;

  /**
   * Whether the tree section is open
   */
  @property({ type: Boolean, reflect: true })
  open: boolean = false;

  /**
   * This receives the number of levels in the tree section. This is not specified by the user.
   */
  @property({ type: Number, reflect: true })
  level: number = 0;

  @queryAssignedElements({ selector: "daikin-tree-section,daikin-tree-item" })
  private readonly _children!: readonly (DaikinTreeSection | DaikinTreeItem)[];

  @query("button")
  private readonly _button!: HTMLButtonElement | null;

  private _updateLevel(): void {
    const children = this._children;

    for (const item of children) {
      item.level = this.level + 1;
    }
  }

  private _handleClick(): void {
    this.open = !this.open;
  }

  private _handleSlotChange(): void {
    this._updateLevel();
  }

  private _handleMoveFocus(event: TreeMoveFocusEvent): void {
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
        if (this.open) {
          // Close the section if open.
          this.open = false;
        } else {
          // Move focus to the parent section/root if closed.
          emitTreeMoveFocus(this, "left");
        }
        break;

      case "right":
        if (!this.open) {
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
    return html`<div role="treeitem" aria-selected=${this.open}>
      <button
        type="button"
        ?disabled=${this.disabled}
        class=${cvaTreeChildren({
          selected: this.selected,
          icon: true,
          open: this.open,
        })}
        style=${`--level:${this.level}`}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot name="label"></slot>
      </button>
      <div role="group" ?hidden=${!this.open}>
        <slot
          @slotchange=${this._handleSlotChange}
          @tree-move-focus=${this._handleMoveFocus}
        ></slot>
      </div>
    </div>`;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("level")) {
      this._updateLevel();
    }
  }

  /**
   * Focuses on the inner button.
   * @param options focus options
   */
  override focus(options?: FocusOptions): void {
    this._button?.focus(options);
  }

  /**
   * Focuses on the last enabled item in the slot recursively.
   * If the tree is closed or there are no enabled items in the slot, this will focus on itself.
   * This is called from the next item to move the focus to the item above it in the display.
   * @param options focus options
   */
  focusLastItem(options?: FocusOptions): void {
    const child =
      this.open && this._children.findLast((element) => !element.disabled);

    if (child) {
      child.focusLastItem(options);
    } else {
      this.focus(options);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree-section": DaikinTreeSection;
  }
}
