import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/web-components';
import { html } from 'lit';

import '../daikin-button';
import type { DaikinButtonStoryArgs } from './common.ts';

const meta = {
    title: 'Components/Button',
    tags: ['autodocs'],
    render: (args) => html`
        <daikin-button
            variant=${args.variant}
            ?disabled=${args.disabled}
            @click=${action('button-click')}
        >
            ${args.label}
        </daikin-button>
    `,
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'tertiary', 'primary-danger']
        },
        disabled: { type: 'boolean' },
        label: {
            type: 'string'
        }
    }
} satisfies Meta<DaikinButtonStoryArgs>;

export default meta;

export { Primary, Secondary, Tertiary, PrimaryDanger } from './common';
