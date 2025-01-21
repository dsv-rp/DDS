import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Ref } from "lit/directives/ref.js";
import { createRef, ref } from "lit/directives/ref.js";
import tailwindStyles from "../../tailwind.css?inline";
import {
  getValueAndProgressFromCoordinate,
  getValueAndProgressFromKeyboard,
} from "./slider-utils";

const cvaSliderThumb = cva(
  [
    "absolute",
    "top-1/2",
    "-translate-x-1/2",
    "-translate-y-1/2",
    "w-4",
    "h-4",
    "rounded-full",
  ],
  {
    variants: {
      disabled: {
        false: [
          "cursor-pointer",
          "bg-ddt-color-common-brand-default",
          "hover:bg-ddt-color-common-brand-hover",
          "active:bg-ddt-color-common-brand-press",
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

const cvaSlider = cva(["w-full", "h-6", "relative"], {
  variants: {
    disabled: {
      false: ["cursor-pointer"],
      true: ["pointer-events-none"],
    },
  },
});

const cvaSliderTrack = cva(
  ["absolute", "top-1/2", "-translate-y-1/2", "left-0", "h-1"],
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
 * The slider component is a UI element that reflect a range of values along a bar.
 * It functions similarly to the HTML `<input type="range">` tag, enabling users to specify a numeric value which must be no less than a given min value, and no more than max value.
 * This component is ideal for cases where user want specify a value and the precise is not considered important.
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
   * The lowest value in the range of permitted values.
   */
  @property({ type: String, reflect: true })
  min = "1";

  /**
   * The greatest value in the range of permitted values.
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
   * The form value, submitted as a name/value pair when submitting the form.
   */
  @property({ type: String, reflect: true })
  value = "1";

  /**
   * Specify the slider disabled state.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  static readonly formAssociated = true;

  private _sliderRef: Ref<HTMLElement> = createRef();

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

  private _updateProgressFromValue() {
    const min = parseFloat(this.min);
    const max = parseFloat(this.max);
    const valueCalc = Math.max(min, Math.min(parseFloat(this.value), max));
    return ((valueCalc - min) / (max - min)) * 100;
  }

  // This function will triggered when click the slider bar area.
  private _handleClick(event: MouseEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }
    const leftDistance = this.getThumbFraction(event);
    if (leftDistance == null) {
      return;
    }
    const value = getValueAndProgressFromCoordinate(this, leftDistance);
    this.value = value;
  }

  // This function will triggered when the slider thumb button be focused and click keyboard arrow key.
  private _handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }
    if (event.key === "Home") {
      this.value = this.min;
      return;
    }
    if (event.key === "End") {
      this.value = this.max;
      return;
    }
    const step = parseFloat(this.step);
    const moveOffset = {
      ArrowRight: step,
      ArrowDown: -step,
      ArrowLeft: -step,
      ArrowUp: step,
    }[event.key];
    if (!moveOffset) {
      return;
    }
    const value = getValueAndProgressFromKeyboard(this, moveOffset);
    this.value = value;
  }

  // Get the position of the current thumb icon as a fraction of the entire slider bar.
  private getThumbFraction(event: MouseEvent) {
    const sliderRef = this._sliderRef.value?.getBoundingClientRect();
    if (sliderRef == null) {
      return;
    }
    const newLeft = Math.max(
      0,
      Math.min(event.clientX - sliderRef.left, sliderRef.width)
    );
    return newLeft / sliderRef.width;
  }

  // This function will triggered when the slider thumb button start dragging.
  private _startDrag(event: MouseEvent) {
    event.preventDefault();
    if (this.disabled) {
      return;
    }

    const onDrag = (event: MouseEvent) => {
      const leftDistance = this.getThumbFraction(event);
      if (leftDistance == null) {
        return;
      }
      const value = getValueAndProgressFromCoordinate(this, leftDistance);
      this.value = value;
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  }

  override render() {
    const progress = this._updateProgressFromValue();
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <div
        id="slider"
        ${ref(this._sliderRef)}
        class=${cvaSlider({ disabled: this.disabled })}
        @mousedown=${this._startDrag}
        @click=${this._handleClick}
      >
        <span
          class="w-full absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-ddt-color-common-border-empty"
        >
        </span>
        <span
          class=${cvaSliderTrack({ disabled: this.disabled })}
          style="width: ${progress}%"
        >
        </span>
        <span
          class=${cvaSliderThumb({ disabled: this.disabled })}
          tabindex=${this.disabled ? -1 : 0}
          style="left: ${progress}%"
          role="slider"
          aria-valuenow=${this.value}
          aria-valuemin=${this.min}
          aria-valuemax=${this.max}
          aria-label="slider"
          @mousedown=${this._startDrag}
          @keydown=${this._handleKeyDown}
        >
          <input
            class="absolute"
            type="hidden"
            name=${this.name}
            min=${this.min}
            max=${this.max}
            .step=${this.step}
            ?disabled=${this.disabled}
            .value=${this.value}
          />
        </span>
      </div>
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
