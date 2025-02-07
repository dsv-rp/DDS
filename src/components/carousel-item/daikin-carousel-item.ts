import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaCarousel = cva(
  [
    "flex",
    "flex-col",
    "flex-none",
    "text-ddt-color-common-text-primary",
    "font-daikinSerif",
    "overflow-hidden",
  ],
  {
    variants: {
      hasTextContents: {
        false: [],
        true: ["gap-3"],
      },
    },
  }
);

const trimmedText = (elements: readonly HTMLElement[]) =>
  elements.map(({ textContent }) => (textContent ?? "").trim()).join("");

/**
 * The carousel item component is a child element within the `daikin-carousel` component.
 *
 * Hierarchy:
 * - `daikin-carousel` > `daikin-carousel-item`
 *
 * @slot - A slot for carousel image content.
 * @slot title - A slot for carousel title content.
 * @slot description - A slot for carousel description content.
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
  private readonly _titles!: readonly HTMLElement[];

  @queryAssignedElements({ slot: "description" })
  private readonly _descriptions!: readonly HTMLElement[];

  @state()
  private _hasTextContents = false;

  private _handleSlotChange() {
    this._hasTextContents = !!(
      trimmedText(this._titles) + trimmedText(this._descriptions)
    ).length;
  }

  override render() {
    return html`<div
      class=${cvaCarousel({ hasTextContents: this._hasTextContents })}
      role="tabpanel"
      aria-label=${this.label}
      aria-hidden=${!this.active}
    >
      <slot></slot>
      <div class="flex flex-col gap-2">
        <slot
          name="title"
          class="leading-[130%] font-bold"
          @slotchange=${this._handleSlotChange}
        ></slot>
        <slot
          name="description"
          class="text-sm"
          @slotchange=${this._handleSlotChange}
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
