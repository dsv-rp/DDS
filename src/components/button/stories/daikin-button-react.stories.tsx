import React from 'react';

import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import '../daikin-button';
import type { DaikinButtonStoryArgs } from './common';

const Button: React.FC<DaikinButtonStoryArgs> = ({ variant, disabled, label, size, href, type, role }) => {
    return (
        <daikin-button
            disabled={disabled ? true : undefined}
            variant={variant}
            onClick={action('button-click')}
            size={size ?? "default"}
            href={href}
            type={type ?? "button"}
            role={role}
        >
            {label}
        </daikin-button>
    );
};

const meta = {
    title: 'Components/Button',
    tags: ['autodocs'],
    component: Button,
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
            options: ['button', 'submit', 'reset']
        },
        role: {
            type: 'string'
        },
    }
} satisfies Meta<DaikinButtonStoryArgs>;

export default meta;

export { Primary, Secondary, Tertiary, PrimaryDanger } from './common';
