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
  emitMoveFocus,
  getDirection,
  moveFocus,
  type MoveFocusEventType,
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

  private _updateLevel() {
    const children = this._children;

    for (const item of children) {
      item.level = this.level + 1;
    }
  }

  private _handleClick(): void {
    this.open = !this.open;
  }

  private _handleSlotChange() {
    this._updateLevel();
  }

  private _handleMoveFocus(event: CustomEvent<MoveFocusEventType>) {
    const direction = event.detail.direction;

    if (direction === "left") {
      event.stopPropagation();
      this.open = false;
      this.focus();
    } else {
      moveFocus(
        event,
        event.target as HTMLElement,
        event.detail.direction,
        this._children
      );
    }
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const direction = getDirection(event);
    if (!direction) {
      return;
    }

    event.preventDefault();
    const children = this._children;

    switch (direction) {
      case "down":
        if (this.open) {
          moveFocus(event, this, direction, children);
        } else {
          emitMoveFocus(this, direction);
        }
        break;

      case "up":
        emitMoveFocus(this, direction);
        break;

      case "left":
        if (this.open) {
          this.open = false;
        } else {
          emitMoveFocus(this, direction);
        }
        break;

      case "right":
        if (this.open) {
          moveFocus(event, this, "down", children);
        } else {
          this.open = true;
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
