import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaContainer = cva(["w-full", "border-y-[1px]", "border-y-[#CECECE]"]);

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-accordion")
export class DaikinAccordion extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
      max-width: 400px;
    }

    ::slotted(daikin-accordion-item:not(:last-child)) {
      border-bottom: 1px solid #cecece;
    }
  `;

  override render() {
    return html`<div class=${cvaContainer()}>
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
