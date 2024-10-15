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
    status: "unfinished",
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
