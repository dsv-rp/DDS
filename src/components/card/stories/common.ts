import type { DaikinCard } from "#package/components/card/daikin-card";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCardStoryArgs
  extends Required<ElementProps<DaikinCard>> {
  withHeader: boolean;
}

export const DAIKIN_CARD_ARG_TYPES = {
  borderType: {
    control: { type: "select" },
    options: ["none", "gray", "red"],
  },
  withHeader: { type: "boolean" },
} as const satisfies Meta<DaikinCardStoryArgs>["argTypes"];

export type CardStory = StoryObj<DaikinCardStoryArgs>;
