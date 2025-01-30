import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import tailwindStyles from "../../tailwind.css?inline";
import { getValueByKeydown, getValueFromRatio } from "./slider-utils";

const cvaSliderThumb = cva(
  [
    "absolute",
    "top-1/2",
    "-translate-x-1/2",
    "-translate-y-1/2",
    "w-4",
    "h-4",
    "rounded-full",
    "left-[--slider-ratio]",
  ],
  {
    variants: {
      disabled: {
        false: [
          "cursor-pointer",
          "[&:not([data-dragging])]:bg-ddt-color-common-brand-default",
          "[&:not([data-dragging])]:hover:bg-ddt-color-common-brand-hover",
          "[&:not([data-dragging])]:active:bg-ddt-color-common-brand-press",
          "data-[dragging]:bg-ddt-color-common-brand-press",
          "focus-visible:outline",
          "focus-visible:outline-2",
          "focus-visible:outline-offset-2",
          "focus-visible:outline-ddt-color-common-border-focus",
        ],
        true: ["bg-ddt-color-common-disabled", "pointer-events-none"],
      },
    },
  }
);

const cvaSliderTrack = cva(
  [
    "absolute",
    "top-1/2",
    "-translate-y-1/2",
    "left-0",
    "h-1",
    "w-[--slider-ratio]",
  ],
  {
    variants: {
      disabled: {
        false: ["bg-ddt-color-common-brand-default"],
        true: ["bg-ddt-color-common-border-empty"],
      },
    },
  }
);

/**
 * The slider component is a control that allows users to input numerical values within a specific range intuitively.
 * It functions similarly to the HTML `<input type="range">` tag, allows you to set the range of values.
 *
 * @fires change - A retargeted event of a [change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event) emitted from the inner `<input type="range">` element.
 * @fires input - A retargeted event of a [input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event).
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/slider/index.js";
 * ```
 *
 * ```html
 * <daikin-slider name="name" value="1" min="1" max="100" step="1"></daikin-slider>
 * ```
 */
@customElement("daikin-slider")
export class DaikinSlider extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: inline-flex;
      width: 100%;
    }
  `;

  /**
   * The smallest value in the range of permitted values.
   */
  @property({ type: String, reflect: true })
  min = "1";

  /**
   * The largest value in the range of permitted values.
   */
  @property({ type: String, reflect: true })
  max = "100";

  /**
   * The step attribute is a number that specifies the granularity that the value must adhere to.
   */
  @property({ type: String, reflect: true })
  step = "1";

  /**
   * The form name, submitted as a name/value pair when submitting the form.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * The current value of the slider.
   * Also used as a form value.
   */
  @property({ type: String, reflect: true })
  value = this.min;

  /**
   * Specify the slider disabled state.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The aria-label of the slider.
   */
  @property({ type: String, reflect: true, attribute: "slider-aria-label" })
  sliderAriaLabel = "slider";

  static readonly formAssociated = true;

  private _sliderRef: Ref<HTMLElement> = createRef();

  private _thumbRef: Ref<HTMLElement> = createRef();

  // define _internals to let the slider can be used in a form
  private _internals = this.attachInternals();

  private _updateFormValue() {
    if (this.disabled) {
      return;
    }
    this._internals.setFormValue(this.value);
    this.dispatchEvent(
      new Event("change", {
        bubbles: true,
        composed: true,
      })
    );
    this.dispatchEvent(
      new Event("input", {
        bubbles: true,
        composed: true,
      })
    );
  }

  private get _progress(): number {
    const min = parseFloat(this.min);
    const max = parseFloat(this.max);
    const clampedValue = Math.max(min, Math.min(parseFloat(this.value), max));
    return ((clampedValue - min) / (max - min)) * 100;
  }

  private _handleDrag(event: MouseEvent | TouchEvent): void {
    const leftDistance = this._calcMousePositionRatio(event);
    if (leftDistance == null) {
      return;
    }
    const value = getValueFromRatio(this, leftDistance);
    this.value = value;
  }

  // This function is called when an arrow key is pressed while the thumb is focused.
  private _handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    const value = getValueByKeydown(this, event.key);
    if (value == null) {
      return;
    }
    this.value = value;
    event.preventDefault();
  }

  /**
   * Returns a normalized value of the mouse position on the slider, in the range 0 to 1.
   *
   * @param event A MouseEvent.
   * @returns The mouse's X coordinate normalized to a range of 0 to 1. The left end and beyond of the slider is 0, and the right end and beyond is 1.
   */
  private _calcMousePositionRatio(
    event: MouseEvent | TouchEvent
  ): number | undefined {
    const box = this._sliderRef.value?.getBoundingClientRect();
    if (box == null) {
      return;
    }
    const x =
      event instanceof MouseEvent
        ? event.clientX
        : event.targetTouches[0].clientX;
    const relativeX = x - box.left;
    return Math.max(0, Math.min(relativeX / box.width, 1));
  }

  // This function will triggered when the slider thumb button start dragging.
  private _startDrag(event: MouseEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    this._thumbRef.value?.setAttribute("data-dragging", "");
    document.addEventListener(
      "mousemove",
      (event): void => {
        this._handleDrag(event);
      },
      { signal }
    );
    document.addEventListener(
      "mouseup",
      (): void => {
        this._thumbRef.value?.removeAttribute("data-dragging");
        controller.abort();
      },
      { once: true }
    );
    this._handleDrag(event);
  }

  // This function will triggered when the slider thumb button start dragging.
  private _startTouch(event: TouchEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    this._thumbRef.value?.setAttribute("data-dragging", "");
    document.addEventListener(
      "touchmove",
      (event): void => {
        this._handleDrag(event);
      },
      { signal }
    );
    document.addEventListener(
      "touchend",
      (): void => {
        this._thumbRef.value?.removeAttribute("data-dragging");
        controller.abort();
      },
      { once: true }
    );
    this._handleDrag(event);
  }

  override render() {
    const progress = this._progress;

    return html`
      <span
        ${ref(this._sliderRef)}
        class="w-full h-6 relative"
        style="--slider-ratio:${progress}%"
        @mousedown=${this._startDrag}
        @touchstart=${this._startTouch}
      >
        <span
          class="w-full absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-ddt-color-common-border-empty"
        ></span>
        <span class=${cvaSliderTrack({ disabled: this.disabled })}></span>
        <span
          ${ref(this._thumbRef)}
          class=${cvaSliderThumb({ disabled: this.disabled })}
          tabindex=${this.disabled ? -1 : 0}
          role="slider"
          aria-valuenow=${this.value}
          aria-valuemin=${this.min}
          aria-valuemax=${this.max}
          aria-label=${this.sliderAriaLabel}
          aria-disabled=${this.disabled}
          @mousedown=${this._startDrag}
          @keydown=${this._handleKeyDown}
        ></span>
      </span>
    `;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }
    this._updateFormValue();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-slider": DaikinSlider;
  }
}
