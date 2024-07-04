import type { StoryObj } from "@storybook/web-components";

import type { DaikinRadioProps } from "../daikin-radio";

export interface DaikinRadioStoryArgs extends DaikinRadioProps {}

type Story = StoryObj<DaikinRadioStoryArgs>;

export const Small: Story = {
  args: {
    size: "small",
    disabled: false,
    label: "Radio label",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    disabled: false,
    label: "Radio label",
  },
};
