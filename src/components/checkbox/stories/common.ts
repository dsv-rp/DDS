import type { StoryObj } from '@storybook/web-components';

import type { DaikinCheckBoxProps } from '../daikin-checkbox';

export interface DaikinCheckBoxStoryArgs extends DaikinCheckBoxProps {

}

type Story = StoryObj<DaikinCheckBoxStoryArgs>;

export const Small: Story = {
    args: {
        size: 'small',
        disabled: false,
        label: 'Checkbox label'
    }
};

export const Large: Story = {
    args: {
        size: 'large',
        disabled: false,
        label: 'Checkbox label'
    }
};

