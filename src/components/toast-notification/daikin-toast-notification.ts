import { cva } from "class-variance-authority";
import { LitElement, css, html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import tailwindStyles from "../../tailwind.css?inline";
import type { MergeVariantProps } from "../../type-utils";
import { formatDate } from "../../utils/format";
import { reDispatch } from "../../utils/re-dispatch";
import "../icon-button/daikin-icon-button";

export const cvaContainer = cva(
  [
    "flex",
    "items-center",
    "gap-4",
    "w-full",
    "text-ddt-color-common-text-primary",
    "bg-ddt-color-common-background-default",
    "py-4",
    "pl-5",
    "pr-4",
    "overflow-hidden",
    "font-daikinSerif",
    "transition",
    "box-border",

    "before:size-6",
    "before:flex-none",
  ],
  {
    variants: {
      variant: {
        toast: ["rounded-lg", "border", "border-ddt-color-divider"],
        inline: [],
      },
      status: {
        positive: [
          "before:text-ddt-color-common-success",
          "before:i-daikin-status-positive",
        ],
        negative: [
          "before:text-ddt-color-common-danger-default",
          "before:i-daikin-status-negative",
        ],
        warning: [
          "before:text-ddt-color-common-warning",
          "before:i-daikin-status-warning",
        ],
        alarm: [
          "before:text-ddt-color-common-alarm",
          "before:i-daikin-status-alarm",
        ],
        information: [
          "before:text-ddt-color-common-information",
          "before:i-daikin-status-information",
        ],
      },
    },
  }
);

export const cvaContent = cva(["flex", "flex-glow", "items-center", "w-full"], {
  variants: {
    line: {
      single: ["gap-2", "overflow-hidden"],
      multiple: ["items-stretch", "flex-col", "gap-1"],
    },
  },
});

export const cvaTimestamp = cva(
  [
    "text-ddt-color-common-text-secondary",
    "text-xs",
    "leading-[130%]",
    "whitespace-nowrap",
  ],
  {
    variants: {
      line: {
        single: ["flex-grow", "text-right"],
        multiple: [],
      },
    },
  }
);

export type ToastNotificationVariantProps = MergeVariantProps<
  typeof cvaContainer | typeof cvaContent | typeof cvaTimestamp
>;

/**
 * The toast-notification component is a UI element used to inform users about important updates, alerts, or messages within an application.
 *
 * ToastNotifications are brief messages that should appear temporarily at the edge of the screen, typically in the bottom or top corner.
 * ToastNotifications are ideal for conveying transient information that does not require user interaction, such as success messages, warnings, or alerts. \
 * Please note that **currently we don't support automatic placement or stacking of toast-notification toast-notifications**.
 *
 * @fires close - A custom event emitted when a user clicks the close button.
 *
 * @slot title - A slot for the toast-notification title content.
 * @slot description - A slot for the toast-notification description content.
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

  @property({ type: String, reflect: true })
  name = "";

  /**
   * Status of toast-notification.
   */
  @property({ type: String })
  status: ToastNotificationVariantProps["status"] = "positive";

  /**
   * Display in single or multiple lines.
   */
  @property({ type: String })
  line: ToastNotificationVariantProps["line"] = "single";

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
    reDispatch(this, event, new Event("close", event));
  }

  private _timestamp = formatDate(new Date().toLocaleDateString());

  override render() {
    const formattedName = this.name.replaceAll(" ", "_");

    return html`<aside
      class=${cvaContainer({ variant: "toast", status: this.status })}
      role="alert"
      style=${`transform:translateX(var(--${formattedName}-move-offset-x,0)) translateY(var(--${formattedName}-move-offset-y,0));opacity:var(--${formattedName}-opacity,1);pointer-events:var(--${formattedName}-pointer-events,auto);transition-duration:var(--${formattedName}-transition-duration,200ms);`}
    >
      <div class=${cvaContent({ line: this.line })}>
        <slot class="font-bold whitespace-nowrap" name="title"></slot>
        <p class="whitespace-nowrap overflow-hidden overflow-ellipsis">
          <slot name="description"></slot>
        </p>
        ${this.timestamp
          ? html`<span class=${cvaTimestamp({ line: this.line })}
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
