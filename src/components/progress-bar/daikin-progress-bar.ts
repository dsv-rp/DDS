import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaBar = cva(
  [
    "w-full",
    "bg-ddt-color-common-border-empty",
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
        inprogress: [
          "after:w-[--bar-width]",
          "after:bg-ddt-color-common-brand-default",
        ],
        completed: ["after:w-full", "after:bg-ddt-color-common-success"],
        indeterminate: [
          "after:w-1/2",
          "after:bg-ddt-color-common-brand-default",
          "after:animate-[progress-bar-indeterminate_1200ms_linear_infinite]",
        ],
        error: ["after:w-full", "after:bg-ddt-color-common-danger-default"],
      },
      size: {
        medium: ["h-1"],
        large: ["h-2"],
      },
    },
  }
);

const cvaBarContainer = cva(
  [
    "flex",
    "justify-between",
    "items-center",
    "text-ddt-color-common-text-primary",
    "leading-[130%]",
    "font-bold",
  ],
  {
    variants: {
      variant: {
        inprogress: [],
        completed: [
          "after:size-4",
          "after:bg-ddt-color-common-success",
          "after:i-daikin-status-positive",
        ],
        indeterminate: [],
        error: [
          "after:size-4",
          "after:text-ddt-color-common-danger-default",
          "after:i-daikin-status-error",
        ],
      },
    },
  }
);

const cvaHelper = cva(["text-sm", "leading-[130%]"], {
  variants: {
    variant: {
      inprogress: ["text-ddt-color-common-text-primary"],
      completed: ["text-ddt-color-common-text-primary"],
      indeterminate: ["text-ddt-color-common-text-primary"],
      error: ["text-ddt-color-common-danger-default", "font-bold"],
    },
    visible: {
      false: ["hidden"],
      true: [],
    },
  },
});

type ProgressBarVariantProps = MergeVariantProps<
  typeof cvaBar | typeof cvaHelper
>;

/**
 * The progress bar component is used to visually convey the progress to the user.
 *
 * There are four variants of the progress bar:
 *
 * - `"inprogress"`: The default variant. Use this when you know the exact progress. The length of the bar is the ratio of `value` to `max`.
 * - `"indeterminate"`: Use this variant when you don't know the exact progress. In this variant, the `value` is ignored and the bar always animates from left to right with a constant length.
 * - `"completed"`: In addition to `"inprogress"`, a completed icon is added. In this variant, the `value` is ignored and the bar always expands to the full width.
 * - `"error"`: In addition to `"inprogress"`, an error icon is added and the color becomes red. In this variant, the `value` is ignored and the bar always expands to the full width.
 *
 * @slot - A slot for label text displayed at the top of the progress bar.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/progress-bar/index.js";
 * ```
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
      display: block;
      width: 100%;
    }
  `;

  /**
   * Variant of the progress bar.
   */
  @property({ type: String })
  variant: ProgressBarVariantProps["variant"] = "inprogress";

  /**
   * Size of the progress bar
   */
  @property({ type: String, reflect: true })
  size: ProgressBarVariantProps["size"] = "medium";

  /**
   * Value of the progress bar.
   * Only used for `"inprogress"` variant.
   */
  @property({ type: Number })
  value: number = 0;

  /**
   * Max value of the progress bar.
   * Only used for `"inprogress"` variant.
   */
  @property({ type: Number })
  max: number = 100;

  /**
   * Helper text displayed at the bottom of the progress bar.
   */
  @property({ type: String })
  helper = "";

  // Validate the 'value' and 'max' properties to ensure they are valid
  private _validateProperties() {
    if (typeof this.value !== "number" || this.value < 0) {
      if (import.meta.env.DEV) {
        console.warn(
          `Invalid 'value' property: ${this.value}. Falling back to 0.`
        );
      }
      this.value = 0;
    }

    if (typeof this.max !== "number" || this.max <= 0) {
      if (import.meta.env.DEV) {
        console.warn(
          `Invalid 'max' property: ${this.max}. Falling back to 100.`
        );
      }
      this.max = 100;
    }

    if (this.value > this.max) {
      if (import.meta.env.DEV) {
        console.warn(
          `'value' property: ${this.value} exceeds 'max' property: ${this.max}. Clamping value to max.`
        );
      }
      this.value = this.max;
    }
  }

  override render() {
    const progressRatio = Math.min(Math.max(this.value / this.max, 0), 1);

    return html`<div class="flex flex-col gap-2 w-full font-daikinSerif">
      <div class=${cvaBarContainer({ variant: this.variant })}>
        <slot></slot>
      </div>
      <div
        class=${cvaBar({ variant: this.variant, size: this.size })}
        role="progressbar"
        aria-label=${this.textContent ?? ""}
        aria-valuenow=${this.value}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-busy=${(progressRatio < 1 && this.variant === "inprogress") ||
        this.variant === "indeterminate"}
        style=${`--bar-width:${progressRatio * 100}%`}
      ></div>
      <span
        class=${cvaHelper({
          variant: this.variant,
          visible: !!this.helper.length,
        })}
        aria-live="polite"
      >
        ${this.helper}
      </span>
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
