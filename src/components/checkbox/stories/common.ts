import type { StoryObj } from '@storybook/web-components';

import type { DaikinCheckboxProps } from '../daikin-checkbox';

export interface DaikinCheckboxStoryArgs extends DaikinCheckboxProps {

}

type Story = StoryObj<DaikinCheckboxStoryArgs>;

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

