import { metadata } from "#storybook-framework";
import { DAIKIN_CARD_HEADER_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Card Header",
  tags: ["autodocs"],
  argTypes: DAIKIN_CARD_HEADER_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    label: "Label Title",
    description: "Description",
    leftIcon: "alarm",
  },
};
