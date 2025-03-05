import { metadata } from "#storybook-framework";
import { DAIKIN_LOADING_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Loading",
  tags: ["autodocs"],
  argTypes: DAIKIN_LOADING_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    size: "medium",
    background: false,
  },
};

export const Small: Story = {
  args: {
    ...Default.args,
    size: "small",
  },
};

export const Fill: Story = {
  args: {
    ...Default.args,
    background: true,
  },
};
