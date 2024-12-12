import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
  state,
} from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { DaikinCarouselItem } from "../carousel-item/daikin-carousel-item";
import "../icon-button/daikin-icon-button";

type AnimationControlType = "prev" | "next";

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
    "bg-system-state-neutral-active",
    "relative",

    "hover:bg-system-state-neutral-hover",
    "active:bg-system-state-neutral-press",
    "focus-visible:after:outline",
    "focus-visible:after:outline-1",
    "focus-visible:after:outline-offset-1",
    "focus-visible:after:outline-system-state-focus",
  ],
  {
    variants: {
      active: {
        false: [],
        true: [
          "after:block",
          "after:size-4",
          "after:bg-system-brand-primary",
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
 * Hierarchy:
 * - `daikin-carousel` > `daikin-carousel-item`
 *
 * @fires select - When a carousel item is selected in some way, returns the index number of the currently displayed item.
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
@customElement("daikin-carousel-old")
export class DaikinCarouselOld extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
      position: relative;
    }

    :host([variant="fade"]) ::slotted(daikin-carousel-item) {
      opacity: 0;
      transition: opacity 0.4s;
      position: absolute;
    }

    :host([variant="fade"]) ::slotted(daikin-carousel-item[active]) {
      opacity: 1;
    }
  `;

  /**
   * Specify the animation type for the transition
   */
  @property({ type: String })
  variant: "slide" | "fade" = "slide";

  /**
   * Whether or not to allow content to be moved by swiping
   */
  @property({ type: Boolean, reflect: true, attribute: "allow-swipe" })
  allowSwipe: boolean = false;

  @property({ type: Number, reflect: true })
  duration = 600;

  @state()
  private _indicator: number[] = [];

  @state()
  private _currentIndex: number = 0;

  @state()
  private _indicatorIndex: number = 0;

  @state()
  private _duration: number = 0;

  @state()
  private _isLoading: boolean = false;

  @state()
  private _remaining: number = 0;

  @state()
  private _swipeStartX: number | null = null;

  @state()
  private _swipeEndX: number | null = null;

  @queryAssignedElements({ selector: "daikin-carousel-item" })
  private readonly _items!: readonly DaikinCarouselItem[];

  private _prevButton = createRef<HTMLButtonElement>();
  private _nextButton = createRef<HTMLButtonElement>();
  private _indicatorButtons = createRef<HTMLElement>();

  private _emitClick() {
    this._items[this._currentIndex].click();
  }

  private _handleClick(event: PointerEvent) {
    event.stopPropagation();

    this._emitClick();
  }

  private _handleKeydownCarousel(event: KeyboardEvent) {
    if ([" ", "Enter"].includes(event.key)) {
      this._emitClick();
    }
  }

  private _handleKeydownIndicator(event: KeyboardEvent): void {
    const moveOffset = (
      {
        ArrowRight: "next",
        ArrowLeft: "prev",
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

    switch (moveOffset) {
      case "next":
        if (activeButtonIndex === buttons.length - 1) {
          this._indicatorIndex = 0;
        } else {
          this._indicatorIndex = activeButtonIndex + 1;
        }
        break;

      case "prev":
        if (activeButtonIndex === 0) {
          this._indicatorIndex = buttons.length - 1;
        } else {
          this._indicatorIndex = activeButtonIndex - 1;
        }
        break;
    }

    buttons[this._indicatorIndex].focus();
    this._animation(moveOffset);
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

  private _handleSelect() {
    this.dispatchEvent(
      new CustomEvent("select", {
        detail: { index: this._currentIndex },
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
  }

  private _setTabIndex() {
    this._items.forEach((item, i) => (item.active = i === this._currentIndex));
  }

  /**
   * A function that controls the firing of animations.
   *
   * @param control "prev" | "next"
   */
  private _animation(control: AnimationControlType) {
    if (this._isLoading) {
      this._remaining = this._remaining + (control === "next" ? 1 : -1);
      return;
    }

    switch (this.variant) {
      case "slide": {
        if (!this._duration) {
          this._duration = this.duration;
        }

        this._isLoading = true;

        switch (control) {
          case "prev":
            this._slidePrevAnimation();
            break;

          case "next":
            this._slideNextAnimation();
            break;
        }

        break;
      }

      case "fade": {
        const items = this._items;

        switch (control) {
          case "prev":
            if (this._currentIndex === 0) {
              this._currentIndex = items.length - 1;
            } else {
              this._currentIndex = this._currentIndex - 1;
            }
            break;

          case "next":
            if (this._currentIndex === items.length - 1) {
              this._currentIndex = 0;
            } else {
              this._currentIndex = this._currentIndex + 1;
            }
            break;
        }

        this._setTabIndex();
        this._handleSelect();
        this._indicatorIndex = this._currentIndex;

        break;
      }
    }
  }

  private _indicatorAnimation(index: number) {
    this._currentIndex = index + 1;
    this._indicatorIndex = index;

    this._setTabIndex();
    this._handleSelect();
  }

  private _slidePrevAnimation() {
    const items = this._items;

    if (this._currentIndex < 2) {
      this._duration = 0;
      const clone = items[items.length - 1].cloneNode(true);
      this.prepend(clone);
      this._currentIndex = 2;

      void new Promise<void>((resolve) => {
        setTimeout(() => {
          this._duration = this.duration;
          this._currentIndex = 1;
          this._indicatorIndex = items.length - 3;
          resolve();
        }, 0);
      }).then(() => {
        void new Promise<void>((resolve) => {
          setTimeout(() => {
            this._duration = 0;
            this.removeChild(this.children[0]);
            this._currentIndex = items.length - 2;
            resolve();
          }, this._duration);
        }).then(() => {
          this._setTabIndex();
          this._handleSelect();
        });
      });
    } else {
      this._currentIndex = this._currentIndex - 1;
      this._indicatorIndex = this._currentIndex - 1;

      this._setTabIndex();
      this._handleSelect();
    }

    setTimeout(() => {
      this._isLoading = false;

      if (this._remaining) {
        this._remaining = this._remaining + 1;
        this._slidePrevAnimation();
      }
    }, this.duration);
  }

  private _slideNextAnimation() {
    if (this._currentIndex === this._items.length - 2) {
      void new Promise<void>((resolve) => {
        this._duration = 0;
        this.appendChild(this._items[2].cloneNode(true));
        resolve();
      }).then(() => {
        void new Promise<void>((resolve) => {
          setTimeout(() => {
            this._duration = this.duration;
            this._currentIndex = this._currentIndex + 1;
            this._indicatorIndex = 0;
            resolve();
          }, 0);
        }).then(() => {
          setTimeout(() => {
            this._duration = 0;
            this._currentIndex = 1;
            this.removeChild(this.children[this.children.length - 1]);
          }, this._duration);
        });
      });
    } else {
      this._currentIndex = this._currentIndex + 1;
      this._indicatorIndex = this._currentIndex - 1;
    }

    this._setTabIndex();
    this._handleSelect();

    setTimeout(() => {
      this._isLoading = false;

      if (this._remaining) {
        this._remaining = this._remaining - 1;
        this._slideNextAnimation();
      }
    }, this.duration);
  }

  private _swipe() {
    const resetCoordinate = () => {
      this._swipeStartX = null;
      this._swipeEndX = null;
    };

    if (this._swipeStartX === null || this._swipeEndX === null) {
      return;
    }

    if (this._isLoading) {
      resetCoordinate();
      return;
    }

    const result = this._swipeStartX - this._swipeEndX;

    // If the interval between touch operations is extremely short,
    // it is determined to be an erroneous operation and the process is terminated.
    if (Math.abs(result) < 10) {
      return;
    }

    if (Math.sign(result) === 1) {
      this._animation("next");
    } else {
      this._animation("prev");
    }

    resetCoordinate();
  }

  override render() {
    return html`<div
      class="flex justify-center items-center flex-col gap-8 w-full"
    >
      <div class="flex justify-center items-center gap-4 w-full">
        <daikin-icon-button
          variant="ghost"
          color="neutral"
          button-aria-label="Prev"
          @click=${() => this._animation("prev")}
          ${ref(this._prevButton)}
        >
          <span class=${cvaButton({ position: "left" })}></span>
        </daikin-icon-button>
        <div
          class=${`w-[calc(100%-80px)] overflow-clip relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-system-state-focus`}
          aria-live="polite"
          role="list"
          tabindex="0"
          @click=${this._handleClick}
          @keydown=${this._handleKeydownCarousel}
          @touchstart=${this._handleTouchstart}
          @touchmove=${this._handleTouchmove}
          @touchend=${this._handleTouchend}
          @mousedown=${this._handleMousedown}
          @mouseup=${this._handleMouseup}
        >
          <div
            class="flex w-[--default-width] transition-transform translate-x-[--translate-x-width] duration-[--translate-transition-duration]"
            style=${`--default-width:calc(100% * ${this._items.length}); --translate-x-width:calc(-1 * 100% / ${this._items.length} * ${this._currentIndex}); --translate-transition-duration:${this._duration}ms;`}
          >
            <slot></slot>
          </div>
        </div>
        <daikin-icon-button
          variant="ghost"
          color="neutral"
          button-aria-label="Next"
          @click=${() => this._animation("next")}
          ${ref(this._nextButton)}
        >
          <span class=${cvaButton({ position: "right" })}></span>
        </daikin-icon-button>
      </div>
      <div class="flex gap-3">
        <div
          ${ref(this._indicatorButtons)}
          class="flex items-center gap-4"
          @keydown=${this._handleKeydownIndicator}
        >
          ${this._indicator.map(
            (_, index) =>
              html`<button
                class=${cvaIndicator({
                  active: this._indicatorIndex === index,
                })}
                aria-label="Slide ${index + 1}"
                tabindex=${this._indicatorIndex === index ? 0 : -1}
                @click=${() => this._indicatorAnimation(index)}
              ></button>`
          )}
        </div>
      </div>
    </div>`;
  }

  protected override firstUpdated(): void {
    const items = this._items;

    if (this.variant === "slide") {
      this.prepend(items[items.length - 1].cloneNode(true));
      this.appendChild(items[0].cloneNode(true));
      this._currentIndex = 1;

      this._indicator = [...new Array(this._items.length - 2).keys()];
    }

    this._setTabIndex();
    this._duration = this.duration;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-carousel-old": DaikinCarouselOld;
  }
}
