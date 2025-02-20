import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinTreeItem } from "../tree-item";
import type { DaikinTreeSection } from "../tree-section";
import { handleTreeMoveFocusRoot, type TreeMoveFocusEvent } from "./common";

/**
 * The tree component is a component that creates a hierarchical list. You can create a hierarchical structure by placing tree section components and tree item components under the parent tree component.
 *
 * Hierarchy:
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-item`
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-section` ...
 * - `daikin-tree` > `daikin-tree-item`
 *
 * @slot - A slot for tree sections and tree items. Place `daikin-tree-section` or `daikin-tree-item` elements here.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/tree/index.js";
 * import "@daikin-oss/design-system-web-components/components/tree-item/index.js";
 * import "@daikin-oss/design-system-web-components/components/tree-section/index.js";
 * ```
 *
 * ```html
 * <daikin-tree>
 *   <daikin-tree-section>
 *     <span slot="label">Tree section 1</span>
 *     <daikin-tree-item>Tree item 1-1</daikin-tree-item>
 *     <daikin-tree-item>Tree item 1-2</daikin-tree-item>
 *     <daikin-tree-item>Tree item 1-3</daikin-tree-item>
 *   </daikin-tree-section>
 * </daikin-tree>
 * ```
 */
@customElement("daikin-tree")
export class DaikinTree extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
    }
  `;

  /**
   * Whether or not to enable tree selection.
   * When enabled, tree sections and items can be selected by click, and the `selected` property of the `daikin-tree` and its descendants will be automatically controlled.
   * Even if this is disabled, you can still set the `selected` property yourself.
   */
  @property({ type: Boolean, reflect: true })
  selectable: boolean = false;

  /**
   * The value of the currently selected tree section or tree item.
   * Even if `selectable` is `false`, you can still set this property yourself.
   */
  @property({ type: Array, attribute: false })
  selectedItems: string[] = [];

  @queryAssignedElements({ selector: "daikin-tree-section,daikin-tree-item" })
  private readonly _children!: readonly (DaikinTreeSection | DaikinTreeItem)[];

  private _handleMouseDown(event: MouseEvent) {
    if (event.detail >= 2) {
      // Prevent text selection on double click, triple-click, and so on.
      event.preventDefault();
    }
  }

  private _handleSlotChange(): void {
    this._children.forEach((child) => (child.level = 0));
    this.selectItems(this.selectedItems);
  }

  private _handleTreeMoveFocus(event: TreeMoveFocusEvent): void {
    handleTreeMoveFocusRoot(event, this._children);
  }

  private _handleTreeSelect(event: Event): void {
    if (!this.selectable) {
      return;
    }
    event.stopPropagation();

    const target = event.target as DaikinTreeSection | DaikinTreeItem;
    this.selectedItems = [target.value];
  }

  private _handleTreeUnselect(event: Event): void {
    if (!this.selectable) {
      return;
    }
    event.stopPropagation();

    this.selectedItems = this.getSelectedItems();
  }

  override render() {
    return html`<div role="tree" @mousedown=${this._handleMouseDown}>
      <slot
        @slotchange=${this._handleSlotChange}
        @tree-move-focus=${this._handleTreeMoveFocus}
        @tree-select=${this._handleTreeSelect}
        @tree-unselect=${this._handleTreeUnselect}
      ></slot>
    </div>`;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("selectedItems")) {
      // Update the selection state of descendant sections and items.
      this.selectItems(this.selectedItems);
    }
  }

  /**
   * Calls `selectItems` for the tree sections and tree items of the child elements in the slot.
   *
   * @param value Tree item value.
   * @private
   */
  selectItems(values: readonly string[]): void {
    this._children.forEach((child) => child.selectItems(values));
  }

  /**
   * Returns an array of the `value` of the currently selected sections and items.
   * If nothing is selected, returns `[]`.
   *
   * @returns An array of the `value` of the selected sections and items (if any). `[]` if there is none.
   * @private
   */
  getSelectedItems(): string[] {
    return Array.from(
      new Set(this._children.flatMap((child) => child.getSelectedItems()))
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree": DaikinTree;
  }
}
