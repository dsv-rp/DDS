import {
  LitElement,
  css,
  html,
  nothing,
  unsafeCSS,
  type PropertyValues,
} from "lit";
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
  operationChildrenFocus,
  type MoveFocusEventType,
} from "../tree/daikin-tree";

/**
 * The tree section component that can be used within `daikin-tree` component.
 *
 * The tree section accepts either a tree item or a tree section. By stacking tree sections, you can create a multi-level structure.
 *
 * Hierarchy:
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-item`
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-section` ...
 *
 * @fires click - When an item in the tree section is clicked, it returns the open/closed status of the section.
 *
 * @slot - Tree item list slot. Place `daikin-tree-item` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-tree-section label="Tree section 1">
 *   <daikin-tree-item>Tree item 1-1</daikin-tree-item>
 *   <daikin-tree-item>Tree item 1-2</daikin-tree-item>
 *   <daikin-tree-item>Tree item 1-3</daikin-tree-item>
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
  private readonly _button!: HTMLButtonElement;

  private _updateLevel() {
    const children = this._children;

    for (const item of children) {
      item.disabled = this.disabled;
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
    event.stopPropagation();

    const direction = event.detail.direction;

    // When `left` or `right`, the event is transmitted and the open/close process is performed.
    if (direction === "left" || direction === "right") {
      this.open = direction === "right";
    }

    if (direction === "left") {
      return;
    }

    operationChildrenFocus(
      event.target as HTMLElement,
      direction,
      this._children,
      event.detail.option
    );
  }

  private _handleKeyDown(event: KeyboardEvent) {
    const direction = getDirection(event);
    if (!direction) {
      return;
    }

    // When `left` or `right`, the event is transmitted and the open/close process is performed.
    if (direction === "left" || direction === "right") {
      this.open = direction === "right";
    }

    if (direction === "left") {
      return;
    }

    if (this.open && direction !== "up") {
      operationChildrenFocus(this, direction, this._children);
    } else {
      emitMoveFocus(this, direction);
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
        style=${`--padding-left:${12 + this.level * 28}px`}
        @click=${this._handleClick}
        @keydown=${this._handleKeyDown}
      >
        <slot name="label"></slot>
      </button>
      <div role="group">
        ${this.open
          ? html`<slot
              @slotchange=${this._handleSlotChange}
              @tree-move-focus=${this._handleMoveFocus}
            ></slot>`
          : nothing}
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
  override focus(options?: FocusOptions | undefined): void {
    this._button.focus(options);
  }

  focusLastItem(options?: FocusOptions | undefined): void {
    const children = this._children;
    children.at(-1)?.focusLastItem(options);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree-section": DaikinTreeSection;
  }
}
