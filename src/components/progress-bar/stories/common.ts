import type { DaikinProgressBar } from "#package/components/progress-bar/daikin-progress-bar";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinProgressBarStoryArgs = Required<
  ElementProps<DaikinProgressBar>
>;

export const DAIKIN_PROGRESS_BAR_ARG_TYPES = {
  value: {
    type: "number",
  },
  variant: {
    control: "radio",
    options: ["inprogress", "completed", "indeterminate", "error"],
  },
  size: {
    control: "radio",
    options: ["medium", "large"],
  },
  max: {
    type: "number",
  },
  helper: {
    type: "string",
  },
} satisfies Meta<DaikinProgressBarStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinProgressBarStoryArgs>;
