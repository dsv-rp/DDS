import {
  colorFeedbackNegative,
  colorFeedbackPositive,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";

const cvaBar = cva(["w-full", "h-1", "overflow-hidden"], {
  variants: {
    variant: {
      inprogress: [
        "bg-[#DCDCDC]",
        "relative",
        "after:block",
        "after:w-[--bar-width]",
        "after:h-full",
        "after:bg-[#0097e0]",
        "after:absolute",
        "after:left-0",
      ],
      completed: ["bg-[--colorFeedbackPositive]"],
      indeterminate: [
        "bg-[#DCDCDC]",
        "relative",
        "after:block",
        "after:w-1/2",
        "after:h-full",
        "after:bg-[#0097e0]",
        "after:absolute",
        "after:left-0",
        "after:animate-[progress-bar-indeterminate_1200ms_linear_infinite]",
      ],
      error: ["bg-[--colorFeedbackNegative]"],
    },
  },
});

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
 * A progress bar component.
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

  override render() {
    const progressRatio = Math.min(Math.max(this.value / this.max, 0), 1);

    return html`<div class="flex flex-col w-full font-daikinSerif">
      <div class="flex justify-between items-center mb-2.5">
        <span class="text-sm leading-[22px] font-medium"><slot></slot></span>
        <span class=${cvaIcon({ variant: this.variant })}></span>
      </div>
      <div
        class=${cvaBar({ variant: this.variant })}
        style=${`--bar-width:${progressRatio * 100}%`}
      ></div>
      ${this.helper
        ? html`<span class=${cvaHelper({ variant: this.variant })}
            >${this.helper}</span
          >`
        : null}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-progress-bar": DaikinProgressBar;
  }
}

export default DaikinProgressBar;
