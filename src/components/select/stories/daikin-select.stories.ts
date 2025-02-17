import { metadata } from "#storybook-framework";
import { DAIKIN_SELECT_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Select",
  tags: ["autodocs"],
  argTypes: DAIKIN_SELECT_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    error: false,
    disabled: false,
    required: false,
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
