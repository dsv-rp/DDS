import React from 'react';

import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import '../daikin-button';
import type { DaikinButtonStoryArgs } from './common';
import { createComponent } from '@lit/react';
import DaikinButton from '../daikin-button';

const DaikinButtonWC = createComponent({
    tagName: 'daikin-button',
    elementClass: DaikinButton,
    react: React,
});

const Button: React.FC<DaikinButtonStoryArgs> = ({
    variant,
    disabled,
    label,
}) => {
    return (
        <DaikinButtonWC
            disabled={disabled ? true : undefined}
            variant={variant}
            onClick={action('button-click')}
        >
            {label}
        </DaikinButtonWC>
    );
};

const meta = {
    title: 'Components/Button',
    tags: ['autodocs'],
    component: Button,
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['primary', 'secondary', 'tertiary', 'primary-danger'],
        },
        disabled: { type: 'boolean' },
        label: {
            type: 'string',
        },
    },
} satisfies Meta<DaikinButtonStoryArgs>;

export default meta;

export { Primary, Secondary, Tertiary, PrimaryDanger } from './common';
