import { metadata } from "#storybook-framework";
import { DAIKIN_TOOLTIP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  argTypes: DAIKIN_TOOLTIP_ARG_TYPES,
  ...metadata,
};

export const Light: Story = {
  args: {
    placement: "top",
    variant: "light",
    open: false,
    description: "test description",
    closeOnClick: false,
  },
};

export const Dark: Story = {
  args: {
    placement: "top",
    variant: "dark",
    open: false,
    description: "test description",
    closeOnClick: false,
  },
};
