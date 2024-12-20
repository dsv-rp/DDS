import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
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
   * Item's aria label.
   * It is used for reading aloud using aria-live.
   */
  @property({ type: String, reflect: true })
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

  @queryAssignedElements({ selector: "*" })
  private readonly _inners!: readonly HTMLElement[];

  override render() {
    return html`<div
      class="flex-none overflow-hidden"
      role="listitem"
      aria-label=${this.label}
      aria-hidden=${!this.active}
    >
      <slot tabindex="-1"></slot>
    </div>`;
  }

  /**
   * Presses on the inner item.
   */
  containerKeydown(): void {
    this._inners[0].click();
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "daikin-carousel-item": DaikinCarouselItem;
  }
}
