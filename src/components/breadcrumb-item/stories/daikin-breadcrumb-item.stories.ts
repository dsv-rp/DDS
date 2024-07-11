import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_BREADCRUMB_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Breadcrumb Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_BREADCRUMB_ITEM_ARG_TYPES,
  ...metadata,
};

export const Max: Story = {
  args: {
    size: "max",
    href: "#",
    target: "_self",
    disabled: false,
  },
};

export const Min: Story = {
  args: {
    size: "min",
    href: "#",
    target: "_self",
    disabled: false,
  },
};
