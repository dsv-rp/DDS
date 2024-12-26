import type { DaikinCard } from "#package/components/card/daikin-card";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCardStoryArgs
  extends Required<ElementProps<DaikinCard>> {
  withBody: boolean;
  withFooter: boolean;
}

export const DAIKIN_CARD_ARG_TYPES = {
  outline: { type: "boolean" },
  withBody: { type: "boolean" },
  withFooter: { type: "boolean" },
} as const satisfies Meta<DaikinCardStoryArgs>["argTypes"];

export type CardStory = StoryObj<DaikinCardStoryArgs>;
