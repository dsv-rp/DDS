import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

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
    const moveOffset =
      (
        {
          ArrowDown: "down",
          ArrowUp: "up",
        } as const
      )[event.key] ?? "";

    const focused = document.activeElement;

    switch (moveOffset) {
      case "down": {
        (focused?.nextElementSibling as HTMLElement | null)?.focus();

        break;
      }

      case "up": {
        (focused?.previousElementSibling as HTMLElement | null)?.focus();

        break;
      }

      default: {
        break;
      }
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
