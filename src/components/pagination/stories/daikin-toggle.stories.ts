import { metadata } from "#storybook-framework";
import { DAIKIN_PAGINATION_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Pagination",
  tags: ["autodocs"],
  argTypes: DAIKIN_PAGINATION_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    value: 1,
    max: 5,
  },
};
