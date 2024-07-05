import type { StoryObj } from "@storybook/web-components";

import type { DaikinTextareaProps } from "../daikin-textarea";

export interface DaikinTextareaStoryArgs extends DaikinTextareaProps {}

type Story = StoryObj<DaikinTextareaStoryArgs>;

export const Default: Story = {
  args: {
    placeholder: "Placeholder text",
    disabled: false,
    readonly: false,
    maxlength: undefined,
    error: false,
  },
};
