import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

/**
 * A wrapper component and the accordion component manages a group of daikin-accordion-item.
 *
 * @slot - accordion items list slot. Place `daikin-accordion-item` elements here.
 *
 * @example
 *
 * ```html
 * <daikin-accordion>
 *   <daikin-accordion-item title="Accordion-1-title">
 *     Accordion-1-content
 *   </daikin-accordion-item>
 *   <daikin-accordion-item title="Accordion-2-title" open>
 *     Accordion-2-content
 *   </daikin-accordion-item>
 *   <daikin-accordion-item title="Accordion-3-title" disabled>
 *     Accordion-3-content
 *   </daikin-accordion-item>
 *   <daikin-accordion-item title="Accordion-4-title" open disabled>
 *     Accordion-4-content
 *   </daikin-accordion-item>
 * </daikin-accordion>
 * ```
 */
@customElement("daikin-accordion")
export class DaikinAccordion extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }

    ::slotted(daikin-accordion-item:not(:last-child)) {
      border-bottom: 1px solid #cecece;
    }
  `;

  override render() {
    return html`<div class="w-full border-y-[1px] border-y-[#CECECE]">
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
