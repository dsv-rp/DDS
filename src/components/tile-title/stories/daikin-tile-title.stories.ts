import { metadata } from "#storybook-framework";
import { DAIKIN_TILE_TITLE_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tile Title",
  tags: ["autodocs"],
  argTypes: DAIKIN_TILE_TITLE_ARG_TYPES,
  ...metadata,
};

export const Normal: Story = {
  args: {
    label: "Card Header",
    withUnderLine: false,
  },
};

export const WithUnderLine: Story = {
  args: {
    label: "Card Header",
    withUnderLine: true,
  },
};
