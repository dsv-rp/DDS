import { metadata } from "#storybook-framework";
import { DAIKIN_PROGRESS_INDICATOR_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Progress Indicator Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_PROGRESS_INDICATOR_ITEM_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    direction: "horizontal",
    status: "unfinished",
  },
};

export const Vertical: Story = {
  args: {
    ...Default.args,
    direction: "vertical",
  },
};

export const Progress: Story = {
  args: {
    ...Default.args,
    status: "inprogress",
  },
};

export const Finished: Story = {
  args: {
    ...Default.args,
    status: "finished",
  },
};

export const Error: Story = {
  args: {
    ...Default.args,
    status: "error",
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    status: "disabled",
  },
};
