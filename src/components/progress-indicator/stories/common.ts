import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinProgressIndicator } from "../daikin-progress-indicator";

export type DaikinProgressIndicatorStoryArgs = Required<
  ElementProps<DaikinProgressIndicator>
>;

export const DAIKIN_PROGRESS_INDICATOR_ARG_TYPES = {
  direction: {
    description: "Whether the progress indicator item is active",
    control: { type: "radio" },
    options: ["horizontal", "vertical"],
  },
} satisfies Meta<DaikinProgressIndicatorStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinProgressIndicatorStoryArgs>;
