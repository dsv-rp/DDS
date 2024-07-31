import type { DaikinProgressBar } from "#package/components/progress-bar/daikin-progress-bar";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinProgressBarStoryArgs = Required<
  ElementProps<DaikinProgressBar>
>;

export const DAIKIN_PROGRESS_BAR_ARG_TYPES = {
  value: {
    description: "Value of the progress bar",
    type: "number",
  },
  variant: {
    description: "Status of the progress bar",
    defaultValue: "inprogress",
    control: { type: "radio" },
    options: ["inprogress", "completed", "indeterminate", "error"],
  },
  max: {
    description: "The max value of the progress bar",
    defaultValue: 100,
    type: "number",
  },
  helper: {
    description: "Helper text",
    defaultValue: undefined,
    type: "string",
  },
} satisfies Meta<DaikinProgressBarStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinProgressBarStoryArgs>;
