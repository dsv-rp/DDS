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

export const progressIndicatorLabelMap = {
  finished: "Finished",
  inprogress: "Inprogress",
  unfinished: "Unfinished",
};

export const progressIndicatorLabel = (currentItem: number, index: number) => {
  if (currentItem === index) {
    return "Inprogress";
  } else if (currentItem > index) {
    return "Finished";
  } else {
    return "Unfinished";
  }
};
