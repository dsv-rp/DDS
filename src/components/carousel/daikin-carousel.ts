import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
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

const cvaIndicator = cva(
  [
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
    "focus-visible:after:outline",
    "focus-visible:after:outline-1",
    "focus-visible:after:outline-offset-1",
    "focus-visible:after:outline-ddt-color-common-border-focus",
  ],
  {
    variants: {
      active: {
        false: [],
        true: [
          "after:block",
          "after:size-4",
          "after:bg-ddt-color-common-brand-default",
          "after:absolute",
          "after:rounded-full",
        ],
      },
    },
  }
);

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
 * @csspart carousel-items-container - Customize the part that corresponds to the container element of the slot.
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
   * Specify the animation mode for the transition.
   *
   * - slide (default): A slide animation will be displayed.
   * - manual: No animation is displayed. Users can add animation as they wish.
   */
  @property({ type: String, reflect: true })
  animation: "slide" | "manual" = "slide";

  /**
   * Specify the interval for the slide animation.
   * This is only used when animation=“slide”.
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
   * Whether or not to allow content to be moved by swiping
   */
  @property({ type: Boolean, reflect: true, attribute: "allow-swipe" })
  allowSwipe: boolean = false;

  @queryAssignedElements({ selector: "daikin-carousel-item" })
  private readonly _items!: readonly DaikinCarouselItem[];

  @state()
  private _itemLength: number = 0;

  @state()
  private _swipeStartX: number | null = null;

  @state()
  private _swipeEndX: number | null = null;

  private _prevButton = createRef<HTMLButtonElement>();
  private _nextButton = createRef<HTMLButtonElement>();
  private _indicatorButtons = createRef<HTMLElement>();

  private _emitCarouselClick(event: Event) {
    event.preventDefault();

    this._items[this.currentIndex].click();
  }

  private _emitSelect(
    operation: "prev" | "next" | "indicator",
    beforeCurrentIndex: number,
    newCurrentIndex: number
  ) {
    this.dispatchEvent(
      new CustomEvent("select", {
        detail: { operation, beforeCurrentIndex, newCurrentIndex },
      })
    );
  }

  private _handleClick(index: number) {
    this._emitSelect("indicator", this.currentIndex, index);

    this.currentIndex = index;
  }

  private _handleKeydownCarousel(event: KeyboardEvent) {
    if ([" ", "Enter"].includes(event.key)) {
      this._emitCarouselClick(event);
    }
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

    const buttons = this._indicatorButtons.value
      ? [...this._indicatorButtons.value.querySelectorAll("button")]
      : undefined;
    const activeButtonIndex = buttons?.findIndex(
      (button) => button.getAttribute("tabIndex") === "0"
    );

    if (!buttons || activeButtonIndex === undefined) {
      return;
    }

    this._animation(moveOffset);
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

  private _animation(moveOffset: 1 | -1) {
    if (
      (moveOffset === -1 && this.currentIndex <= 0) ||
      (moveOffset === 1 && this.currentIndex >= this._itemLength - 1)
    ) {
      return;
    }

    const newCurrentIndex = this.currentIndex + moveOffset;
    this._emitSelect(
      moveOffset === 1 ? "next" : "prev",
      this.currentIndex,
      newCurrentIndex
    );

    this.currentIndex = newCurrentIndex;
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

    this._animation(Math.sign(result) as 1 | -1);

    resetCoordinate();
  }

  override render() {
    return html`<div
      class="flex justify-center items-center flex-col gap-8"
      style=${`--translate-transition-duration:${this.duration}ms;`}
    >
      <div class="flex justify-center items-center w-full gap-4">
        <daikin-icon-button
          variant=${this.controlButtonVariant}
          color="neutral"
          button-aria-label="Prev"
          ?disabled=${this.currentIndex <= 0}
          @click=${() => this._animation(-1)}
          ${ref(this._prevButton)}
        >
          <span class=${cvaButton({ position: "left" })}></span>
        </daikin-icon-button>
        <div
          class=${`w-full overflow-clip relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ddt-color-common-border-focus`}
          aria-live="polite"
          role="list"
          tabindex="0"
          @click=${this._emitCarouselClick}
          @keydown=${this._handleKeydownCarousel}
          @touchstart=${this._handleTouchstart}
          @touchmove=${this._handleTouchmove}
          @touchend=${this._handleTouchend}
          @mousedown=${this._handleMousedown}
          @mouseup=${this._handleMouseup}
        >
          <div
            class="flex w-[--default-width] transition-transform translate-x-[--translate-x-width] duration-[--translate-transition-duration]"
            part="carousel-items-container"
            style=${ifDefined(
              this.animation === "slide"
                ? `--default-width:calc(100% * ${this._itemLength}); --translate-x-width:calc(-1 * 100% / ${this._itemLength} * ${this.currentIndex});`
                : undefined
            )}
          >
            <slot></slot>
          </div>
        </div>
        <daikin-icon-button
          variant=${this.controlButtonVariant}
          color="neutral"
          button-aria-label="Next"
          ?disabled=${this.currentIndex >= this._itemLength - 1}
          @click=${() => this._animation(1)}
          ${ref(this._nextButton)}
        >
          <span class=${cvaButton({ position: "right" })}></span>
        </daikin-icon-button>
      </div>
      <div class="flex gap-3">
        <div
          ${ref(this._indicatorButtons)}
          class="flex items-center gap-4"
          role="tablist"
          @keydown=${this._handleKeydownIndicator}
        >
          ${repeat(
            this._items,
            (_, index) => index,
            (_, index) =>
              html`<button
                class=${cvaIndicator({
                  active: this.currentIndex === index,
                })}
                aria-label="Slide ${index + 1}"
                aria-selected=${`${this.currentIndex === index}` as const}
                role="tab"
                tabindex=${this.currentIndex === index ? 0 : -1}
                @click=${() => this._handleClick(index)}
              ></button>`
          )}
        </div>
      </div>
    </div>`;
  }

  protected override firstUpdated(): void {
    this._itemLength = this._items.length;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("currentIndex")) {
      this._items.forEach((item, i) => (item.active = i === this.currentIndex));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-carousel": DaikinCarousel;
  }
}
