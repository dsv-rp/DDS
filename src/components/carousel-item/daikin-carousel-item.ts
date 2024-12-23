import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";

/**
 * The carousel item component is a child element within the `daikin-carousel` component.
 *
 * Hierarchy:
 * - `daikin-carousel` > `daikin-carousel-item`
 *
 * @slot - A slot for carousel item content.
 *
 * @example
 *
 * ```html
 * <daikin-carousel-item>Carousel item</daikin-carousel-item>
 * ```
 */
@customElement("daikin-carousel-item")
export class DaikinCarouselItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * _Internal use._
   * Item's aria label.
   * Controlled by `daikin-carousel`.
   *
   * @private
   */
  @property({ type: String, attribute: false })
  label = "";

  /**
   * _Internal use._
   * Whether this item is displayed in the carousel or not.
   * Controlled by `daikin-carousel`.
   *
   * @private
   */
  @property({ type: Boolean, attribute: false })
  active = false;

  override render() {
    return html`<div
      class="flex-none overflow-hidden"
      role="tabpanel"
      aria-label=${this.label}
      aria-hidden=${!this.active}
    >
      <slot tabindex=${ifDefined(!this.active ? -1 : undefined)}></slot>
    </div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "daikin-carousel-item": DaikinCarouselItem;
  }
}
