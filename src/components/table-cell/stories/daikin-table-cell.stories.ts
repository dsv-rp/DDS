import { metadata } from "#storybook-framework";
import { DAIKIN_TABLE_CELL_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Table Cell",
  tags: ["autodocs"],
  argTypes: DAIKIN_TABLE_CELL_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    alignment: "left",
  },
};

export const HasSubtitle: Story = {
  args: {
    ...Default.args,
    subtitle: "Table cell subtitle",
  },
};
