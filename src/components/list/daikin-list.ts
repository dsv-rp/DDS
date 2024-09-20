import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";
import type { DaikinListItem } from "../list-item";

type DirectionType = "ArrowDown" | "ArrowUp";

const focusTargetElement = (
  element: Element | null,
  direction: DirectionType
) => {
  const target = ((direction === "ArrowDown"
    ? element?.nextElementSibling
    : element?.previousElementSibling) ?? null) as DaikinListItem | null;

  if (target?.disabled) {
    focusTargetElement(target, direction);
  } else {
    target?.focus();
  }
};

/**
 * The list component is used to list items using the list item component.
 *
 * Hierarchy:
 * - `daikin-list` > `daikin-list-item`
 *
 * @slot - A slot for the list items. Place `daikin-list-item` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-list>
 *   <daikin-list-item>List item label 1</daikin-list-item>
 *   <daikin-list-item>List item label 2</daikin-list-item>
 *   <daikin-list-item>List item label 3</daikin-list-item>
 * </daikin-list>
 * ```
 */
@customElement("daikin-list")
export class DaikinList extends LitElement {
  private _handleKeyDown(event: KeyboardEvent): void {
    const moveOffset = ["ArrowDown", "ArrowUp"].includes(event.key)
      ? (event.key as DirectionType)
      : null;

    if (moveOffset) {
      focusTargetElement(document.activeElement, moveOffset);
    }
  }

  override render() {
    return html`<div role="list" @keydown=${this._handleKeyDown}>
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-list": DaikinList;
  }
}

export default DaikinList;
