import { metadata } from "#storybook-framework";
import { fn } from "@storybook/test";
import { DAIKIN_TABLE_HEADER_CELL_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Table Header Cell",
  tags: ["autodocs"],
  argTypes: DAIKIN_TABLE_HEADER_CELL_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    alignment: "left",
    sortable: false,
  },
};

export const Sortable: Story = {
  args: {
    ...Default.args,
    sortable: true,
    onChangeSort: fn(),
  },
};

export const LeftIcon: Story = {
  args: {
    ...Default.args,
    leftIcon: "positive",
  },
};
