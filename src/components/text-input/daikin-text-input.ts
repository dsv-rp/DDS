import {
    buttonColorBackgroundPrimaryDisabled,
    buttonColorBackgroundPrimaryHover,
    colorFeedbackNegative,
} from '@daikin-oss/dds-tokens/js/daikin/Light/variables.js';
import { LitElement, html, unsafeCSS, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import tailwindStyles from '../../tailwind.css';
import styles from './text-input.css';
import ctl from '@netlify/classnames-template-literals';
import { ifDefined } from 'lit/directives/if-defined.js';

export interface DaikinTextInputProps {
    value: string;
    type?: 'text' | 'email' | 'tel' | 'search';
    placeholder: string;
    disabled?: boolean;
    readonly?: boolean;
    name?: string;
    maxlength?: number;
    autocomplete?: HTMLInputElement['autocomplete'];
    error?: boolean;
}

const textInputBase = ctl(`
  w-[340px]
  h-12
  text-daikinNeutral-900
  border
  border-daikinNeutral-600
  border-solid
  px-[9px]
  rounded-[6px]
  placeholder:text-daikinNeutral-200
  `);

/**
 * Primary UI component for user interaction
 */
@customElement('daikin-text-input')
class DaikinTextInput extends LitElement implements DaikinTextInputProps {
    static styles = css`
        :host {
            --defaultColorFeedbackNegative: ${unsafeCSS(colorFeedbackNegative)};
            --defaultButtonColorBackgroundPrimaryHover: ${unsafeCSS(
                buttonColorBackgroundPrimaryHover,
            )};
            --defaultButtonColorBackgroundPrimaryDisabled: ${unsafeCSS(
                buttonColorBackgroundPrimaryDisabled,
            )};
            --defaultButtonColorBackgroundSecondaryFocus: ${unsafeCSS(
                '#CECECE',
            )};
            --defaultInputFieldColorBackground: ${unsafeCSS('#FFFFFF')};
        }
        :host {
            display: block;
            width: max-content;
        }
    `;

    /**
     * Field value
     */
    @property({ type: String })
    value = '';

    /**
     * Type of field
     */
    @property({ type: String })
    type: 'text' | 'email' | 'tel' | 'search' = 'text';

    /**
     * Placeholder text
     */
    @property({ type: String })
    placeholder = '';

    /**
     * Whether the field is disabled
     */
    @property({ type: Boolean, reflect: true })
    disabled? = false;

    /**
     * Whether the field is readonly
     */
    @property({ type: Boolean })
    readonly? = false;

    /**
     * Name of the input field control used in the form
     */
    @property({ type: String })
    name?: string;

    /**
     * Maximum length in field values
     */
    @property({ type: Number })
    maxlength?: number;

    /**
     * Specify auto-completion values
     */
    @property({ type: String })
    autocomplete?: HTMLInputElement['autocomplete'];

    /**
     * Indication of error status
     */
    @property({ type: Boolean, reflect: true })
    error? = false;

    connectedCallback(): void {
        super.connectedCallback();

        const tailwind = new CSSStyleSheet();
        tailwind.replace(tailwindStyles);

        const textInputStyles = new CSSStyleSheet();
        textInputStyles.replaceSync(styles);

        const defaultsVariables = new CSSStyleSheet();
        defaultsVariables.replaceSync(DaikinTextInput.styles.cssText);

        (this.renderRoot as ShadowRoot).adoptedStyleSheets = [
            tailwind,
            textInputStyles,
            defaultsVariables,
        ];
    }

    render() {
        const textInputInputClassName = [
            'text-input',
            textInputBase,
            this.error ? 'text-input-error bg-daikinRed-50' : '',
        ].join(' ');

        return html`<input
            type="${this.type}"
            .value="${this.value}"
            placeholder="${this.placeholder}"
            ?disabled="${this.disabled}"
            ?readonly="${this.readonly}"
            name="${ifDefined(this.name)}"
            maxlength="${ifDefined(this.maxlength)}"
            autocomplete="${(this.autocomplete ?? nothing) as any}"
            @change="${(e: Event) =>
                this.dispatchEvent(new Event('change', e))}"
            @input="${(e: Event) => this.dispatchEvent(new Event('input', e))}"
            @keydown="${(e: KeyboardEvent) =>
                this.dispatchEvent(new Event('keydown', e))}"
            class="${textInputInputClassName}"
        />`;
    }
}
declare global {
    interface HTMLElementTagNameMap {
        'daikin-text-input': DaikinTextInput;
    }
}

export default DaikinTextInput;
