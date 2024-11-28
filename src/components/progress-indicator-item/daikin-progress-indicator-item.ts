import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import "../icon/daikin-icon";

const cvaContainer = cva(
  [
    "flex",
    "flex-col",
    "gap-2",
    "w-full",
    "text-system-element-text-primary",
    "pt-1",
    "pr-4",
    "border-t-[0.25rem]",
    "font-daikinSerif",
  ],
  {
    variants: {
      status: {
        unfinished: ["border-system-state-disabled"],
        inprogress: ["border-system-state-primary-active"],
        finished: ["border-system-state-primary-active"],
      },
    },
  }
);

type ProgressIndicatorItemVariantProps = MergeVariantProps<typeof cvaContainer>;

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
      min-width: 9rem;
    }
  `;

  /**
   * Status of the progress indicator item
   */
  @property({ type: String, reflect: true })
  status: ProgressIndicatorItemVariantProps["status"] = "unfinished";

  @property({ type: Boolean, reflect: true })
  current: boolean = false;

  override render() {
    return html`<div
      class=${cvaContainer({ status: this.status })}
      role="listitem"
      aria-current=${ifDefined(this.current ? "step" : undefined)}
    >
      <div class="flex justify-between gap-1 font-bold leading-5">
        <slot></slot>
        ${this.status === "finished"
          ? html`
              <span
                class="flex-none size-4 i-daikin-status-positive text-system-state-primary-active"
                aria-label="Completed"
              ></span>
            `
          : nothing}
      </div>
      <slot name="description" class="text-sm leading-[1.1rem]"></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-progress-indicator-item": DaikinProgressIndicatorItem;
  }
}

export default DaikinProgressIndicatorItem;
