import { metadata } from "#storybook-framework";
import { fn } from "@storybook/test";
import { DAIKIN_CAROUSEL_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Carousel Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_CAROUSEL_ITEM_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    label: "Carousel item",
    onCarouselClick: fn(),
  },
};
