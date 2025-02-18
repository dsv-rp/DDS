import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import { repeat } from "lit/directives/repeat.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinCarouselItem } from "../carousel-item/daikin-carousel-item";
import "../icon-button/daikin-icon-button";

const DEFAULT_TRANSITION_DURATION = "600ms";

const cvaButton = cva(
  [
    "flex",
    "justify-center",
    "items-center",
    "flex-none",
    "size-6",
    "text-current",
  ],
  {
    variants: {
      intent: {
        previous: ["i-daikin-chevron-left"],
        next: ["i-daikin-chevron-right"],
      },
    },
  }
);

const INDICATOR_CLASS_NAME = cva([
  "flex",
  "justify-center",
  "items-center",
  "size-3",
  "m-0.5",
  "rounded-full",
  "transition",
  "bg-ddt-color-common-neutral-default",
  "relative",

  "hover:bg-ddt-color-common-neutral-hover",
  "active:bg-ddt-color-common-neutral-press",

  "aria-selected:after:block",
  "aria-selected:after:size-4",
  "aria-selected:after:bg-ddt-color-common-brand-default",
  "aria-selected:after:absolute",
  "aria-selected:after:rounded-full",
  "aria-selected:focus-visible:after:outline",
  "aria-selected:focus-visible:after:outline-1",
  "aria-selected:focus-visible:after:outline-offset-1",
  "aria-selected:focus-visible:after:outline-ddt-color-common-border-focus",
])();

/**
 * A carousel is a component that displays multiple pieces of information by sliding left and right within a fixed height area.
 *
 * The carousel component can be operated in several ways (Control, Indicator, and Swipe), but it is not possible to hide all of these, as this would prevent the user from being able to operate the carousel component.
 *
 * Hierarchy:
 * - `daikin-carousel` > `daikin-carousel-item`
 *
 * @fires select - If an item in the carousel is selected in some way, the method used to select it, the index number of the item displayed before it, and the index number of the item currently displayed are passed.
 *
 * @slot - A slot for carousel items. Place `daikin-carousel-item` elements here.
 *
 * @cssprop [--ddc-transition-duration=600ms] - Specify the interval for the slide animation.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/carousel/index.js";
 * import "@daikin-oss/design-system-web-components/components/carousel-item/index.js";
 * ```
 *
 * ```html
 * <daikin-carousel>
 *   <daikin-carousel-item>Carousel item 1</daikin-carousel-item>
 *   <daikin-carousel-item>Carousel item 2</daikin-carousel-item>
 *   <daikin-carousel-item>Carousel item 3</daikin-carousel-item>
 * </daikin-carousel>
 * ```
 */
@customElement("daikin-carousel")
export class DaikinCarousel extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
      position: relative;

      --ddc-transition-duration: ${unsafeCSS(DEFAULT_TRANSITION_DURATION)};
    }
  `;

  /**
   * The index number of the content currently being displayed.
   */
  @property({ type: Number, reflect: true, attribute: "current-index" })
  currentIndex = 0;

  @queryAssignedElements({ selector: "daikin-carousel-item" })
  private readonly _items!: readonly DaikinCarouselItem[];

  @state()
  private _itemCount: number = 0;

  private _prevButton = createRef<HTMLButtonElement>();
  private _nextButton = createRef<HTMLButtonElement>();
  private _indicatorButtonsContainer = createRef<HTMLElement>();

  private _emitSelect(
    operation: "prev" | "next" | "indicator",
    beforeCurrentIndex: number
  ) {
    this.dispatchEvent(
      new CustomEvent("select", {
        detail: { operation, beforeCurrentIndex },
      })
    );
  }

  private _handleClickIndicator(index: number) {
    const beforeCurrentIndex = this.currentIndex;

    this.currentIndex = index;
    this._emitSelect("indicator", beforeCurrentIndex);
  }

  private _handleKeydownIndicator(event: KeyboardEvent): void {
    const moveOffset = (
      {
        ArrowRight: 1,
        ArrowLeft: -1,
      } as const
    )[event.key];

    if (!moveOffset) {
      return;
    }

    const buttons = [
      ...(this._indicatorButtonsContainer.value?.querySelectorAll("button") ??
        []),
    ];

    this._moveBy(moveOffset);
    buttons[this.currentIndex].focus();
  }

  private _handleSlotchange() {
    const items = this._items;

    this._itemCount = items.length;
    for (const [index, item] of items.entries()) {
      item.label = `${index + 1} of ${this._itemCount}`;
    }

    this._updateItemActive();
  }

  private _moveBy(moveOffset: 1 | -1) {
    const newIndex = this.currentIndex + moveOffset;
    if (newIndex < 0 || newIndex >= this._itemCount) {
      return;
    }

    const oldIndex = this.currentIndex;
    this.currentIndex = newIndex;
    this._emitSelect(moveOffset === 1 ? "next" : "prev", oldIndex);
  }

  private _updateItemActive() {
    const items = this._items;

    if (items.length - 1 < this.currentIndex) {
      if (import.meta.env.DEV) {
        console.warn(
          `Invalid 'current-index' property: ${this.currentIndex}. The number of actual 'daikin-carousel-item's exceeds the number of items.`
        );
      }

      return;
    }

    if (this.currentIndex < 0) {
      if (import.meta.env.DEV) {
        console.warn(
          `Invalid 'current-item' property: ${this.currentIndex}. Negative values cannot be set.`
        );
      }

      return;
    }

    for (const [index, item] of this._items.entries()) {
      item.active = index === this.currentIndex;
    }
  }

  override render() {
    return html`<div
      class="flex justify-center items-center flex-col gap-8"
      style=${`--total:${this._itemCount};--current:${this.currentIndex};`}
    >
      <div class="flex justify-center items-center w-full gap-4">
        <daikin-icon-button
          ${ref(this._prevButton)}
          variant="ghost"
          color="neutral"
          button-aria-label="Previous"
          ?disabled=${this.currentIndex <= 0}
          @click=${() => this._moveBy(-1)}
        >
          <span class=${cvaButton({ intent: "previous" })}></span>
        </daikin-icon-button>
        <div
          class="w-full overflow-clip relative focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ddt-color-common-border-focus"
          aria-live="polite"
        >
          <div
            class="flex w-[calc(100%*var(--total))] transition-transform translate-x-[calc(-100%*var(--current)/var(--total))] duration-[--ddc-transition-duration]"
          >
            <slot @slotchange=${this._handleSlotchange}></slot>
          </div>
        </div>
        <daikin-icon-button
          ${ref(this._nextButton)}
          variant="ghost"
          color="neutral"
          button-aria-label="Next"
          ?disabled=${this.currentIndex >= this._itemCount - 1}
          @click=${() => this._moveBy(1)}
        >
          <span class=${cvaButton({ intent: "next" })}></span>
        </daikin-icon-button>
      </div>
      <div class="flex gap-3">
        <div
          ${ref(this._indicatorButtonsContainer)}
          class="flex items-center gap-4"
          role="tablist"
          @keydown=${this._handleKeydownIndicator}
        >
          ${repeat(
            this._items,
            (_, index) => index,
            (_, index) =>
              html`<button
                class=${INDICATOR_CLASS_NAME}
                aria-label="Slide ${index + 1}"
                aria-selected=${this.currentIndex === index}
                role="tab"
                tabindex=${this.currentIndex === index ? 0 : -1}
                @click=${() => this._handleClickIndicator(index)}
              ></button>`
          )}
        </div>
      </div>
    </div>`;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("currentIndex")) {
      this._updateItemActive();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-carousel": DaikinCarousel;
  }
}
