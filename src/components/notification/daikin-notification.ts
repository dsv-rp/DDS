import {
    colorFeedbackPositive,
    colorFeedbackWarning,
    colorFeedbackNegative,
} from '@daikin-oss/dds-tokens/js/daikin/Light/variables.js';
import ctl from '@netlify/classnames-template-literals';
import { LitElement, html, unsafeCSS, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import '../button';

import tailwindStyles from '../../tailwind.css';
import styles from './notification.css';

type NotificationStatus =
    | 'positive'
    | 'negative'
    | 'warning'
    | 'alarm'
    | 'information';
type NotificationVariant = 'toast' | 'inline';
type NotificationLine = 'single' | 'multi';

const notificationContentsContainerBase = ctl(`
    flex
    justify-between
    items-center
    gap-5
    p-[20px]
    flex-none
    flex-grow`);

const notificationTextAreaBase = ctl(`
  flex
  justify-center
  gap-1
  w-fit
  flex-none
  `);

const notificationTextAreaLineSingle = ctl(`
  items-center
  flex-row
  `);

const notificationTextAreaLineMulti = ctl(`
  items-start
  flex-col
  `);

const notificationIconBase = ctl(`
  flex
  justify-center
  items-center
  w-[24px]
  h-[24px]
  flex-none
  `);

const notificationIconContainerBase = ctl(`
  flex
  justify-center
  items-center
  w-[44px]
  flex-none
  `);

const notificationContainerBase = ctl(`
  flex
  box-border
  bg-white
  overflow-hidden
  `);

const notificationContainerVariantToast = ctl(`
  border-2
  border-solid
  rounded-lg
  `);

const notificationCloseButton = ctl(`
    flex
    w-6
    h-6
    relative
    i-daikin-notification-close
    `);

const CONTAINER_STATUS_CLASS_MAP: Record<NotificationStatus, string> = {
    positive: 'notification-container-positive',
    negative: 'notification-container-negative',
    warning: 'notification-container-warning',
    alarm: 'notification-container-alarm',
    information: 'notification-container-information',
};

const CONTAINER_VARIANT_CLASS_MAP: Record<NotificationVariant, string> = {
    toast: `notification-container-toast ${notificationContainerVariantToast}`,
    inline: '',
};

const ICON_STATUS_CLASS_MAP: Record<NotificationStatus, string> = {
    positive: 'i-daikin-notification-status-positive',
    negative: 'i-daikin-notification-status-negative',
    warning: 'i-daikin-notification-status-warning',
    alarm: 'i-daikin-notification-status-alarm',
    information: 'i-daikin-notification-status-information',
};

const ICON_CONTAINER_STATUS_CLASS_MAP: Record<NotificationStatus, string> = {
    positive: 'notification-icon-positive',
    negative: 'notification-icon-negative',
    warning: 'notification-icon-warning',
    alarm: 'notification-icon-alarm',
    information: 'notification-icon-information',
};

const TEXT_AREA_LINE_CLASS_MAP: Record<NotificationLine, string> = {
    single: notificationTextAreaLineSingle,
    multi: notificationTextAreaLineMulti,
};

export interface DaikinNotificationProps {
    title?: string;
    description: string;
    variant: NotificationVariant;
    status: NotificationStatus;
    line: NotificationLine;
    open: boolean;
    closeButton?: boolean;
    actionButtonLabel?: string;
}

/**
 * Primary UI component for user interaction
 */
@customElement('daikin-notification')
class DaikinNotification extends LitElement implements DaikinNotificationProps {
    static styles = css`
        :host {
            --defaultColorFeedbackPositive: ${unsafeCSS(colorFeedbackPositive)};
            --defaultColorFeedbackWarning: ${unsafeCSS(colorFeedbackWarning)};
            --defaultColorFeedbackNegative: ${unsafeCSS(colorFeedbackNegative)};
        }
        :host([variant='toast']) {
            width: max-content;
        }
        :host([variant='inline']) {
            width: 100%;
        }
    `;

    /**
     * Title text
     */
    @property({ type: String })
    title = '';

    /**
     * Description text
     */
    @property({ type: String })
    description = '';

    /**
     * Type of notification
     */
    @property({ type: String, reflect: true })
    variant: NotificationVariant = 'toast';

    /**
     * Status of notification
     */
    @property({ type: String })
    status: NotificationStatus = 'positive';

    /**
     * Display in single or multiple lines
     */
    @property({ type: String })
    line: NotificationLine = 'single';

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
     * Label text when using action button (Action buttons can only be used when variant is `inline`)
     */
    @property({ type: String })
    actionButtonLabel? = '';

    /**
     * Call the event registered in "daikin-action"
     */
    onClickDaikinAction() {
        const event = new CustomEvent('daikin-action');
        this.dispatchEvent(event);
    }

    /**
     * Call the event registered in "close"
     */
    onClickDaikinClose() {
        const event = new CustomEvent('close');
        this.open = false;
        this.dispatchEvent(event);
    }

    connectedCallback(): void {
        super.connectedCallback();

        const tailwind = new CSSStyleSheet();
        tailwind.replace(tailwindStyles);

        const notificationStyles = new CSSStyleSheet();
        notificationStyles.replaceSync(styles);

        const defaultsVariables = new CSSStyleSheet();
        defaultsVariables.replaceSync(DaikinNotification.styles.cssText);

        (this.renderRoot as ShadowRoot).adoptedStyleSheets = [
            tailwind,
            notificationStyles,
            defaultsVariables,
        ];
    }

    render() {
        const notificationTextAreaClassName = [
            notificationTextAreaBase,
            TEXT_AREA_LINE_CLASS_MAP[this.line] ??
                TEXT_AREA_LINE_CLASS_MAP.single,
        ].join(' ');
        const notificationIconClassName = [
            notificationIconBase,
            ICON_STATUS_CLASS_MAP[this.status] ??
                ICON_STATUS_CLASS_MAP.positive,
        ].join(' ');
        const notificationIconContainerClassName = [
            notificationIconContainerBase,
            ICON_CONTAINER_STATUS_CLASS_MAP[this.status] ??
                ICON_CONTAINER_STATUS_CLASS_MAP.positive,
        ].join(' ');
        const notificationContainerClassName = [
            notificationContainerBase,
            CONTAINER_STATUS_CLASS_MAP[this.status] ??
                CONTAINER_STATUS_CLASS_MAP.positive,
            CONTAINER_VARIANT_CLASS_MAP[this.variant] ??
                CONTAINER_VARIANT_CLASS_MAP.toast,
        ].join(' ');

        return this.open
            ? html`<div class="${notificationContainerClassName}">
                  <div class="${notificationIconContainerClassName}">
                      <span class=${notificationIconClassName}></span>
                  </div>
                  <div class="${notificationContentsContainerBase}">
                      <div class="${notificationTextAreaClassName}">
                          ${this.title &&
                          html`<p class="text-[18px] font-bold flex-none">
                              ${this.title}
                          </p>`}
                          <p class="text-[18px] flex-none">
                              ${this.description}
                          </p>
                      </div>
                      ${(this.variant === 'inline' && this.actionButtonLabel) ||
                      this.closeButton
                          ? html`
                                <div class="flex items-center gap-5">
                                    ${this.variant === 'inline' &&
                                    this.actionButtonLabel
                                        ? html`<daikin-button
                                              @click=${() =>
                                                  this.onClickDaikinAction()}
                                          >
                                              ${this.actionButtonLabel}
                                          </daikin-button>`
                                        : ''}
                                    ${this.closeButton
                                        ? html`
                                              <button
                                                  aria-label="Close"
                                                  @click=${() =>
                                                      this.onClickDaikinClose()}
                                                  class=${notificationCloseButton}
                                              ></button>
                                          `
                                        : ''}
                                </div>
                            `
                          : ''}
                  </div>
              </div>`
            : '';
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'daikin-notification': DaikinNotification;
    }
}

export default DaikinNotification;
