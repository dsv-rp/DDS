import React from 'react';

import type { Meta } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../daikin-text-input';
import { DaikinTextInputStoryArgs } from './common';
import { ReactDaikinTextInput } from './react';

const TextInput: React.FC<DaikinTextInputStoryArgs> = ({
    value,
    type,
    placeholder,
    disabled,
    readonly,
    name,
    maxlength,
    autocomplete,
    error,
}) => {
    return (
        <ReactDaikinTextInput
            value={value}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            readonly={readonly}
            name={name}
            maxlength={maxlength}
            autocomplete={autocomplete}
            error={error}
            change={action('change')}
            input={action('input')}
            keydown={action('keydown')}
        />
    );
};

const meta = {
    title: 'Components/Text Input',
    tags: ['autodocs'],
    component: TextInput,
    argTypes: {
        value: {
            description: 'Field value',
            type: 'string',
        },
        type: {
            description: 'Type of field',
            defaultValue: 'text',
            control: { type: 'radio' },
            options: ['text', 'email', 'tel', 'search'],
        },
        placeholder: {
            description: 'Placeholder text',
            type: 'string',
        },
        disabled: {
            description: 'Whether the field is disabled',
            defaultValue: false,
            type: 'boolean',
        },
        readonly: {
            description: 'Whether the field is readonly',
            defaultValue: false,
            type: 'boolean',
        },
        name: {
            description: 'Name of the input field control used in the form',
            defaultValue: 'Example',
            type: 'string',
        },
        maxlength: {
            description: 'Maximum length in field values',
            type: 'number',
        },
        autocomplete: {
            description: 'Specify autocomplete attribute for form',
            type: 'string',
        },
        error: {
            description: 'Error state. Ignored if the `disabled` is `true`.',
            defaultValue: false,
            type: 'boolean',
        },
    },
} satisfies Meta<DaikinTextInputStoryArgs>;

export default meta;

export { Default } from './common';
