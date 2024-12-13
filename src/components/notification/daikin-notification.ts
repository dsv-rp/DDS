import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { EVENT_CLOSE } from "../../constants/events";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";

const cvaContainer = cva(
  ["flex", "box-border", "bg-white", "overflow-hidden", "font-daikinSerif"],
  {
    variants: {
      variant: {
        toast: [
          "border-2",
          "border-solid",
          "rounded-lg",
          "shadow-notification",
        ],
        inline: [],
      },
      status: {
        positive: ["border-system-state-feedback-success"],
        negative: ["border-system-state-feedback-negative"],
        warning: ["border-system-state-feedback-warning"],
        alarm: ["border-system-state-feedback-alarm"],
        information: ["border-system-state-feedback-information"],
      },
    },
    defaultVariants: {
      variant: "toast",
      status: "positive",
    },
  }
);

const cvaIconContainer = cva(
  [
    "flex-none",
    "flex",
    "justify-center",
    "items-center",
    "w-[2.75rem]",

    "after:size-6",
    "after:text-white",
  ],
  {
    variants: {
      status: {
        positive: [
          "bg-system-state-feedback-success",
          "after:i-daikin-status-positive",
        ],
        negative: [
          "bg-system-state-feedback-negative",
          "after:i-daikin-status-negative",
        ],
        warning: [
          "bg-system-state-feedback-warning",
          "after:i-daikin-status-warning",
        ],
        alarm: [
          "bg-system-state-feedback-alarm",
          "after:i-daikin-status-alarm",
        ],
        information: [
          "bg-system-state-feedback-information",
          "after:i-daikin-status-information",
        ],
      },
    },
    defaultVariants: {
      status: "positive",
    },
  }
);

const cvaContent = cva(
  ["flex", "justify-center", "gap-1", "w-fit", "flex-none"],
  {
    variants: {
      line: {
        single: ["items-center", "flex-row"],
        multi: ["items-start", "flex-col"],
      },
    },
    defaultVariants: {
      line: "single",
    },
  }
);

type NotificationVariantProps = MergeVariantProps<
  typeof cvaContainer | typeof cvaIconContainer | typeof cvaContent
>;

/**
 * The notification component is a UI element used to inform users about important updates, alerts, or messages within an application.
 *
 * There are two variants of notification components: `toast` and `inline`.
 *
 * Toast notifications are brief messages that should appear temporarily at the edge of the screen, typically in the bottom or top corner.
 * Toast notifications are ideal for conveying transient information that does not require user interaction, such as success messages, warnings, or alerts. \
 * Please note that **currently we don't support automatic placement or stacking of toast notifications**.
 *
 * Inline notifications appear within the content of the application, usually embedded directly within a page or section.
 * Inline notifications are more persistent and are used to highlight important information or status updates that should remain visible to the user until they are acknowledged or the issue is resolved.
 *
 * @fires close - A custom event emitted when a user clicks the close button.
 *
 * @slot title - A slot for the notification title content.
 * @slot description - A slot for the notification description content.
 *
 * @example
 *
 * ```js
 * import "@daikin-oss/design-system-web-components/components/notification/index.js";
 * ```
 *
 * ```html
 * <daikin-notification>
 *   <span slot="title">Notification title</span>
 *   <span slot="description">Notification description</span>
 * </daikin-notification>
 * ```
 */
@customElement("daikin-notification")
export class DaikinNotification extends LitElement {
  static override readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      display: block;
    }

    :host([variant="toast"]) {
      width: max-content;
    }

    :host([variant="inline"]) {
      width: 100%;
    }
  `;

  /**
   * Type of notification.
   */
  @property({ type: String, reflect: true })
  variant: NotificationVariantProps["variant"] = "toast";

  /**
   * Status of notification.
   */
  @property({ type: String })
  status: NotificationVariantProps["status"] = "positive";

  /**
   * Display in single or multiple lines.
   */
  @property({ type: String })
  line: NotificationVariantProps["line"] = "single";

  /**
   * Specify the notification's open state.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether to display the close button.
   */
  @property({ type: Boolean, attribute: "close-button" })
  closeButton = false;

  /**
   * Call the event registered in "close".
   */
  private _handleClickClose() {
    const event = new CustomEvent(EVENT_CLOSE);
    this.open = false;
    this.dispatchEvent(event);
  }

  override render() {
    const role = (
      {
        inline: "status",
        toast: "alert",
      } as const
    )[this.variant];

    return this.open
      ? html`<aside
          class=${cvaContainer({
            variant: this.variant,
            status: this.status,
          })}
          role=${role}
        >
          <div
            class=${cvaIconContainer({
              status: this.status,
            })}
          ></div>
          <div
            class="flex justify-between items-center gap-5 p-5 text-lg flex-auto flex-shrink-0"
          >
            <div
              class=${cvaContent({
                line: this.line,
              })}
            >
              <div class="font-bold flex-none">
                <slot name="title"></slot>
              </div>
              <div class="flex-none">
                <slot name="description"></slot>
              </div>
            </div>
            ${this.closeButton
              ? html`
                  <div class="flex items-center gap-5">
                    <button
                      aria-label="Close"
                      class="relative flex w-5 h-5 after:i-daikin-notification-close after:size-5 after:text-[#a0a0a0]"
                      @click=${this._handleClickClose}
                    ></button>
                  </div>
                `
              : nothing}
          </div>
        </aside>`
      : nothing;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-notification": DaikinNotification;
  }
}
