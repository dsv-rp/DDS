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
  inline-flex
  justify-center
  items-center
  font-daikinSerif
  font-bold
  rounded-lg
  tracking-wide
  text-wrap
  disabled:cursor-default
  h-full
  w-full
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
    px-4
    text-[14px]
`)

const buttonSizeCondensed = ctl(`
    px-[10px]
    text-[12px]
`)

const VARIANT_CLASS_MAP = {
    primary: 'button-primary',
    secondary: buttonSecondary,
    tertiary: buttonTertiary,
    primaryDanger: buttonPrimaryDanger,
  } as const;

const SIZE_CLASS_MAP = {
    default: buttonSizeDefault,
    condensed: buttonSizeCondensed
  } as const;

export interface DaikinButtonProps {
    /**
     * Type of action
     */
    variant?: 'primary' | 'secondary' | 'tertiary' | 'primaryDanger';
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

    override focus() {
        this.shadowRoot?.querySelector("button")?.focus();
    }

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
        :host {
            display: inline-block;
            width: fit-content;
            min-height: 42px;
            height: 1px;
        }

        :host([size="condensed"]) {
            min-height: 32px;
        }
    `;

    /**
     * Type of variant.
     */
    @property({ type: String })
    variant: 'primary' | 'secondary' | 'tertiary' | 'primaryDanger' = 'primary';
    
    /**
     * `true` if the button should be disabled.
     */
    @property({ type: Boolean, reflect: true })
    disabled = false
    
    /**
     * Set a icon in the right of button label.
     */
    @property({ type: String, reflect: true })
    rightIcon = "";
    
    /**
     * Set a icon in the left of button label.
     */
    @property({ type: String, reflect: true })
    leftIcon = "";
    
    /**
     * Link `href`. If present, this button is rendered as `<a>`.
     */
    @property({ type: String, reflect: true })
    href = "";
    
    /**
     * Specify the button size.
     */
    @property({type: String, reflect: true })
    size: "default" | "condensed" = "default";
    
    /**
     * Specify the button type.
     */
    @property({type: String, reflect: true })
    type: "button" | "submit" | "reset" = "button";	
    
    /**
     * Specify the button role.
     */
    @property({type: String, reflect: true })
    role: string = "button";
    
    /**
     * Specify whether the button is loading.
     */
    @property({ type: Boolean })
    isLoading = false;

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

        const CN = [
            button,
            VARIANT_CLASS_MAP[this.variant] ?? VARIANT_CLASS_MAP.primary,
            SIZE_CLASS_MAP[this.size] ?? SIZE_CLASS_MAP.default
          ].join(" ");

        const content = html`
                        <slot name="leftIcon"></slot>
                        <span><slot></slot></span>
                        <slot name="rightIcon"></slot>
                        `;
        
        if(this.href) {
            return html`
                <a href="${this.href}" class="${CN}" role="${this.role as AnyRole}">
                    ${content}
                </a>`
        }

        return html`
            <button class="${CN}" ?disabled="${this.disabled}" type="${this.type}" role="${this.role as AnyRole}">
                ${content}
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
