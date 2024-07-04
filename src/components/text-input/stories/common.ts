import type { StoryObj } from "@storybook/web-components";

import type { DaikinTextInputProps } from "../daikin-text-input";

export interface DaikinTextInputStoryArgs extends DaikinTextInputProps {}

type Story = StoryObj<DaikinTextInputStoryArgs>;

export const Default: Story = {
  args: {
    value: "Value",
    type: "text",
    placeholder: "Placeholder text",
    disabled: false,
    readonly: false,
    name: "Example",
    maxlength: undefined,
    autocomplete: undefined,
    error: false,
  },
};
