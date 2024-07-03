import type { Meta } from '@storybook/web-components';
import { html } from 'lit';

import '../daikin-input-group.ts';
import '../../text-input/daikin-text-input.ts';
import type { DaikinInputGroupStoryArgs } from './common.ts';
import { ifDefined } from 'lit/directives/if-defined.js';

const meta = {
    title: 'Components/Input Group',
    tags: ['autodocs'],
    render: (args) => html`
        <daikin-input-group
            label=${ifDefined(args.label)}
            helper=${ifDefined(args.helper)}
            ?disabled=${args.disabled}
            ?required=${args.required}
            error=${ifDefined(args.error)}
        >
            <daikin-text-input value="Value"></daikin-text-input>
        </daikin-input-group>
    `,
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

export { Default } from './common.ts';
