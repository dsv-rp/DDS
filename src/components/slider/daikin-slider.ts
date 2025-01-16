import { cva } from "class-variance-authority";
import { css, html, LitElement, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

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

  @state()
  private progress = 1;

  @query("#slider")
  private readonly _slider!: HTMLElement;

  // define _internals to let the slider can be used in a form
  private _internals = this.attachInternals();

  private _handleChange(event: Event) {
    this._updateFormValue();
    this.dispatchEvent(new Event("change", event));
  }

  private _handleInput(event: Event) {
    this._updateFormValue();
    this.dispatchEvent(new Event("input", event));
  }

  private _updateFormValue() {
    this._internals.setFormValue(!this.disabled ? this.value : null);
  }

  private _updateProgressFromValue() {
    const valueCalc = parseFloat(this.value);
    const min = parseFloat(this.min);
    const max = parseFloat(this.max);
    const step = parseFloat(this.step);
    this.progress = ((valueCalc - step) / ((max - min) / step)) * 100;
  }

  private _handleClick(event: MouseEvent) {
    event.preventDefault();
    const sliderRef = this._slider.getBoundingClientRect();
    const step = parseFloat(this.step);
    const newLeft = Math.max(
      0,
      Math.min(event.clientX - sliderRef.left, sliderRef.width)
    );
    this.progress = (newLeft / (sliderRef.width / step)) * 100;
    this._updateValue(newLeft / sliderRef.width);
  }

  private _handleKeyDown(event: KeyboardEvent) {
    event.preventDefault();
    const min = parseFloat(this.min);
    const max = parseFloat(this.max);
    const step = parseFloat(this.step);
    const value = parseFloat(this.value);
    const moveOffset = {
      ArrowRight: step,
      ArrowDown: -step,
      ArrowLeft: -step,
      ArrowUp: step,
    }[event.key];
    if (!moveOffset) {
      return;
    }

    const decimals = this.step.includes(".")
      ? this.step.split(".")[1].length
      : 0;
    const clampedValue = Math.max(
      min,
      Math.min(max, parseFloat((value + moveOffset).toFixed(decimals)))
    );
    this.progress = ((clampedValue - step) / (max + min)) * 100;
    this.value = `${clampedValue}`;
  }

  private _startDrag(event: MouseEvent) {
    event.preventDefault();
    const sliderRef = this._slider.getBoundingClientRect();
    const step = parseFloat(this.step);

    const onDrag = (event: MouseEvent) => {
      const newLeft = Math.max(
        0,
        Math.min(event.clientX - sliderRef.left, sliderRef.width)
      );
      this._updateValue(newLeft / (sliderRef.width / step));
    };

    const stopDrag = () => {
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("mouseup", stopDrag);
    };

    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
  }

  private _updateValue(ratio: number) {
    this.progress = ratio * 100;
    const min = parseFloat(this.min);
    const max = parseFloat(this.max);
    const step = parseFloat(this.step);

    const decimals = this.step.includes(".")
      ? this.step.split(".")[1].length
      : 0;

    const rawValue = ratio * (max - min) + min;
    const steppedValue = Math.round(rawValue / step) * step;
    const clampedValue = Math.max(
      min,
      Math.min(max, parseFloat(steppedValue.toFixed(decimals)))
    );
    this.value = `${clampedValue}`;
  }

  override render() {
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return html`
      <div
        id="slider"
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
          style="width: ${this.progress}%"
        >
        </span>
        <span
          class=${cvaSliderThumb({ disabled: this.disabled })}
          ?disabled=${this.disabled}
          tabindex="0"
          style="left: ${this.progress}%"
          @mousedown=${this._startDrag}
          @keydown=${this._handleKeyDown}
        >
        </span>
        <input
          class="absolute"
          type="hidden"
          name=${this.name}
          min=${this.min}
          max=${this.max}
          .step=${this.step}
          ?disabled=${this.disabled}
          .value=${this.value}
          @change=${this._handleChange}
          @input=${this._handleInput}
        />
      </div>
    `;
  }

  override updated(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has("value")) {
      return;
    }
    this._updateProgressFromValue();
    this._updateFormValue();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-slider": DaikinSlider;
  }
}
