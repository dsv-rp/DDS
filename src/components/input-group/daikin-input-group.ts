import { colorFeedbackNegative } from '@daikin-oss/dds-tokens/js/daikin/Light/variables.js';
import { LitElement, html, unsafeCSS, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import tailwindStyles from '../../tailwind.css';
import ctl from '@netlify/classnames-template-literals';

const inputGroupContainer = ctl(`
  flex
  flex-col
  justify-center
  gap-2
  text-[16px]
  font-daikinSerif
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

const inputGroupHelperRequired = ctl(`
    after:content-['*']
    after:ml-[2px]
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
        ${unsafeCSS(tailwindStyles)}

        .input-group-bottom-text-error {
            color: ${unsafeCSS(colorFeedbackNegative)};
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
     * Whether the field is disabled. Reflected in the `disabled` property of the input in the slot.
     */
    @property({ type: Boolean, reflect: true })
    disabled? = false;

    /**
     * Whether the field is required. An additional star mark will be added if `true`.
     */
    @property({ type: Boolean, reflect: true })
    required? = false;

    /**
     * Error text to place at the bottom of the field. If specified, sets the `error` property of the element in the slot to `true`. Ignored if the `disabled` is `true`.
     */
    @property({ type: String, reflect: true })
    error = '';

    private _handleSlotChange(): void {
        const inputs = [...this.getElementsByTagName('daikin-text-input')];

        const isError = !this.disabled && !!this.error;
        for (const input of inputs) {
            input.disabled = this.disabled;
            input.error = isError;
        }
    }

    render() {
        const inputGroupLabelClassName = [
            'text-base',
            this.disabled ? 'text-daikinNeutral-200' : 'text-daikinNeutral-800',
            this.required ? inputGroupHelperRequired : '',
        ].join(' ');

        const inputGroupHelperClassName = [
            'text-xs',
            this.disabled ? 'text-daikinNeutral-200' : 'text-daikinNeutral-800',
        ].join(' ');

        return html`<fieldset
            class="${inputGroupContainer}"
            ?disabled="${this.disabled}"
        >
            ${!!this.label
                ? html`<label class="${inputGroupLabelClassName}"
                      ><span>${this.label}</span></label
                  >`
                : null}
            <slot @slotchange=${this._handleSlotChange}></slot>
            ${!!this.helper
                ? html`<label class="${inputGroupHelperClassName}"
                      ><span>${this.helper}</span></label
                  >`
                : null}
            ${!this.disabled && !!this.error.length
                ? html`<label class="${inputGroupError}"
                      ><span>${this.error}</span></label
                  >`
                : null}
        </fieldset>`;
    }

    updated() {
        this._handleSlotChange();
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'daikin-input-group': DaikinInputGroup;
    }
}

export default DaikinInputGroup;
