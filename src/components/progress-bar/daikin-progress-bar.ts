import {
  colorFeedbackNegative,
  colorFeedbackPositive,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaBar = cva(
  [
    "w-full",
    "h-1",
    "bg-daikinNeutral-200",
    "overflow-hidden",
    "relative",
    "after:block",
    "after:h-full",
    "after:absolute",
    "after:left-0",
  ],
  {
    variants: {
      variant: {
        inprogress: ["after:w-[--bar-width]", "after:bg-daikinBlue-500"],
        completed: ["after:w-full", "after:bg-[--colorFeedbackPositive]"],
        indeterminate: [
          "after:w-1/2",
          "after:bg-daikinBlue-500",
          "after:animate-[progress-bar-indeterminate_1200ms_linear_infinite]",
        ],
        error: ["after:w-full", "after:bg-[--colorFeedbackNegative]"],
      },
    },
  }
);

const cvaIcon = cva(["size-4"], {
  variants: {
    variant: {
      inprogress: ["none"],
      completed: ["i-daikin-status-positive"],
      indeterminate: [],
      error: ["i-daikin-status-negative"],
    },
  },
});

const cvaHelper = cva(["text-xs", "mt-2"], {
  variants: {
    variant: {
      inprogress: [],
      completed: [],
      indeterminate: [],
      error: ["text-[--colorFeedbackNegative]"],
    },
  },
});

/**
 * The progress bar component is used to visually convey the progress to the user.
 *
 * There are four variants of the progress bar:
 *
 * - "inprogress": The default variant. Use this when you know the exact progress. The length of the bar is the ratio of `value` to `max`.
 * - "indeterminate": Use this variant when you don't know the exact progress. In this variant, the `value` is ignored and the bar always animates from left to right with a constant length.
 * - "completed": In addition to "inprogress", a completed icon is added. In this variant, the `value` is ignored and the bar always expands to the full width.
 * - "error": In addition to "inprogress", an error icon is added and the color becomes red. In this variant, the `value` is ignored and the bar always expands to the full width.
 *
 * @example
 *
 * ```html
 * <daikin-progress-bar value="40" helper="Progress bar helper">
 *   Progress bar label
 * </daikin-progress-bar>
 * ```
 */
@customElement("daikin-progress-bar")
export class DaikinProgressBar extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --colorFeedbackPositive: ${unsafeCSS(colorFeedbackPositive)};
      --colorFeedbackNegative: ${unsafeCSS(colorFeedbackNegative)};

      display: block;
      width: 100%;
    }
  `;

  /**
   * Value of the progress bar
   */
  @property({ type: Number })
  value: number = 0;

  /**
   * Variant of the progress bar
   */
  @property({ type: String })
  variant: "inprogress" | "completed" | "indeterminate" | "error" =
    "inprogress";

  /**
   * The max value of the progress bar
   */
  @property({ type: Number })
  max: number = 100;

  /**
   * Helper text
   */
  @property({ type: String })
  helper = "";

  // Validate the 'value' and 'max' properties to ensure they are valid
  private _validateProperties() {
    if (typeof this.value !== "number" || this.value < 0) {
      console.warn(
        `Invalid 'value' property: ${this.value}. Falling back to 0.`
      );
      this.value = 0;
    }

    if (typeof this.max !== "number" || this.max <= 0) {
      console.warn(`Invalid 'max' property: ${this.max}. Falling back to 100.`);
      this.max = 100;
    }

    if (this.value > this.max) {
      console.warn(
        `'value' property: ${this.value} exceeds 'max' property: ${this.max}. Clamping value to max.`
      );
      this.value = this.max;
    }
  }

  override render() {
    const progressRatio = Math.min(Math.max(this.value / this.max, 0), 1);

    return html`<div class="flex flex-col w-full font-daikinSerif">
      <div class="flex justify-between items-center mb-2.5">
        <span class="text-sm leading-[22px] font-medium"><slot></slot></span>
        <span class=${cvaIcon({ variant: this.variant })}></span>
      </div>
      <div
        class=${cvaBar({ variant: this.variant })}
        role="progressbar"
        aria-label=${this.textContent ?? ""}
        aria-valuenow=${this.value}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        style=${`--bar-width:${progressRatio * 100}%`}
      ></div>
      ${this.helper
        ? html`<span class=${cvaHelper({ variant: this.variant })}
            >${this.helper}</span
          >`
        : null}
    </div>`;
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("value") || changedProperties.has("max")) {
      this._validateProperties();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-progress-bar": DaikinProgressBar;
  }
}

export default DaikinProgressBar;
