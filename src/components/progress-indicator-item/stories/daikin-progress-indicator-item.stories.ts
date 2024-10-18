import { metadata } from "#storybook-framework";
import { DAIKIN_PROGRESS_INDICATOR_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Progress Indicator Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_PROGRESS_INDICATOR_ITEM_ARG_TYPES,
  ...metadata,
};

export const Unfinished: Story = {
  args: {
    status: "unfinished",
    label: "Progress indicator label",
    description: "Progress indicator description",
  },
};

export const InProgress: Story = {
  args: {
    ...Unfinished.args,
    status: "inprogress",
  },
};

export const Finished: Story = {
  args: {
    ...Unfinished.args,
    status: "finished",
  },
};
