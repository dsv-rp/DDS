import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import {
  cvaContainer,
  cvaContent,
  cvaDescription,
  cvaTimestamp,
  cvaTitle,
  formatDate,
} from "../../utils/notification-common";
import type { ToastNotificationVariantProps } from "../toast-notification";

/**
 * The inline notification component is a UI element used to inform users about important updates, alerts, or messages within an application.
 *
 * An inline notification appears within the content of the application, usually embedded directly within a page or section.
 * Inline notification is more persistent than toast notification and are used to highlight important information or status updates that should remain visible to the user until they are acknowledged or the issue is resolved.
 *
 * @fires close - A custom event emitted when a user clicks the close button.
 *
 * @slot title - A slot for the title content.
 * @slot description - A slot for the description content.
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

    :host([hidden]) {
      display: none;
    }
  `;

  /**
   * Status of the notification.
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
   * Emits a "close" event and sets `this.hidden` to true.
   */
  private _handleClickClose() {
    this.hidden = true;
    this.dispatchEvent(new Event("close"));
  }

  override render() {
    return html`<aside
      class=${cvaContainer({ variant: "inline", status: this.status })}
      role="status"
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
    </aside>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-inline-notification": DaikinInlineNotification;
  }
}
