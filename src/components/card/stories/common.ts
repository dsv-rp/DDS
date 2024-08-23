import type { DaikinCard } from "#package/components/card/daikin-card";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinCardStoryArgs = Required<ElementProps<DaikinCard>>;

export const DAIKIN_CARD_ARG_TYPES = {
  borderType: {
    control: { type: "select" },
    options: ["none", "gray", "red"],
  },
} as const satisfies Meta<DaikinCardStoryArgs>["argTypes"];

export type CardStory = StoryObj<DaikinCardStoryArgs>;
