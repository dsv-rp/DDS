import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/web-components';
import { html } from 'lit';

import '../daikin-radio.ts';
import type { DaikinRadioStoryArgs } from './common.ts';

const meta = {
    title: 'Components/Radio',
    tags: ['autodocs'],
    render: (args) => html`
        <daikin-radio
            size=${args.size}
            ?disabled=${args.disabled}
            ?readonly=${args.readonly}
            @click=${action('radio-click')}
            label=${args.label}
            label-position=${args.labelPosition}
            check-state=${args.checkState}
        >
        </daikin-radio>
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
} satisfies Meta<DaikinRadioStoryArgs>;

export default meta;

export { Small, Large } from './common.ts';
