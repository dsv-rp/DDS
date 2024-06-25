import React from 'react';

import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/react';

import '../daikin-checkbox';
import type { DaikinCheckBoxStoryArgs } from './common';

const CheckBox: React.FC<DaikinCheckBoxStoryArgs> = ({ size, disabled, readonly, labelPosition, label, checkState }) => {
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
    title: 'Components/CheckBox',
    tags: ['autodocs'],
    component: CheckBox,
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

export { Small, Large } from './common';
