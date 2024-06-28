import ctl from '@netlify/classnames-template-literals';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import tailwindStyles from '../../tailwind.css';
import { cva, type VariantProps } from "class-variance-authority";
import type { OmitNull } from "../../typeUtils";

const hideRadioCN = ctl(`
    opacity-0
    absolute
    peer
`)

const baseRadioCN = ctl(`
    relative
    after:absolute
    after:!w-full
    after:!h-full
    after:i-daikin-checkbox-unchecked
    after:text-[#8C8C8C]
    peer-checked:after:i-daikin-checkbox-checked
    peer-checked:after:text-daikinBlue-500

    peer-hover:after:i-daikin-checkbox-checked
    peer-hover:after:text-daikinBlue-300

    peer-active:after:i-daikin-checkbox-checked
    peer-active:after:text-daikinBlue-500

    peer-focus-visible:after:i-daikin-checkbox-unchecked
    peer-focus-visible:peer-checked:after:i-daikin-checkbox-checked
    peer-focus-visible:after:text-daikinBlue-700

    peer-disabled:after:i-daikin-checkbox-unchecked
    peer-disabled:peer-checked:after:i-daikin-checkbox-checked
    peer-disabled:after:text-daikinNeutral-200
`)


const labelCN = cva(["leading-8", "not-italic", "font-normal", "align-middle"], {
    variants: {
            size: {
                small: ["text-sm"],
                large: ["text-base"],
            },
        },
        defaultVariants: {
            size: "small"

        }
});

const radioCN = cva(baseRadioCN, {
    variants: {
            size: {
                small: ["w-[14px]", "h-[14px]"],
                large: ["w-4", "h-4"],
            },
        },
        defaultVariants: {
            size: "small"
        }
});

type labelProps = OmitNull<VariantProps<typeof labelCN>>;
type radioProps = OmitNull<VariantProps<typeof radioCN>>;
type componentSize = labelProps["size"] & radioProps["size"];

export interface DaikinRadioProps {
    label: string
    size: componentSize;
    disabled: boolean;
    labelPosition: "left" | "right";
    readonly: boolean;
    checked: boolean;
    name: string;
    value: string;
    error: boolean;
}

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-radio")
class DaikinRadio extends LitElement implements DaikinRadioProps {
    static styles = css`
        ${unsafeCSS(tailwindStyles)}

        :host {
            display: inline-block;
        }
    `;

    private _handleClick(event: MouseEvent) {
        if (this.readonly) {
            event.preventDefault();
        }
    }

    /**
     * Specify the label text for check box
     */
    @property({ type: String })
    label = "";
    
    /**
     * Specify the component size
     */
    @property({ type: String })
    size: componentSize  = "small";

    /**
     * Specify the label position
     * when `left` the label will be in left of radio, when `right` label will be in right of radio
     */
    @property({ type: String, attribute: "label-position"})
    labelPosition: "left" | "right" = "right";

    /**
     * Specify whether the Radio should be disabled
     */
    @property({ type: Boolean, reflect: true })
    disabled = false;

    /**
     * Specify whether the radio is read only
     */
    @property({ type: Boolean, reflect: true })
    readonly = false;
    
    /**
     * Specify whether the radio is be checked
     */
    @property({ type: Boolean , reflect: true})
    checked: = false;

    /**
     * The form name.
     */
    @property()
    name= "";

    /**
     * The value.
     */
    @property()
    value= "";

    /**
     * Specify whether the Radio is in a error state
     */
    @property({ type: Boolean , reflect: true})
    error = false;

    render() {
        // Specify the component size
        const labelClassName = labelCN({size: this.size})
        const radioClassName = radioCN({size: this.size})

        const isChecked = this.checkState === 'checked';
        const isIndeterminate = this.checkState === 'indeterminate';

        const labelText = this.label ? html`<span class="${labelClassName}">${this.label}</span>` : html``;
        const inputTag = html`<input class="${hideRadioCN}" type="radio" name="${this.name}" value="${this.value}" .indeterminate=${isIndeterminate} .checked=${isChecked} ?readonly=${this.readonly} ?disabled=${this.disabled} @click=${this._handleClick}><span class="${radioClassName}"></span>`;
        const inputArea = this.labelPosition === 'left' ? html`${labelText}${inputTag}`: html`${inputTag}${labelText}`
        return html`<label class="inline-flex gap-[8px] items-center">${inputArea}</label>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'daikin-radio': DaikinRadio;
    }
}

export default DaikinRadio;
