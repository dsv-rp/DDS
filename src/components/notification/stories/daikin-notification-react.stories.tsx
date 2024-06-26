import React from 'react';

import type { Meta } from '@storybook/react';

import '../daikin-notification';
import { DaikinNotificationStoryArgs } from './common';
import { createComponent } from '@lit/react';
import DaikinNotification from '../daikin-notification';

const DaikinNotificationWC = createComponent({
    tagName: 'daikin-notification',
    elementClass: DaikinNotification,
    react: React,
    events: {
        daikinAction: 'daikin-action',
        daikinClose: 'daikin-close',
    },
});

const Notification: React.FC<DaikinNotificationStoryArgs> = ({
    title,
    description,
    variant,
    status,
    line,
    open,
    closeButton,
    actionButtonLabel,
}) => {
    return (
        <DaikinNotificationWC
            title={title}
            description={description}
            variant={variant}
            status={status}
            line={line}
            open={open}
            closeButton={closeButton}
            actionButtonLabel={actionButtonLabel}
            daikinAction={() => console.log('daikin-action')}
            daikinClose={() => console.log('daikin-close')}
        />
    );
};

const meta = {
    title: 'Components/Notification',
    tags: ['autodocs'],
    component: Notification,
    argTypes: {
        title: {
            description: 'Title text',
            type: 'string',
        },
        description: {
            description: 'Description text',
            type: 'string',
        },
        variant: {
            description: 'Type of notification',
            defaultValue: 'toast',
            control: { type: 'select' },
            options: ['toast', 'inline'],
        },
        status: {
            description: 'Status of notification',
            defaultValue: 'positive',
            control: { type: 'select' },
            options: [
                'positive',
                'negative',
                'warning',
                'alarm',
                'information',
            ],
        },
        line: {
            description: 'Display in single or multiple lines',
            defaultValue: 'single',
            control: { type: 'select' },
            options: ['single', 'multi'],
        },
        open: {
            description: 'Whether the component is open',
            defaultValue: true,
            type: 'boolean',
        },
        closeButton: {
            description: 'Whether to display the close button',
            defaultValue: false,
            type: 'boolean',
        },
        actionButtonLabel: {
            description:
                'Label text when using action button (Action buttons can only be used when variant is `inline`)',
            type: 'string',
        },
    },
} satisfies Meta<DaikinNotificationStoryArgs>;

export default meta;

export { Toast, Inline } from '../../notification/stories/common';
