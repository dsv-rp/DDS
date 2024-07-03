import {
    colorFeedbackPositive,
    colorFeedbackWarning,
    colorFeedbackNegative,
} from '@daikin-oss/dds-tokens/js/daikin/Light/variables.js';
import ctl from '@netlify/classnames-template-literals';
import { LitElement, html, unsafeCSS, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { VariantProps, cva } from 'class-variance-authority';

import '../button';

import tailwindStyles from '../../tailwind.css';
import styles from './notification.css';
import { OmitNull } from '../../typeUtils';
import { EVENT_CLOSE } from '../../constants/events';

const notificationContentsContainerClassName = ctl(`
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
  font-daikinSerif
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

type NotificationProps = OmitNull<
    VariantProps<typeof notificationTextAreaClassName>
> &
    OmitNull<VariantProps<typeof notificationIconClassName>> &
    OmitNull<VariantProps<typeof notificationIconContainerClassName>> &
    OmitNull<VariantProps<typeof notificationContainerClassName>>;

const notificationTextAreaClassName = cva(notificationTextAreaBase, {
    variants: {
        line: {
            single: notificationTextAreaLineSingle,
            multi: notificationTextAreaLineMulti,
        },
    },
    defaultVariants: {
        line: 'single',
    },
});

const notificationIconClassName = cva(notificationIconBase, {
    variants: {
        status: {
            positive: 'i-daikin-notification-status-positive',
            negative: 'i-daikin-notification-status-negative',
            warning: 'i-daikin-notification-status-warning',
            alarm: 'i-daikin-notification-status-alarm',
            information: 'i-daikin-notification-status-information',
        },
    },
    defaultVariants: {
        status: 'positive',
    },
});

const notificationIconContainerClassName = cva(notificationIconContainerBase, {
    variants: {
        status: {
            positive: 'notification-icon-positive',
            negative: 'notification-icon-negative',
            warning: 'notification-icon-warning',
            alarm: 'notification-icon-alarm',
            information: 'notification-icon-information',
        },
    },
    defaultVariants: {
        status: 'positive',
    },
});

const notificationContainerClassName = cva(notificationContainerBase, {
    variants: {
        variant: {
            toast: `notification-container-toast ${notificationContainerVariantToast}`,
            inline: '',
        },
        status: {
            positive: 'notification-container-positive',
            negative: 'notification-container-negative',
            warning: 'notification-container-warning',
            alarm: 'notification-container-alarm',
            information: 'notification-container-information',
        },
    },
    defaultVariants: {
        variant: 'toast',
        status: 'positive',
    },
});

export interface DaikinNotificationProps {
    title?: string;
    description: string;
    variant: NotificationProps['variant'];
    status: NotificationProps['status'];
    line: NotificationProps['line'];
    open: boolean;
    closeButton?: boolean;
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
            display: block;
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
    variant: NotificationProps['variant'] = 'toast';

    /**
     * Status of notification
     */
    @property({ type: String })
    status: NotificationProps['status'] = 'positive';

    /**
     * Display in single or multiple lines
     */
    @property({ type: String })
    line: NotificationProps['line'] = 'single';

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
    onClickClose() {
        const event = new CustomEvent(EVENT_CLOSE);
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
        return this.open
            ? html`<div
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
                  <div class="${notificationContentsContainerClassName}">
                      <div
                          class="${notificationTextAreaClassName({
                              line: this.line,
                          })}"
                      >
                          ${this.title &&
                          html`<p class="text-[18px] font-bold flex-none">
                              ${this.title}
                          </p>`}
                          <p class="text-[18px] flex-none">
                              ${this.description}
                          </p>
                      </div>
                      ${this.closeButton
                          ? html`
                                <div class="flex items-center gap-5">
                                    <button
                                        aria-label="Close"
                                        @click=${() => this.onClickClose()}
                                        class=${notificationCloseButton}
                                    ></button>
                                </div>
                            `
                          : null}
                  </div>
              </div>`
            : null;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'daikin-notification': DaikinNotification;
    }
}

export default DaikinNotification;
