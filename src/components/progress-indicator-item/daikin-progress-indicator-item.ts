import { colorFeedbackNegative } from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import "../icon/daikin-icon";

const cvaContainer = cva(["flex", "flex-col", "h-[60px]", "font-daikinSerif"], {
  variants: {
    direction: {
      horizontal: ["w-full", "border-solid", "py-2", "border-t-2"],
      vertical: ["w-[154px]", "border-solid", "pt-0.5", "pl-3", "border-l-2"],
    },
    status: {
      unfinished: ["border-[#DCDCDC]"],
      inprogress: [],
      finished: ["border-daikinBlue-500"],
      error: ["border-[#DCDCDC]"],
      disabled: ["text-[#DCDCDC]", "border-[#DCDCDC]"],
    },
  },
});

const cvaIcon = cva([], {
  variants: {
    status: {
      unfinished: [],
      inprogress: [],
      finished: ["text-daikinBlue-500"],
      error: [],
      disabled: [],
    },
  },
});

const cvaDescription = cva(["text-xs", "leading-5"], {
  variants: {
    status: {
      unfinished: [],
      inprogress: [],
      finished: [],
      error: ["text-[--progress-indicator-item-text-color-error]"],
      disabled: [],
    },
  },
});

const ICON_MAP = {
  unfinished: null,
  inprogress: null,
  finished: "success",
  error: "error",
  disabled: null,
} as const;

type ProgressIndicatorItemVariantProps = MergeVariantProps<
  typeof cvaContainer | typeof cvaIcon | typeof cvaDescription
>;

/**
 * The progress indicator item component is a child element within the `daikin-progress-indicator` component, this represents one of the tasks that the user is working on.
 *
 * In addition to the name of each task, the progress of the task can be indicated, such as whether it is in progress or has not yet started.
 *
 * Hierarchy:
 * - `daikin-progress-indicator` > `daikin-progress-indicator-item`
 *
 * @slot - A slot for title content.
 * @slot description - A slot for description content.
 *
 * @example
 *
 * ```html
 * <daikin-progress-indicator-item state="unfinished">
 *   Title
 *   <span slot="description">Description</span>
 * </daikin-progress-indicator-item>
 * ```
 */
@customElement("daikin-progress-indicator-item")
export class DaikinProgressIndicatorItem extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --progress-indicator-item-text-color-error: ${unsafeCSS(
        colorFeedbackNegative
      )};

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

  @property({ type: String, reflect: true })
  direction: ProgressIndicatorItemVariantProps["direction"] = "horizontal";

  override render() {
    const progressIndicatorItemContainerClassName = cvaContainer({
      direction: this.direction,
      status: this.status,
    });
    const progressIndicatorItemIconClassName = cvaIcon({
      status: this.status,
    });
    const progressIndicatorItemDescriptionClassName = cvaDescription({
      status: this.status,
    });

    const icon = ICON_MAP[this.status];

    return html`<div class=${progressIndicatorItemContainerClassName}>
      <span class="flex items-center gap-2 text-sm leading-[22px]">
        <slot></slot>
        ${icon
          ? html`<div class=${progressIndicatorItemIconClassName}>
              <daikin-icon icon=${icon} color="current"></daikin-icon>
            </div>`
          : nothing}
      </span>
      <slot
        name="description"
        class=${progressIndicatorItemDescriptionClassName}
      ></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-progress-indicator-item": DaikinProgressIndicatorItem;
  }
}

export default DaikinProgressIndicatorItem;
