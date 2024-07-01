import ctl from '@netlify/classnames-template-literals';
import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import tailwindStyles from '../../tailwind.css';
import { cva, type VariantProps } from "class-variance-authority";
import type { OmitNull } from "../../typeUtils";

const baseCheckboxCN = ctl(`
    appearance-none

    inline-block
    relative
    rounded-sm
    border-solid
    border-2
    border-daikinNeutral-400

    hover:border-daikinBlue-300

    active:border-daikinBlue-600
    active:checked:bg-daikinBlue-600

    indeterminate:border-daikinBlue-600
    indeterminate:bg-daikinBlue-600

    checked:border-daikinBlue-600
    checked:bg-daikinBlue-600

    after:absolute
    after:!w-full
    after:!h-full
    after:text-white

    checked:after:i-daikin-checkbox-checked
    indeterminate:after:i-daikin-checkbox-indeterminate

    focus-visible:border-daikinBlue-700
    focus-visible:outline-none

    checked:focus-visible:border-daikinBlue-700
    checked:focus-visible:bg-daikinBlue-700

    checked:hover:border-daikinBlue-300
    checked:hover:bg-daikinBlue-300
    checked:active:border-daikinBlue-600
    checked:active:bg-daikinBlue-600

    indeterminate:active:border-daikinBlue-600
    indeterminate:active:bg-daikinBlue-600
    indeterminate:hover:border-daikinBlue-300
    indeterminate:hover:bg-daikinBlue-300

    indeterminate:focus-visible:border-daikinBlue-700
    indeterminate:focus-visible:bg-daikinBlue-700

    disabled:!border-daikinNeutral-200
    disabled:!bg-white
    indeterminate:disabled:!bg-daikinNeutral-200
    checked:disabled:!bg-daikinNeutral-200
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

const checkboxCN = cva(baseCheckboxCN, {
    variants: {
            size: {
                small: ["w-[18px]", "h-[18px]"],
                large: ["w-5", "h-5"],
            },
        },
        defaultVariants: {
            size: "small"
        }
});

type LabelProps = OmitNull<VariantProps<typeof labelCN>>;
type CheckboxProps = OmitNull<VariantProps<typeof checkboxCN>>;
type ComponentSize = LabelProps["size"] & CheckboxProps["size"];

export interface DaikinCheckboxProps {
    label: string
    size: ComponentSize;
    disabled: boolean;
    labelPosition: "left" | "right";
    readonly: boolean;
    checkState: "unchecked" | "indeterminate" | "checked";
    name: string;
    value: string;
    error: boolean;
}

/**
 * Primary UI component for user interaction
 */
@customElement("daikin-checkbox")
class DaikinCheckbox extends LitElement implements DaikinCheckboxProps {
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
    size: ComponentSize  = "small";

    /**
     * Specify the label position
     * when `left` the label will be in left of checkbox, when `right` label will be in right of checkbox
     */
    @property({ type: String, attribute: "label-position"})
    labelPosition: "left" | "right" = "right";

    /**
     * Specify whether the Checkbox should be disabled
     */
    @property({ type: Boolean, reflect: true })
    disabled = false;

    /**
     * Specify whether the checkbox is read only
     */
    @property({ type: Boolean, reflect: true })
    readonly = false;
    
    /**
     * Specify whether the checkbox is be checked
     */
    @property({ type: String , reflect: true, attribute: "check-state"})
    checkState: "unchecked" | "indeterminate" | "checked"  = "unchecked";

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
     * Specify whether the Checkbox is in a error state
     */
    @property({ type: Boolean , reflect: true})
    error = false;

    render() {
        // Specify the component size
        const labelClassName = labelCN({size: this.size})
        const checkboxClassName = checkboxCN({size: this.size})

        const isChecked = this.checkState === 'checked';
        const isIndeterminate = this.checkState === 'indeterminate';

        const labelText = this.label ? html`<span class="${labelClassName}">${this.label}</span>` : html``;
        const inputTag = html`<input class="${checkboxClassName}" type="checkbox" name="${this.name}" value="${this.value}" .indeterminate=${isIndeterminate} .checked=${isChecked} ?readonly=${this.readonly} ?disabled=${this.disabled} @click=${this._handleClick}>`;
        const inputArea = this.labelPosition === 'left' ? html`${labelText}${inputTag}`: html`${inputTag}${labelText}`
        return html`<label class="inline-flex gap-[10px] items-center">${inputArea}</label>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'daikin-checkbox': DaikinCheckbox;
    }
}

export default DaikinCheckbox;
