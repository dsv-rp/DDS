import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import {
  cvaContainer,
  cvaContent,
  cvaTimestamp,
  formatDate,
} from "../../utils/notification-common";
import { reDispatch } from "../../utils/re-dispatch";
import type { ToastNotificationVariantProps } from "../toast-notification";

/**
 * The inline-notification component is a UI element used to inform users about important updates, alerts, or messages within an application.
 *
 * Alerts appear within the content of the application, usually embedded directly within a page or section.
 * Alerts are more persistent and are used to highlight important information or status updates that should remain visible to the user until they are acknowledged or the issue is resolved.
 *
 * @fires close - A custom event emitted when a user clicks the close button.
 *
 * @slot title - A slot for the inline-notification title content.
 * @slot description - A slot for the inline-notification description content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/inline-notification/index.js";
 * ```
 *
 * ```html
 * <daikin-inline-notification>
 *   <span slot="title">InlineNotification title</span>
 *   <span slot="description">InlineNotification description</span>
 * </daikin-inline-notification>
 * ```
 */
@customElement("daikin-inline-notification")
export class DaikinInlineNotification extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 100%;
    }
  `;

  /**
   * Status of inline-notification.
   */
  @property({ type: String })
  status: ToastNotificationVariantProps["status"] = "positive";

  /**
   * Specifies how to arrange the elements.
   */
  @property({ type: String })
  layout: ToastNotificationVariantProps["layout"] = "horizontal";

  /**
   * Specify the inline-notification's open state.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether to display the close button.
   */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /**
   * Whether to display the timestamp.
   */
  @property({ type: Boolean, reflect: true })
  timestamp = false;

  /**
   * Call the event registered in "close".
   */
  private _handleClickClose(event: Event) {
    this.open = false;
    reDispatch(this, event, new Event("close", event));
  }

  private _timestamp = formatDate(
    new Date().toLocaleDateString(undefined, { dateStyle: "medium" })
  );

  override render() {
    return this.open
      ? html`<aside
          class=${cvaContainer({ variant: "inline", status: this.status })}
          role="status"
        >
          <div class=${cvaContent({ layout: this.layout })}>
            <slot class="font-bold whitespace-nowrap" name="title"></slot>
            <p class="whitespace-nowrap overflow-hidden overflow-ellipsis">
              <slot name="description"></slot>
            </p>
            ${this.timestamp
              ? html`<span class=${cvaTimestamp({ layout: this.layout })}
                  >${this._timestamp}</span
                >`
              : nothing}
          </div>
          <slot name="action" class="flex-none"></slot>
          ${this.closable
            ? html`
                <daikin-icon-button
                  variant="ghost"
                  button-aria-label="Close"
                  @click=${this._handleClickClose}
                >
                  <span
                    class="flex size-6 text-ddt-color-common-text-secondary relative i-daikin-cross"
                  ></span>
                </daikin-icon-button>
              `
            : nothing}
        </aside>`
      : nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-inline-notification": DaikinInlineNotification;
  }
}
