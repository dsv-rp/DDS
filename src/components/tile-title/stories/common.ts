import type { DaikinTileTitle } from "#package/components/tile-title/daikin-tile-title";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinTileTitleStoryArgs = Required<ElementProps<DaikinTileTitle>>;

export const DAIKIN_TILE_TITLE_ARG_TYPES = {
  label: { type: "string" },
  withUnderLine: { type: "boolean" },
} as const satisfies Meta<DaikinTileTitleStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTileTitleStoryArgs>;
