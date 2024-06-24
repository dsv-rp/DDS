import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/web-components';
import { html } from 'lit';

import '../daikin-checkbox.ts';
import type { DaikinCheckBoxStoryArgs } from './common.ts';

const meta = {
    title: 'Components/CheckBox',
    tags: ['autodocs'],
    render: (args) => html`
        <daikin-checkbox
            size=${args.size}
            ?disabled=${args.disabled}
            ?readonly=${args.readonly}
            @click=${action('checkbox-click')}
            label=${args.label}
            label-position=${args.labelPosition}
            check-state=${args.checkState}
        >
        </daikin-checkbox>
    `,
    argTypes: {
        size: {
            control: { type: 'select' },
            options: ['small', 'large']
        },
        checkState: {
            control: { type: 'select' },
            options: ['unchecked', 'indeterminate', 'checked']
        },
        disabled: { type: 'boolean' },
        labelPosition: { type: 'string' },
        readonly: { type: 'boolean' },
        label: {
            type: 'string'
        },
        name: { type: 'string' },
        value: { type: 'string' },
    }
} satisfies Meta<DaikinCheckBoxStoryArgs>;

export default meta;

export { Small, Large } from './common.ts';
