import { metadata } from "#storybook-framework";
import { DAIKIN_CARD_TITLE_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Card Title",
  tags: ["autodocs"],
  argTypes: DAIKIN_CARD_TITLE_ARG_TYPES,
  ...metadata,
};

export const Normal: Story = {
  args: {
    underline: false,
  },
};

export const Underline: Story = {
  args: {
    underline: true,
  },
};
