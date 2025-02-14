import { metadata } from "#storybook-framework";
import { DAIKIN_CAROUSEL_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Carousel Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_CAROUSEL_ITEM_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    image: "Carousel image",
    title: "Carousel title",
    description: "Carousel description",
  },
};
