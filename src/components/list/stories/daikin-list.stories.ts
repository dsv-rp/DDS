import { metadata } from "#storybook-framework";
import { DAIKIN_LIST_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/List",
  tags: ["autodocs"],
  argTypes: DAIKIN_LIST_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {},
};
