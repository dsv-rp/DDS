import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, queryAssignedElements, state } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinAccordionItem } from "../accordion-item/daikin-accordion-item";

/**
 * The accordion component serves as the parent element that organizes and manages the overall structure of the accordion.
 * Currently it only provides appropriate styles for individual accordion items.
 *
 * Hierarchy:
 * - `daikin-accordion` > `daikin-accordion-item`
 *
 * @slot - A slot for the accordion items. Place `daikin-accordion-item` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-accordion>
 *   <daikin-accordion-item>
 *     <span slot="Accordion summary 1">
 *     Accordion content 1
 *   </daikin-accordion-item>
 *   <daikin-accordion-item open>
 *     <span slot="Accordion summary 2">
 *     Accordion content 2
 *   </daikin-accordion-item>
 *   <daikin-accordion-item disabled>
 *     <span slot="Accordion summary 3">
 *     Accordion content 3
 *   </daikin-accordion-item>
 * </daikin-accordion>
 * ```
 */
@customElement("daikin-accordion")
export class DaikinAccordion extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      min-width: 160px;
    }

    ::slotted(daikin-accordion-item) {
      --divider-top-display: block;
      --divider-bottom-display: none;
    }

    ::slotted(daikin-accordion-item:last-child) {
      --divider-bottom-display: block;
    }
  `;

  @queryAssignedElements({ selector: "daikin-accordion-item" })
  private readonly _items!: readonly DaikinAccordionItem[];

  @state()
  private _pressedKeys: ("Tab" | "Shift")[] = [];

  private _handleKeyDown(event: KeyboardEvent): void {
    const moveOffset = (
      {
        ArrowDown: 1,
        ArrowUp: -1,
      } as const
    )[event.key];

    const key = (
      {
        Tab: "Tab",
        Shift: "Shift",
      } as const
    )[event.key];

    if (!moveOffset && !key) {
      return;
    }

    if (key) {
      this._pressedKeys = Array.from(new Set([...this._pressedKeys, key]));
    }

    const items = this._items;

    // Get focused item if any
    const activeElement = document.activeElement;

    const focusedItemIndex = activeElement
      ? items.findIndex((item) => item.contains(activeElement))
      : -1;

    const checkIsDisabledElementAndFocus = (
      index: number,
      moveOffset: number
    ) => {
      const nextFocusItemIndex =
        moveOffset === 1
          ? index === -1 || index === items.length - 1
            ? 0
            : index + moveOffset
          : index <= 0
            ? items.length - 1
            : index + moveOffset;

      if (items[nextFocusItemIndex].disabled) {
        checkIsDisabledElementAndFocus(nextFocusItemIndex, moveOffset);
      } else {
        items[nextFocusItemIndex].focus();
      }
    };

    const checkIsDisabledElementForNotArrow = (index: number) => {
      if (index === -1) {
        return;
      }

      if (items[index].disabled) {
        checkIsDisabledElementForNotArrow(index - 1);
      } else {
        items[index].focus();
      }
    };

    if (this._pressedKeys.length === 2) {
      checkIsDisabledElementForNotArrow(focusedItemIndex - 1);

      event.preventDefault();
    }

    if (moveOffset) {
      checkIsDisabledElementAndFocus(focusedItemIndex, moveOffset);

      event.preventDefault();
    }

    return;
  }

  private _handleKeyUp(event: KeyboardEvent): void {
    this._pressedKeys = this._pressedKeys.filter((key) => key !== event.key);
  }

  override render() {
    return html`<div
      class="w-full"
      @keydown=${this._handleKeyDown}
      @keyup=${this._handleKeyUp}
    >
      <slot></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-accordion": DaikinAccordion;
  }
}

export default DaikinAccordion;
