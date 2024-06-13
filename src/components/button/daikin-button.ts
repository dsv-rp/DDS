import {
    buttonColorBackgroundPrimaryActive,
    buttonColorBackgroundPrimaryFocus,
    buttonColorBackgroundPrimaryHover,
    buttonColorBackgroundPrimaryPress,
    buttonColorBackgroundPrimaryDisabled
} from '@daikin-oss/dds-tokens/js/daikin/Light/variables.js';
import ctl from '@netlify/classnames-template-literals';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import tailwindStyles from '../../tailwind.css';
import styles from './button.css';

const button = ctl(`
  flex
  justify-center
  items-center
  font-daikinSerif
  font-bold
  rounded-lg
  tracking-wide
  text-wrap
  disabled:cursor-default 
`);

const buttonSecondary = ctl(`
  border-2
  bg-white
  text-daikinBlue-500
  border-daikinBlue-500

  hover:text-daikinBlue-300
  hover:border-daikinBlue-300
  active:text-daikinBlue-600
  active:border-daikinBlue-600
  focus:text-daikinBlue-700
  focus:border-daikinBlue-700

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

const buttonSizeDefault = ctl(`
    max-w-[240px]
    min-w-[88px]
    min-h-[42px]
    px-4
    text-[14px]
`)

const buttonSizeCondensed = ctl(`
    max-w-[160px]
    min-w-[60px]
    min-h-[32px]
    px-[10px]
    text-[12px]
`)

export interface DaikinButtonProps {
    /**
     * Type of action
     */
    variant?: 'primary' | 'secondary' | 'tertiary' | 'primary-danger';
    /**
     * Whether to show the disabled state
     */
    disabled?: boolean;
    href?: string;
    size?: 'default' | 'condensed';
    type?: 'button' | 'submit' | 'reset';
    role?: string;
    isLoading?: boolean;
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
    variant?: 'primary' | 'secondary' | 'tertiary' | 'primary-danger';

    @property({ type: Boolean, reflect: true })
    disabled? = false;
    
    @property({ type: String, reflect: true })
    label = "";

    @property({ type: String, reflect: true })
    rightIcon = "";

    @property({ type: String, reflect: true })
    leftIcon = "";

    @property({ type: String, reflect: true })
    href = "";

    @property({type: String, reflect: true })
    size?: "default" | "condensed" = "default";
    
    @property({type: String, reflect: true })
    type?: "button" | "submit" | "reset" = "button";	
    
    @property({type: String, reflect: true })
    role: string = "button";

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

        switch (this.size) {
            case 'default':
                CN += ` ${buttonSizeDefault}`;
                break;
            case 'condensed':
                CN += ` ${buttonSizeCondensed}`;
                break;
            default:
                CN += ` ${buttonSizeDefault}`;
        }
        
        if(this.href) {
            return html`
                <a href="${this.href}" class="${CN}" role="${this.role}">
                    <slot name="leftIcon"></slot>
                    <span><slot></slot></span>
                    <slot name="rightIcon"></slot>
                </a>`
        }

        return html`
            <button class="${CN}" ?disabled="${this.disabled}" type="${this.type}" role="${this.role}">
                <slot name="leftIcon"></slot>
                <span><slot></slot></span>
                <slot name="rightIcon"></slot>
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
