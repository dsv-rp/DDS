import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinTreeItem } from "../tree-item";
import type { DaikinTreeSection } from "../tree-section";
import { moveFocus, type MoveFocusEventType } from "./common";

/**
 * The tree component is a component that creates a hierarchical list. You can create a hierarchical structure by placing tree section components and tree item components under the parent tree component.
 *
 * Hierarchy:
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-item`
 * - `daikin-tree` > `daikin-tree-section` > `daikin-tree-section` ...
 * - `daikin-tree` > `daikin-tree-item`
 *
 * @slot - Tree section and tree item list slot. Place `daikin-tree-section` or `daikin-tree-item` elements here.
 *
 * @example
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

  private _handleMoveFocus(event: CustomEvent<MoveFocusEventType>) {
    const direction = event.detail.direction;

    moveFocus(event, event.target as HTMLElement, direction, this._children);
  }

  override render() {
    return html`<div role="tree">
      <slot @tree-move-focus=${this._handleMoveFocus}></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-tree": DaikinTree;
  }
}
