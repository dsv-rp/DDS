import type { DaikinCardTitle } from "#package/components/card-title/daikin-card-title";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinCardTitleStoryArgs = Required<ElementProps<DaikinCardTitle>>;

export const DAIKIN_CARD_TITLE_ARG_TYPES = {
  underLine: { type: "boolean" },
} as const satisfies Meta<DaikinCardTitleStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCardTitleStoryArgs>;
