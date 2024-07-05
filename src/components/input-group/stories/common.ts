import type { StoryObj } from "@storybook/web-components";

import type { DaikinInputGroupProps } from "../daikin-input-group";

export interface DaikinInputGroupStoryArgs extends DaikinInputGroupProps {
  input: "Text Input" | "Textarea";
}

type Story = StoryObj<DaikinInputGroupStoryArgs>;

export const Default: Story = {
  args: {
    input: "Text Input",
    label: "Label text",
    helper: "Helper text",
    disabled: false,
    required: false,
    error: undefined,
  },
};
