import { css, html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { DDSElement, ddsElement } from "../../base";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import {
  cvaContainer,
  cvaContent,
  cvaDescription,
  cvaTimestamp,
  cvaTitle,
  formatDate,
  TOAST_ANIMATION_DURATION,
} from "../../utils/notification-common";

import "../icon-button/daikin-icon-button";

export type ToastNotificationVariantProps = MergeVariantProps<
  typeof cvaContainer | typeof cvaContent | typeof cvaTimestamp
>;

/**
 * The toast notification component is a UI element used to inform users about important updates, alerts, or messages within an application.
 *
 * Toast notification displays a brief message that should appear temporarily at the edge of the screen, typically in the bottom or top corner.
 * Toast notification is ideal for conveying transient information that does not require user interaction, such as success messages, warnings, or alerts.
 *
 * Hierarchy:
 * - `daikin-toast-notification-manager` > `daikin-toast-notification`
 *
 * @tokenImports ../../utils/notification-common.ts
 *
 * @fires close - A custom event emitted when a user clicks the close button.
 *
 * @slot A slot for the toast notification description content.
 * @slot title - A slot for the toast notification title content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/toast-notification/index.js";
 * ```
 *
 * ```html
 * <daikin-toast-notification>
 *   <span slot="title">ToastNotification title</span>
 *   <span slot="description">ToastNotification description</span>
 * </daikin-toast-notification>
 * ```
 */
@ddsElement("daikin-toast-notification")
export class DaikinToastNotification extends DDSElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;

      --ddc-toast-animation-duration: ${unsafeCSS(TOAST_ANIMATION_DURATION)}ms;
    }
  `;

  /**
   * Name of the toast notification.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Status of the toast notification.
   */
  @property({ type: String })
  status: ToastNotificationVariantProps["status"] = "positive";

  /**
   * Specify how to arrange the elements.
   */
  @property({ type: String })
  layout: ToastNotificationVariantProps["layout"] = "horizontal";

  /**
   * Whether to display the close button.
   */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /**
   * The timestamp to display.
   */
  @property({ type: Object, reflect: true, attribute: false })
  timestamp: Date | null = null;

  /**
   * Specify how long to display the toast (in msec).
   * If `null` is specified, the toast will not be automatically closed.
   */
  @property({ type: Number, reflect: true })
  duration: number | null = null;

  /**
   * Emits a "close" event.
   */
  private _handleClickClose(event: Event) {
    this.dispatchEvent(new Event("close", event));
  }

  override render() {
    return html`<div
      class=${cvaContainer({ variant: "toast", status: this.status })}
      role="alert"
    >
      <div class=${cvaContent({ layout: this.layout })}>
        <slot class=${cvaTitle({ layout: this.layout })} name="title"></slot>
        <slot
          class=${cvaDescription({ layout: this.layout })}
          name="description"
        ></slot>
        ${this.timestamp
          ? html`<span class=${cvaTimestamp({ layout: this.layout })}
              >${formatDate(this.timestamp)}</span
            >`
          : nothing}
      </div>
      <slot name="action" class="flex-none"></slot>
      ${this.closable
        ? html`<daikin-icon-button
            variant="ghost"
            button-aria-label="Close"
            @click=${this._handleClickClose}
          >
            <span
              class="flex size-6 text-ddt-color-common-text-secondary relative i-daikin-cross"
            ></span>
          </daikin-icon-button>`
        : nothing}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-toast-notification": DaikinToastNotification;
  }
}
