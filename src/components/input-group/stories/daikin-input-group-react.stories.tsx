import React from 'react';

import type { Meta } from '@storybook/react';

import '../daikin-input-group';
import '../../text-input';
import { DaikinInputGroupStoryArgs } from './common';
import { createComponent } from '@lit/react';
import DaikinInputGroup from '../daikin-input-group';
import DaikinTextInput from '../../text-input/daikin-text-input';

const InputGroup: React.FC<DaikinInputGroupStoryArgs> = ({
    label,
    helper,
    disabled,
    required,
    error,
}) => {
    const DaikinInputGroupWC = createComponent({
        tagName: 'daikin-input-group',
        elementClass: DaikinInputGroup,
        react: React,
    });
    const DaikinTextInputWC = createComponent({
        tagName: 'daikin-text-input',
        elementClass: DaikinTextInput,
        react: React,
    });

    return (
        <DaikinInputGroupWC
            label={label}
            helper={helper}
            disabled={disabled}
            required={required}
            error={error}
        >
            <DaikinTextInputWC value="Value" />
        </DaikinInputGroupWC>
    );
};

const meta = {
    title: 'Components/Input Group',
    tags: ['autodocs'],
    component: InputGroup,
    argTypes: {
        label: {
            description: 'Label text to place at the top of the field',
            type: 'string',
        },
        helper: {
            description: 'Helper text to place at the bottom of the field',
            type: 'string',
        },
        disabled: {
            description: 'Whether the field is disabled',
            defaultValue: false,
            type: 'boolean',
        },
        required: {
            description: 'When input is required, give an explicit mark',
            defaultValue: false,
            type: 'boolean',
        },
        error: {
            description:
                'Message to display in case of error. If disabled is true, ignore this.',
            type: 'string',
        },
    },
} satisfies Meta<DaikinInputGroupStoryArgs>;

export default meta;

export { Default } from '../../input-group/stories/common';
