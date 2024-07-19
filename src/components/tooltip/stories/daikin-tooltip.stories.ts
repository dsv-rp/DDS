import { metadata } from "#storybook-framework";
import { DAIKIN_TOOLTIP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  argTypes: DAIKIN_TOOLTIP_ARG_TYPES,
  ...metadata,
};

export const Primary: Story = {
  args: {
    placement: "top",
    variant: "light",
    open: false,
    description: "test description",
    closeOnClick: false,
  },
};
