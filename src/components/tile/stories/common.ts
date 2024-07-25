import type { DaikinTile } from "#package/components/tile/daikin-tile";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinTileStoryArgs = Required<ElementProps<DaikinTile>>;

export const DAIKIN_TILE_ARG_TYPES = {
  trailingSlash: { type: "boolean" },
  overflow: {
    control: { type: "select" },
    options: ["visible", "ellipsis"],
  },
} as const satisfies Meta<DaikinTileStoryArgs>["argTypes"];

export type TileStory = StoryObj<DaikinTileStoryArgs>;
