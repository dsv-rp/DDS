import React from 'react';

import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import '../daikin-checkbox';
import type { DaikinCheckboxStoryArgs } from './common';

const Checkbox: React.FC<DaikinCheckboxStoryArgs> = ({ size, disabled, readonly, labelPosition, label, checkState }) => {
    return (
        <daikin-checkbox
            size={size}
            disabled={disabled ? true : undefined}
            onClick={action('checkbox-click')}
            readonly={readonly ? true : undefined}
            label-position={labelPosition}
            label={label}
            check-state={checkState}
        >
        </daikin-checkbox>
    );
};

const meta = {
    title: 'Components/Checkbox',
    tags: ['autodocs'],
    component: Checkbox,
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
} satisfies Meta<DaikinCheckboxStoryArgs>;

export default meta;

export { Small, Large } from './common';