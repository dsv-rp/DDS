import { metadata } from "#storybook-framework";
import { DAIKIN_BREADCRUMB_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Breadcrumb Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_BREADCRUMB_ITEM_ARG_TYPES,
  ...metadata,
};

export const Normal: Story = {
  args: {
    variant: "normal",
    href: "#",
    target: "_self",
    disabled: false,
    trailingSlash: true,
  },
};

export const Ellipsis: Story = {
  args: {
    variant: "ellipsis",
    href: "#",
    target: "_self",
    disabled: false,
    trailingSlash: true,
  },
};
