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
      position: {
        left: ["i-daikin-chevron-left"],
        right: ["i-daikin-chevron-right"],
      },
    },
  }
);

const cvaItem = cva(["w-full", "overflow-clip", "relative"], {
  variants: {
    isItemFocus: {
      false: [],
      true: [
        "outline",
        "outline-2",
        "outline-offset-2",
        "outline-ddt-color-common-border-focus",
      ],
    },
  },
});

const INDICATOR_CLASS_NAME = cva([
  "flex",
  "justify-center",
  "items-center",
  "size-3",
  "m-1",
  "rounded-full",
  "transition",
  "bg-ddt-color-common-neutral-default",
  "relative",

  "hover:bg-ddt-color-common-neutral-hover",
  "active:bg-ddt-color-common-neutral-press",

  "aria-[selected=true]:after:block",
  "aria-[selected=true]:after:size-4",
  "aria-[selected=true]:after:bg-ddt-color-common-brand-default",
  "aria-[selected=true]:after:absolute",
  "aria-[selected=true]:after:rounded-full",
  "aria-[selected=true]:focus-visible:after:outline",
  "aria-[selected=true]:focus-visible:after:outline-1",
  "aria-[selected=true]:focus-visible:after:outline-offset-1",
  "aria-[selected=true]:focus-visible:after:outline-ddt-color-common-border-focus",
])();

/**
 * A carousel is a component that displays multiple pieces of information by sliding left and right within a fixed height area.
 *
 * The carousel component can be operated in several ways (Control, Indicator, and Swipe), but it is not possible to hide all of these, as this would prevent the user from being able to operate the carousel component.
 *
 * If you set the animation attribute to `manual`, the default slide animation will be removed and the current-index attribute will no longer be updated automatically. When using this, please combine it with the select event and have the user update the current-index attribute.
 *
 * Hierarchy:
 * - `daikin-carousel` > `daikin-carousel-item`
 *
 * @fires select - If an item in the carousel is selected in some way, the method used to select it, the index number of the item displayed before it, and the index number of the item currently displayed are passed.
 *
 * @slot - A slot for carousel items. Place `daikin-carousel-item` elements here.
 *
 * @example
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
    }
  `;

  /**
   * Specify the interval for the slide animation.
   * This is only used when animation="slide".
   */
  @property({ type: Number, reflect: true })
  duration = 600;

  /**
   * The index number of the content currently being displayed.
   */
  @property({ type: Number, reflect: true, attribute: "current-index" })
  currentIndex = 0;

  /**
   * Specify the variant of the control button.
   */
  @property({
    type: String,
    reflect: true,
    attribute: "control-button-variant",
  })
  controlButtonVariant: "ghost" | "fill" = "ghost";

  /**
   * Whether or not to allow content to be moved by swiping.
   */
  @property({ type: Boolean, reflect: true, attribute: "allow-swipe" })
  allowSwipe: boolean = false;

  @queryAssignedElements({ selector: "daikin-carousel-item" })
  private readonly _items!: readonly DaikinCarouselItem[];

  @state()
  private _itemCount: number = 0;

  @state()
  private _isItemFocus = false;

  private _swipeStartX: number | null = null;
  private _swipeEndX: number | null = null;

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

  private _handleFocusin() {
    this._isItemFocus = true;
  }

  private _handleFocusout() {
    this._isItemFocus = false;
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

    this._changeVisibleItem(moveOffset);
    buttons[this.currentIndex].focus();
  }

  private _handleMousedown(e: MouseEvent) {
    this._swipeStartX = e.pageX;
  }

  private _handleMouseup(e: MouseEvent) {
    this._swipeEndX = e.pageX;
    this._swipe();
  }

  private _handleTouchstart(e: TouchEvent) {
    this._swipeStartX = e.touches[0].pageX;
  }

  private _handleTouchmove(e: TouchEvent) {
    this._swipeEndX = e.changedTouches[0].pageX;
  }

  private _handleTouchend() {
    this._swipe();
  }

  private _changeVisibleItem(moveOffset: 1 | -1) {
    if (
      (moveOffset === -1 && this.currentIndex <= 0) ||
      (moveOffset === 1 && this.currentIndex >= this._itemCount - 1)
    ) {
      return;
    }

    const beforeCurrentIndex = this.currentIndex;

    this.currentIndex = this.currentIndex + moveOffset;
    this._emitSelect(moveOffset === 1 ? "next" : "prev", beforeCurrentIndex);
  }

  private _swipe() {
    const resetCoordinate = () => {
      this._swipeStartX = null;
      this._swipeEndX = null;
    };

    if (this._swipeStartX === null || this._swipeEndX === null) {
      return;
    }

    const result = this._swipeStartX - this._swipeEndX;

    // If the interval between touch operations is extremely short,
    // it is determined to be an erroneous operation and the process is terminated.
    if (Math.abs(result) < 10) {
      return;
    }

    this._changeVisibleItem(Math.sign(result) as 1 | -1);

    resetCoordinate();
  }

  override render() {
    return html`<div
      class="flex justify-center items-center flex-col gap-8"
      style=${`--translate-transition-duration:${this.duration}ms;`}
    >
      <div class="flex justify-center items-center w-full gap-4">
        <daikin-icon-button
          ${ref(this._prevButton)}
          variant=${this.controlButtonVariant}
          color="neutral"
          button-aria-label="Previous"
          ?disabled=${this.currentIndex <= 0}
          @click=${() => this._changeVisibleItem(-1)}
        >
          <span class=${cvaButton({ position: "left" })}></span>
        </daikin-icon-button>
        <div
          class=${cvaItem({ isItemFocus: this._isItemFocus })}
          aria-live="polite"
          @mousedown=${this._handleMousedown}
          @mouseup=${this._handleMouseup}
          @touchstart=${this._handleTouchstart}
          @touchmove=${this._handleTouchmove}
          @touchend=${this._handleTouchend}
        >
          <div
            class="flex w-[calc(100%*var(--total))] transition-transform translate-x-[calc(-100%*var(--current)/var(--total))] duration-[--translate-transition-duration]"
            style=${`--total:${this._itemCount};--current:${this.currentIndex};`}
          >
            <slot
              @focusin=${this._handleFocusin}
              @focusout=${this._handleFocusout}
            ></slot>
          </div>
        </div>
        <daikin-icon-button
          ${ref(this._nextButton)}
          variant=${this.controlButtonVariant}
          color="neutral"
          button-aria-label="Next"
          ?disabled=${this.currentIndex >= this._itemCount - 1}
          @click=${() => this._changeVisibleItem(1)}
        >
          <span class=${cvaButton({ position: "right" })}></span>
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

  protected override firstUpdated(): void {
    const items = this._items;
    this._itemCount = items.length;

    for (const [index, item] of items.entries()) {
      item.label = `${index + 1} of ${this._itemCount}`;
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("currentIndex")) {
      for (const [index, item] of this._items.entries()) {
        item.active = index === this.currentIndex;
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-carousel": DaikinCarousel;
  }
}
