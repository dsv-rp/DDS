import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { createRef, ref, type Ref } from "lit/directives/ref.js";
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

  private readonly _clickableRef: Ref<HTMLElement> = createRef();

  override render() {
    return html`<div
      ${ref(this._clickableRef)}
      class="flex-none overflow-hidden"
      role="listitem"
      aria-label=${this.label}
      aria-hidden=${ifDefined(!this.active || undefined)}
    >
      <slot tabindex="-1"></slot>
    </div>`;
  }

  /**
   * Clicks on the inner item.
   */
  override click(): void {
    this._clickableRef.value?.click();
  }

  /**
   * Presses on the inner item.
   */
  keydown(): void {
    this._clickableRef.value?.click();
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "daikin-carousel-item": DaikinCarouselItem;
  }
}
