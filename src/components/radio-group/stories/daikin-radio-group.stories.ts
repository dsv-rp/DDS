import { metadata } from "#storybook-framework";
import { fn } from "@storybook/test";
import { DAIKIN_RADIO_GROUP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Radio Group",
  tags: ["autodocs"],
  argTypes: DAIKIN_RADIO_GROUP_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    orientation: "horizontal",
    disabled: false,
    label: "Radio group",
    defaultSelected: "value1",
    onChange: fn(),
    onClick: fn(),
  },
};
