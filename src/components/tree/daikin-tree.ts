import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
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

  @queryAssignedElements({ selector: "daikin-tree-section,daikin-tree-item" })
  private readonly _children!: readonly (DaikinTreeSection | DaikinTreeItem)[];

  private _updateChildrenLevel(): void {
    for (const item of this._children) {
      item.level = 0;
    }
  }

  private _handleSlotChange(): void {
    this._updateChildrenLevel();
  }

  private _handleTreeMoveFocus(event: TreeMoveFocusEvent): void {
    handleTreeMoveFocusRoot(event, this._children);
  }

  override render() {
    return html`<div role="tree">
      <slot
        @slotchange=${this._handleSlotChange}
        @tree-move-focus=${this._handleTreeMoveFocus}
      ></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree": DaikinTree;
  }
}