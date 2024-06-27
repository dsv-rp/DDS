import type { StoryObj } from '@storybook/web-components';

import type { DaikinButtonProps } from '../daikin-button';

export interface DaikinButtonStoryArgs extends DaikinButtonProps {
    /**
     * Text input for users
     */
    label?: string;
}

type Story = StoryObj<DaikinButtonStoryArgs>;

export const Primary: Story = {
    args: {
        variant: 'primary',
        disabled: false,
        label: 'button',
        size: "default",
        type:"button",
    }
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        disabled: false,
        label: 'button',
        size: "default",
        type:"button",
    }
};

export const Tertiary: Story = {
    args: {
        variant: 'tertiary',
        disabled: false,
        label: 'button',
        size: "default",
        type:"button",
    }
};

export const PrimaryDanger: Story = {
    args: {
        variant: 'primaryDanger',
        disabled: false,
        label: 'button',
        size: "default",
        type:"button",
    }
};
