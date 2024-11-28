import type { DaikinProgressIndicator } from "#package/components/progress-indicator/daikin-progress-indicator";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinProgressIndicatorStoryArgs = Required<
  ElementProps<DaikinProgressIndicator>
>;

export const DAIKIN_PROGRESS_INDICATOR_ARG_TYPES = {
  currentItem: {
    type: "number",
  },
} satisfies Meta<DaikinProgressIndicatorStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinProgressIndicatorStoryArgs>;
