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
 * ```js
 * import "@daikin-oss/design-system-web-components/components/accordion/index.js";
 * ```
 *
 * ```html
 * <daikin-accordion>
 *   <daikin-accordion-item title="The first accordion item">
 *     Accordion 1 content.
 *   </daikin-accordion-item>
 *   <daikin-accordion-item title="The second accordion item" open>
 *     Accordion 2 content.
 *   </daikin-accordion-item>
 *   <daikin-accordion-item title="The third accordion item" disabled>
 *     Accordion 3 content.
 *   </daikin-accordion-item>
 *   <daikin-accordion-item title="The fourth accordion item" open disabled>
 *     Accordion 4 content.
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
