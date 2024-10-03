import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

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
 *   <daikin-accordion-item open disabled>
 *     <span slot="Accordion summary 4">
 *     Accordion content 4
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

  override render() {
    return html`<div class="w-full">
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
