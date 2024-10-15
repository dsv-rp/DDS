import { metadata } from "#storybook-framework";
import { DAIKIN_PROGRESS_INDICATOR_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Progress Indicator",
  tags: ["autodocs"],
  argTypes: DAIKIN_PROGRESS_INDICATOR_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {},
};
