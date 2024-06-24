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
            size=${args.size ?? "default"}
            href=${args.href}
            type=${args.type ?? "button"}
            role=${args.role}
        >
            ${args.label}
        `,
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'tertiary', 'primaryDanger']
        },
        disabled: { type: 'boolean' },
        label: {
            type: 'string'
        },
        size: {
            control: { type: 'select' },
            options: ['default', 'condensed']
        },
        href: {
            type: 'string'
        },
        type: {
            control: { type: 'select' },
            options: ['button' , 'submit' ,'reset']
        },
        role: {
            type: 'string'
        },
    }
} satisfies Meta<DaikinButtonStoryArgs>;

export default meta;

export { Primary, Secondary, Tertiary, PrimaryDanger } from './common';
