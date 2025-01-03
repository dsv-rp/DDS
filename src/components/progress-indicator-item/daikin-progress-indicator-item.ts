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
    "gap-1",
    "w-full",
    "text-ddt-color-common-text-primary",
    "pt-2",
    "border-t-[0.25rem]",
    "font-daikinSerif",
    "leading-[130%]",
  ],
  {
    variants: {
      status: {
        unfinished: ["border-ddt-color-common-disabled"],
        inprogress: ["border-ddt-color-common-brand-default"],
        finished: ["border-ddt-color-common-brand-default"],
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
      <div class="flex justify-between gap-1 font-bold">
        <slot></slot>
        ${this.status === "finished"
          ? html`
              <span
                role="img"
                class="flex-none size-4 i-daikin-status-positive text-ddt-color-common-brand-default"
                aria-label="Completed"
              ></span>
            `
          : nothing}
      </div>
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
