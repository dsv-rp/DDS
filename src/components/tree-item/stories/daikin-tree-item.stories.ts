import { metadata } from "#storybook-framework";
import { DAIKIN_TREE_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tree Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_TREE_ITEM_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    selected: false,
    disabled: false,
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
