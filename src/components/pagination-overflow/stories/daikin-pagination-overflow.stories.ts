import { metadata } from "#storybook-framework";
import { fn } from "@storybook/test";
import { DAIKIN_PAGINATION_OVERFLOW_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Pagination Overflow",
  tags: ["autodocs"],
  argTypes: DAIKIN_PAGINATION_OVERFLOW_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    value: 1,
    max: 5,
    totalItems: 5,
    onChange: fn(),
  },
};
