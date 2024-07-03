import { action } from '@storybook/addon-actions';
import type { Meta } from '@storybook/web-components';
import { html } from 'lit';

import '../daikin-text-input.ts';
import type { DaikinTextInputStoryArgs } from './common.ts';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta = {
    title: 'Components/Text Input',
    tags: ['autodocs'],
    render: (args) => html`
        <daikin-text-input
            value=${args.value}
            type=${ifDefined(args.type)}
            placeholder=${args.placeholder}
            ?disabled=${args.disabled}
            ?readonly=${args.readonly}
            name=${ifDefined(args.name)}
            maxlength=${ifDefined(args.maxlength)}
            autocomplete=${ifDefined(args.autocomplete)}
            ?error=${args.error}
            @change=${action('change')}
            @input=${action('input')}
            @keydown=${action('keydown')}
        >
        </daikin-text-input>
    `,
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
            description:
                'Indication of error status. If disabled is true, ignore this.',
            defaultValue: false,
            type: 'boolean',
        },
    },
} satisfies Meta<DaikinTextInputStoryArgs>;

export default meta;

export { Default } from './common.ts';
