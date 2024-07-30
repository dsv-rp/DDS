import { metadata } from "#storybook-framework";
import { fn } from "@storybook/test";
import { DAIKIN_PAGINATION_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Pagination",
  tags: ["autodocs"],
  argTypes: DAIKIN_PAGINATION_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    size: "default",
    disabled: false,
    checked: false,
    onChange: fn(),
    onClick: fn(),
  },
};
