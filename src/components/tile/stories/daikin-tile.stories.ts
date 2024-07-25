import { metadata } from "#storybook-framework";
import { DAIKIN_TILE_ARG_TYPES, type TileStory } from "./common";

export default {
  title: "Components/Tile",
  tags: ["autodocs"],
  argTypes: DAIKIN_TILE_ARG_TYPES,
  ...metadata,
};

export const Default: TileStory = {
  args: {
    trailingSlash: false,
    overflow: "visible",
  },
};

export const Omission: TileStory = {
  args: {
    trailingSlash: true,
    overflow: "ellipsis",
  },
};
