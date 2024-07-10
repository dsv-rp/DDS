import {
  colorFeedbackNegative,
  colorFeedbackPositive,
  colorFeedbackWarning,
} from "@daikin-oss/dds-tokens/js/daikin/Light/variables.js";
import { cva } from "class-variance-authority";
import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { EVENT_CLOSE } from "../../constants/events";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import "../icon";

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

const cvaIconContainer = cva(
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
 * Primary UI component for user interaction
 */
@customElement("daikin-notification")
export class DaikinNotification extends LitElement {
  static override readonly styles = css`
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
  override title = "";

  /**
   * Description text
   */
  @property({ type: String })
  description = "";

  /**
   * Type of notification
   */
  @property({ type: String, reflect: true })
  variant: NotificationVariantProps["variant"] = "toast";

  /**
   * Status of notification
   */
  @property({ type: String })
  status: NotificationVariantProps["status"] = "positive";

  /**
   * Display in single or multiple lines
   */
  @property({ type: String })
  line: NotificationVariantProps["line"] = "single";

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

  override render() {
    return this.open
      ? html`<aside
          class=${cvaContainer({
            variant: this.variant,
            status: this.status,
          })}
        >
          <div
            class=${cvaIconContainer({
              status: this.status,
            })}
          >
            <daikin-icon
              icon=${this.status}
              color="white"
              size="xl"
            ></daikin-icon>
          </div>
          <div
            class="flex justify-between items-center gap-5 p-5 flex-[1_0_auto]"
          >
            <div
              class=${cvaContent({
                line: this.line,
              })}
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
                      class="relative flex w-5 h-5"
                      @click=${() => this._handleClickClose()}
                    >
                      <daikin-icon
                        icon="close"
                        size="l"
                        color="colored"
                      ></daikin-icon>
                    </button>
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
