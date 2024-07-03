import {
    buttonColorBackgroundPrimaryHover,
    colorFeedbackNegative,
} from '@daikin-oss/dds-tokens/js/daikin/Light/variables.js';
import { LitElement, html, unsafeCSS, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import tailwindStyles from '../../tailwind.css';
import styles from './input-group.css';
import ctl from '@netlify/classnames-template-literals';

const inputGroupContainer = ctl(`
  flex
  flex-col
  justify-center
  gap-2
  text-[16px]
  `);

const inputGroupError = ctl(`
    flex
    gap-2
    leading-[22px]

    input-group-bottom-text-error
    
    before:i-daikin-input-group-error
    before:block
    before:w-[16px]
    before:h-[22px]
    `);

export interface DaikinInputGroupProps {
    label?: string;
    helper?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
}

/**
 * Primary UI component for user interaction
 */
@customElement('daikin-input-group')
class DaikinInputGroup extends LitElement implements DaikinInputGroupProps {
    static styles = css`
        :host {
            --defaultColorFeedbackNegative: ${unsafeCSS(colorFeedbackNegative)};
            --defaultButtonColorBackgroundPrimaryHover: ${unsafeCSS(
                buttonColorBackgroundPrimaryHover,
            )};
        }
    `;

    /**
     * Label text to place at the top of the field
     */
    @property({ type: String })
    label?: string;

    /**
     * Helper text to place at the bottom of the field
     */
    @property({ type: String })
    helper?: string;

    /**
     * Whether the field is disabled
     */
    @property({ type: Boolean, reflect: true })
    disabled? = false;

    /**
     * Whether the field is required
     */
    @property({ type: Boolean })
    required? = false;

    /**
     * Indication of error status
     */
    @property({ type: String, reflect: true })
    error = '';

    connectedCallback(): void {
        super.connectedCallback();

        const tailwind = new CSSStyleSheet();
        tailwind.replace(tailwindStyles);

        const textInputStyles = new CSSStyleSheet();
        textInputStyles.replaceSync(styles);

        const defaultsVariables = new CSSStyleSheet();
        defaultsVariables.replaceSync(DaikinInputGroup.styles.cssText);

        (this.renderRoot as ShadowRoot).adoptedStyleSheets = [
            tailwind,
            textInputStyles,
            defaultsVariables,
        ];
    }

    render() {
        const inputGroupTextClassName = this.disabled
            ? 'text-daikinNeutral-200'
            : 'text-daikinNeutral-800';

        const inputs = Array.from([
            ...this.getElementsByTagName('daikin-text-input'),
        ]);

        if (this.disabled) {
            for (const input of inputs) {
                input.disabled = true;
            }
        } else {
            for (const input of inputs) {
                input.disabled = false;
            }
        }

        if (!!this.error.length) {
            for (const input of inputs) {
                input.error = true;
            }
        } else {
            for (const input of inputs) {
                input.error = false;
            }
        }

        return html`<fieldset
            class="${inputGroupContainer}"
            ?disabled="${this.disabled}"
        >
            ${!!this.label
                ? html`<label class="${inputGroupTextClassName} text-base"
                      >${this.label}${this.required ? ' *' : ''}</label
                  >`
                : null}
            <slot></slot>
            ${!!this.helper
                ? html`<label class="${inputGroupTextClassName} text-xs"
                      >${this.helper}</label
                  >`
                : null}
            ${!this.disabled && !!this.error.length
                ? html`<label class="${inputGroupError}">${this.error}</label>`
                : null}
        </fieldset>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'daikin-input-group': DaikinInputGroup;
    }
}

export default DaikinInputGroup;
