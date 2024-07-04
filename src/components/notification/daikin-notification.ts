import {
  colorFeedbackNegative,
  colorFeedbackPositive,
  colorFeedbackWarning,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { type VariantProps, cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { EVENT_CLOSE } from "../../constants/events";
import tailwindStyles from "../../tailwind.css?inline";
import type { OmitNull } from "../../type-utils";

const notificationContentClassName = cva(
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

const notificationIconClassName = cva(
  [
    "flex",
    "justify-center",
    "items-center",
    "w-[24px]",
    "h-[24px]",
    "flex-none",
    "text-white",
  ],
  {
    variants: {
      status: {
        positive: ["i-daikin-notification-status-positive"],
        negative: ["i-daikin-notification-status-negative"],
        warning: ["i-daikin-notification-status-warning"],
        alarm: ["i-daikin-notification-status-alarm"],
        information: ["i-daikin-notification-status-information"],
      },
    },
    defaultVariants: {
      status: "positive",
    },
  }
);

const notificationIconContainerClassName = cva(
  ["flex-none", "flex", "justify-center", "items-center", "w-[44px]"],
  {
    variants: {
      status: {
        positive: ["bg-[--colorFeedbackPositive]"],
        negative: ["bg-[--colorFeedbackNegative]"],
        warning: ["bg-[--colorFeedbackWarning]"],
        alarm: ["bg-[--colorFeedbackAlarm]"],
        information: ["bg-[--colorFeedbackInformation]"],
      },
    },
    defaultVariants: {
      status: "positive",
    },
  }
);

const notificationContainerClassName = cva(
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
        positive: ["border-[--colorFeedbackPositive]"],
        negative: ["border-[--colorFeedbackNegative]"],
        warning: ["border-[--colorFeedbackWarning]"],
        alarm: ["border-[--colorFeedbackAlarm]"],
        information: ["border-[--colorFeedbackInformation]"],
      },
    },
    defaultVariants: {
      variant: "toast",
      status: "positive",
    },
  }
);

type NotificationProps = OmitNull<
  VariantProps<typeof notificationContentClassName>
> &
  OmitNull<VariantProps<typeof notificationIconClassName>> &
  OmitNull<VariantProps<typeof notificationIconContainerClassName>> &
  OmitNull<VariantProps<typeof notificationContainerClassName>>;

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-notification")
export class DaikinNotification extends LitElement {
  static readonly styles = css`
    ${unsafeCSS(tailwindStyles)}

    :host {
      --colorFeedbackPositive: ${unsafeCSS(colorFeedbackPositive)};
      --colorFeedbackWarning: ${unsafeCSS(colorFeedbackWarning)};
      --colorFeedbackNegative: ${unsafeCSS(colorFeedbackNegative)};
      --colorFeedbackAlarm: #f68c54;
      --colorFeedbackInformation: #0097e0;

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
   * Title text
   */
  @property({ type: String })
  title = "";

  /**
   * Description text
   */
  @property({ type: String })
  description = "";

  /**
   * Type of notification
   */
  @property({ type: String, reflect: true })
  variant: NotificationProps["variant"] = "toast";

  /**
   * Status of notification
   */
  @property({ type: String })
  status: NotificationProps["status"] = "positive";

  /**
   * Display in single or multiple lines
   */
  @property({ type: String })
  line: NotificationProps["line"] = "single";

  /**
   * Whether the component is open
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Whether to display the close button
   */
  @property({ type: Boolean })
  closeButton = false;

  /**
   * Call the event registered in "close"
   */
  private _handleClickClose() {
    const event = new CustomEvent(EVENT_CLOSE);
    this.open = false;
    this.dispatchEvent(event);
  }

  render() {
    return this.open
      ? html`<aside
          class="${notificationContainerClassName({
            variant: this.variant,
            status: this.status,
          })}"
        >
          <div
            class="${notificationIconContainerClassName({
              status: this.status,
            })}"
          >
            <span
              class=${notificationIconClassName({
                status: this.status,
              })}
            ></span>
          </div>
          <div
            class="flex justify-between items-center gap-5 p-5 flex-[1_0_auto]"
          >
            <div
              class="${notificationContentClassName({
                line: this.line,
              })}"
            >
              ${this.title &&
              html`<header class="text-[18px] font-bold flex-none">
                ${this.title}
              </header>`}
              <p class="text-[18px] flex-none">${this.description}</p>
            </div>
            ${this.closeButton
              ? html`
                  <div class="flex items-center gap-5">
                    <button
                      aria-label="Close"
                      class="relative flex w-5 h-5 text-daikinNeutral-500 i-daikin-notification-close"
                      @click=${() => this._handleClickClose()}
                    ></button>
                  </div>
                `
              : null}
          </div>
        </aside>`
      : null;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "daikin-notification": DaikinNotification;
  }
}
