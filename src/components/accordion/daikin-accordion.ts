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

  private _handleMoveFocus(
    event: CustomEvent<{ direction: "up" | "down" }>
  ): void {
    const moveOffset = event.detail.direction === "up" ? -1 : 1;
    const items = this._items.filter(({ disabled }) => !disabled);

    // Get focused item if any
    const activeElement = document.activeElement;
    const focusedItemIndex = activeElement
      ? items.findIndex((item) => item === activeElement)
      : -1;

    // If there is no accordion focused, do nothing.
    if (focusedItemIndex < 0) {
      return;
    }

    // Focus on the next enabled accordion item.
    const nextItem =
      items[(focusedItemIndex + moveOffset + items.length) % items.length];

    nextItem.focus();
  }

  override render() {
    return html`<div class="w-full">
      <slot @accordion-move-focus=${this._handleMoveFocus}></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-accordion": DaikinAccordion;
  }
}

export default DaikinAccordion;
