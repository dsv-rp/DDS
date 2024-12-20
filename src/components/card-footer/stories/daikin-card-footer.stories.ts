import { metadata } from "#storybook-framework";
import { DAIKIN_CARD_FOOTER_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Card Footer",
  tags: ["autodocs"],
  argTypes: DAIKIN_CARD_FOOTER_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    actionType: "button",
  },
};
