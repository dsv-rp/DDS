import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, queryAssignedElements } from "lit/decorators.js";
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
 * ```js
 * import "@daikin-oss/design-system-web-components/components/accordion/index.js";
 * ```
 *
 * ```html
 * <daikin-accordion>
 *   <daikin-accordion-item>
 *     <span slot="summary">Accordion summary 1</span>
 *     Accordion content 1
 *   </daikin-accordion-item>
 *   <daikin-accordion-item open>
 *     <span slot="summary">Accordion summary 2</span>
 *     Accordion content 2
 *   </daikin-accordion-item>
 *   <daikin-accordion-item disabled>
 *     <span slot="summary">Accordion summary 3</span>
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

  private _handleKeyDown(event: KeyboardEvent): void {
    const moveOffset = (
      {
        ArrowDown: 1,
        ArrowUp: -1,
      } as const
    )[event.key];

    if (!moveOffset) {
      return;
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

    checkIsDisabledElementAndFocus(focusedItemIndex, moveOffset);

    event.preventDefault();
    return;
  }

  override render() {
    return html`<div class="w-full" @keydown=${this._handleKeyDown}>
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
