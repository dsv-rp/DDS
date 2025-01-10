import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
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
   * The value that accordion is selecting.
   */
  @property({ type: Array, attribute: false })
  value: string[] = [];

  /**
   * Whether or not to limit the number of accordions that can be opened at the same time to one.
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

  private _handleOpen(event: Event) {
    const newValue = (event.target as DaikinAccordionItem).value;

    if (this.exclusive) {
      this.value = this.value.find((value) => value === newValue)
        ? []
        : [newValue];
    } else {
      this.value = this.value.find((value) => value === newValue)
        ? this.value.filter((value) => value != newValue)
        : [...this.value, newValue];
    }

    this._reflectItemOpen();
  }

  private _reflectItemOpen() {
    if (this.exclusive && this.value.length > 1) {
      if (import.meta.env.DEV) {
        console.warn(
          `Invalid 'value' property: ${JSON.stringify(this.value)}. Only one value can be specified when exclusive is set.`
        );
      }
    }

    for (const item of this._items) {
      item.open = this.value.includes(item.value);
    }
  }

  override render() {
    return html`<div class="w-full">
      <slot
        @accordion-move-focus=${this._handleMoveFocus}
        @open=${this._handleOpen}
        @slotchange=${this._reflectItemOpen}
      ></slot>
    </div>`;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("onlyOpen")) {
      if (this.exclusive) {
        this.value = [];

        this._reflectItemOpen();
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-accordion": DaikinAccordion;
  }
}

export default DaikinAccordion;
