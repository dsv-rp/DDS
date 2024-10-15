import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import "../icon/daikin-icon";

const cvaContainer = cva(
  [
    "flex",
    "flex-col",
    "gap-1",
    "w-full",
    "border-solid",
    "pt-1",
    "border-t-4",
    "font-daikinSerif",
  ],
  {
    variants: {
      status: {
        unfinished: ["border-daikinNeutral-200"],
        inprogress: ["border-daikinBlue-500"],
        finished: ["border-daikinBlue-500"],
      },
    },
  }
);

const cvaLabel = cva(["flex", "items-center", "gap-2", "font-bold"], {
  variants: {
    status: {
      unfinished: [],
      inprogress: [],
      finished: [
        "after:size-4",
        "after:i-daikin-status-success",
        "after:text-daikinBlue-500",
      ],
    },
  },
});

type ProgressIndicatorItemVariantProps = MergeVariantProps<
  typeof cvaContainer | typeof cvaLabel
>;

/**
 * The progress indicator item component is a child element within the `daikin-progress-indicator` component, this represents one of the tasks that the user is working on.
 *
 * In addition to the name of each task, the progress of the task can be indicated, such as whether it is in progress or has not yet started.
 *
 * Hierarchy:
 * - `daikin-progress-indicator` > `daikin-progress-indicator-item`
 *
 * @slot - A slot for label content.
 * @slot description - A slot for description content.
 *
 * @example
 *
 * ```html
 * <daikin-progress-indicator-item state="unfinished">
 *   Progress indicator label
 *   <span slot="description">Progress indicator description</span>
 * </daikin-progress-indicator-item>
 * ```
 */
@customElement("daikin-progress-indicator-item")
export class DaikinProgressIndicatorItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
      min-width: 142px;
    }
  `;

  /**
   * Status of the progress indicator item
   */
  @property({ type: String, reflect: true })
  status: ProgressIndicatorItemVariantProps["status"] = "unfinished";

  override render() {
    return html`<div
      class=${cvaContainer({
        status: this.status,
      })}
    >
      <slot class=${cvaLabel({ status: this.status })}></slot>
      <slot name="description" class="text-sm"></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-progress-indicator-item": DaikinProgressIndicatorItem;
  }
}

export default DaikinProgressIndicatorItem;
