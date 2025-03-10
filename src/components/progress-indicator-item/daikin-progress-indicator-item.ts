import { cva } from "class-variance-authority";
import { css, html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

import "../icon/daikin-icon";

const cvaContainer = cva(
  [
    "flex",
    "gap-2",
    "w-full",
    "text-ddt-color-common-text-primary",
    "pt-2",
    "border-t-[0.25rem]",
    "font-daikinSerif",
  ],
  {
    variants: {
      status: {
        unfinished: ["border-ddt-color-common-border-empty"],
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
 * ```js
 * import "@daikin-oss/design-system-web-components/components/progress-indicator-item/index.js";
 * ```
 *
 * ```html
 * <daikin-progress-indicator-item state="unfinished">
 *   Progress indicator label
 *   <span slot="description">Progress indicator description</span>
 * </daikin-progress-indicator-item>
 * ```
 */
@ddsElement("daikin-progress-indicator-item")
export class DaikinProgressIndicatorItem extends DDSElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
      min-width: 9rem;
    }
  `;

  /**
   * Status of the progress indicator item.
   * Controlled by `daikin-progress-indicator`.
   */
  @property({ type: String, reflect: true })
  status: ProgressIndicatorItemVariantProps["status"] = "unfinished";

  override render() {
    return html`<div
      class=${cvaContainer({ status: this.status })}
      role="listitem"
      aria-current=${ifDefined(
        this.status === "inprogress" ? "step" : undefined
      )}
    >
      <div class="flex flex-col gap-1 w-full">
        <slot class="font-bold leading-[130%]"></slot>
        <slot name="description" class="text-sm leading-[130%]"></slot>
      </div>
      ${this.status === "finished"
        ? html`
            <span
              role="img"
              class="flex-none size-4 i-daikin-status-positive text-ddt-color-common-brand-default"
              aria-label="Completed"
            ></span>
          `
        : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-progress-indicator-item": DaikinProgressIndicatorItem;
  }
}

export default DaikinProgressIndicatorItem;
