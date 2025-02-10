import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

/**
 * The carousel item component is a child element within the `daikin-carousel` component.
 *
 * Hierarchy:
 * - `daikin-carousel` > `daikin-carousel-item`
 *
 * @slot - A slot for an image or slide.
 * @slot title - A slot for title text.
 * @slot description - A slot for description text.
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

  @queryAssignedElements({ slot: "title" })
  private readonly _titleElements!: readonly HTMLElement[];

  @queryAssignedElements({ slot: "description" })
  private readonly _descriptionElements!: readonly HTMLElement[];

  @state()
  private _hasTextContents = false;

  private _handleFooterSlotChange() {
    this._hasTextContents =
      this._titleElements.length > 0 || this._descriptionElements.length > 0;
  }

  override render() {
    return html`<div
      class="flex flex-col flex-none gap-3 text-ddt-color-common-text-primary font-daikinSerif overflow-hidden"
      role="tabpanel"
      aria-label=${this.label}
      aria-hidden=${!this.active}
    >
      <slot></slot>
      <div
        class="visible:flex flex-col gap-2"
        ?hidden=${!this._hasTextContents}
      >
        <slot
          name="title"
          class="leading-[130%] font-bold"
          @slotchange=${this._handleFooterSlotChange}
        ></slot>
        <slot
          name="description"
          class="text-sm"
          @slotchange=${this._handleFooterSlotChange}
        ></slot>
      </div>
    </div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "daikin-carousel-item": DaikinCarouselItem;
  }
}
