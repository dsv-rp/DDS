import { css, html, LitElement, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import {
  cvaContainer,
  cvaContent,
  cvaTimestamp,
  formatDate,
  TOAST_DURATION,
} from "../../utils/notification-common";
import "../icon-button/daikin-icon-button";

export type ToastNotificationVariantProps = MergeVariantProps<
  typeof cvaContainer | typeof cvaContent | typeof cvaTimestamp
>;

/**
 * The toast notification component is a UI element used to inform users about important updates, alerts, or messages within an application.
 *
 * ToastNotifications are brief messages that should appear temporarily at the edge of the screen, typically in the bottom or top corner.
 * ToastNotifications are ideal for conveying transient information that does not require user interaction, such as success messages, warnings, or alerts. \
 * Please note that **currently we don't support automatic placement or stacking of toast notifications**.
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
@customElement("daikin-toast-notification")
export class DaikinToastNotification extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
      width: 480px;
    }
  `;

  /**
   * Name of toast-notification.
   */
  @property({ type: String, reflect: true })
  name = "";

  /**
   * Status of toast-notification.
   */
  @property({ type: String })
  status: ToastNotificationVariantProps["status"] = "positive";

  /**
   * Specifies how to arrange the elements.
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
   * Call the event registered in "close".
   */
  private _handleClickClose(event: Event) {
    this.dispatchEvent(new Event("close", event));
  }

  private get _timestamp(): string | null {
    return this.timestamp ? formatDate(this.timestamp) : null;
  }

  override render() {
    return html`<aside
      class=${cvaContainer({ variant: "toast", status: this.status })}
      role="alert"
      style=${`transform:translateX(var(--move-offset-x,0)) translateY(var(--move-offset-y,0));opacity:var(--opacity,1);pointer-events:var(--pointer-events,auto);transition-duration:var(--transition-duration,${TOAST_DURATION}ms);`}
    >
      <div class=${cvaContent({ layout: this.layout })}>
        <slot class="font-bold whitespace-nowrap" name="title"></slot>
        <p class="whitespace-nowrap overflow-hidden overflow-ellipsis">
          <slot name="description"></slot>
        </p>
        ${this._timestamp
          ? html`<span class=${cvaTimestamp({ layout: this.layout })}
              >${this._timestamp}</span
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
    </aside>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-toast-notification": DaikinToastNotification;
  }
}
