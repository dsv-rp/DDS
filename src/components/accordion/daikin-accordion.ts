import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
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
      min-width: 10rem;
    }

    ::slotted(daikin-accordion-item) {
      --divider-top-display: block;
      --divider-bottom-display: none;
    }

    ::slotted(daikin-accordion-item:last-child) {
      --divider-bottom-display: block;
    }
  `;

  /**
   * A list of the names of the open items.
   * If `exclusive` is true, the number of elements is 0 or 1.
   */
  @property({ type: Array, attribute: false })
  openedItems: string[] = [];

  /**
   * Whether or not to make the accordion exclusive.
   * If true, the number of items that can be open at once is limited to one.
   */
  @property({ type: Boolean, reflect: true })
  exclusive = false;

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

  private _handleToggle(event: Event) {
    const targetValue = (event.target as DaikinAccordionItem).name;
    const opened = !(event.target as DaikinAccordionItem).open;

    if (this.exclusive) {
      this.openedItems = opened ? [targetValue] : [];
    } else {
      this.openedItems = opened
        ? [...this.openedItems, targetValue]
        : this.openedItems.filter((item) => item != targetValue);
    }

    this._reflectItemOpen();
  }

  private _reflectItemOpen() {
    if (import.meta.env.DEV) {
      if (this.exclusive && this.openedItems.length > 1) {
        console.warn(
          `Invalid 'openedItems' property: ${JSON.stringify(this.openedItems)}. Only one active can be specified when exclusive is set.`
        );
      }
    }

    for (const item of this._items) {
      item.open = this.openedItems.includes(item.name);
    }
  }

  override render() {
    return html`<div class="w-full">
      <slot
        @accordion-move-focus=${this._handleMoveFocus}
        @toggle=${this._handleToggle}
        @slotchange=${this._reflectItemOpen}
      ></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-accordion": DaikinAccordion;
  }
}

export default DaikinAccordion;
