import { metadata } from "#storybook-framework";
import { DAIKIN_DROPDOWN_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Dropdown Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_DROPDOWN_ITEM_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    value: "value",
  },
};
