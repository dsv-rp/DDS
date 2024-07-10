import { metadata } from "#storybook-framework";
import { DAIKIN_ICON_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Icon",
  tags: ["autodocs"],
  argTypes: DAIKIN_ICON_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    icon: "positive",
    color: "black",
    size: "m",
  },
};
