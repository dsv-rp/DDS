import {
    buttonColorBackgroundPrimaryActive,
    buttonColorBackgroundPrimaryFocus,
    buttonColorBackgroundPrimaryHover,
    buttonColorBackgroundPrimaryPress,
    buttonColorBackgroundPrimaryDisabled
} from '@daikinlab/dds-tokens/js/daikin/Light/variables.js';
import ctl from '@netlify/classnames-template-literals';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import tailwindStyles from '../../tailwind.css';
import styles from './button.css';

const button = ctl(`
  inline-block
  font-daikinSerif
  rounded-lg 
  text-base
  px-4
  py-2
  shadow-lg
  tracking-wide 
  disabled:cursor-default 
  disabled:shadow-none 

  md:py-3
  md:px-6
`);

const buttonSecondary = ctl(`
  border-2
  bg-white
  text-daikinBlue-500
  border-daikinBlue-500

  hover:bg-daikinBlue-100

  disabled:bg-white
  disabled:border-daikinNeutral-300
  disabled:text-daikinNeutral-400
  disabled:border
`);

const buttonTertiary = ctl(`
  text-daikinBlue-400
  bg-none
  border-none
  shadow-none

  hover:bg-daikinNeutral-100
  disabled:bg-transparent
  disabled:text-daikinNeutral-400
`);

const buttonPrimaryDanger = ctl(`
  bg-daikinRed
  text-white 
  hover:bg-daikinRed-400
  focus:bg-daikinRed-700
  disabled:bg-daikinNeutral-300
`);

export interface DaikinButtonProps {
    /**
     * Type of action
     */
    variant: 'primary' | 'secondary' | 'tertiary' | 'primary-danger';
    /**
     * Whether to show the disabled state
     */
    disabled?: boolean;
}

/**
 * Primary UI component for user interaction
 */
@customElement('daikin-button')
class DaikinButton extends LitElement implements DaikinButtonProps {
    static styles = css`
        :host {
            --defaultButtonColorBackgroundPrimaryActive: ${unsafeCSS(
                buttonColorBackgroundPrimaryActive
            )};
            --defaultButtonColorBackgroundPrimaryFocus: ${unsafeCSS(
                buttonColorBackgroundPrimaryFocus
            )};
            --defaultButtonColorBackgroundPrimaryHover: ${unsafeCSS(
                buttonColorBackgroundPrimaryHover
            )};
            --defaultButtonColorBackgroundPrimaryPress: ${unsafeCSS(
                buttonColorBackgroundPrimaryPress
            )};
            --defaultButtonColorBackgroundPrimaryDisabled: ${unsafeCSS(
                buttonColorBackgroundPrimaryDisabled
            )};
        }
    `;

    @property({ type: String })
    variant: 'primary' | 'secondary' | 'tertiary' | 'primary-danger';

    @property({ type: Boolean, reflect: true })
    disabled = false;

    connectedCallback(): void {
        super.connectedCallback();

        const tailwind = new CSSStyleSheet();
        tailwind.replace(tailwindStyles);

        const buttonStyles = new CSSStyleSheet();
        buttonStyles.replaceSync(styles);

        const defaultsVariables = new CSSStyleSheet();
        defaultsVariables.replaceSync(DaikinButton.styles.cssText);

        (this.renderRoot as ShadowRoot).adoptedStyleSheets = [
            tailwind,
            defaultsVariables,
            buttonStyles
        ];
    }

    render() {
        let CN = `${button} `;

        switch (this.variant) {
            case 'primary':
                CN += 'button-primary';
                break;
            case 'secondary':
                CN += buttonSecondary;
                break;
            case 'tertiary':
                CN += buttonTertiary;
                break;
            case 'primary-danger':
                CN += buttonPrimaryDanger;
                break;
            default:
                CN += 'button-primary';
        }

        return html`
            <button class="${CN}" ?disabled="${this.disabled}">
                <slot></slot>
            </button>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'daikin-button': DaikinButton;
    }
}

export default DaikinButton;
