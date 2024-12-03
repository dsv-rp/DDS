import { metadata } from "#storybook-framework";
import { DAIKIN_BREADCRUMB_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Breadcrumb Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_BREADCRUMB_ITEM_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    variant: "normal",
    href: "https://dsv-rp.github.io/DDS",
    disabled: false,
  },
};
