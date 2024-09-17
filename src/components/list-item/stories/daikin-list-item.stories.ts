import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_LIST_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/List Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_LIST_ITEM_ARG_TYPES,
  ...metadata,
};

export const Button: Story = {
  args: {
    type: "button",
    disabled: false,
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-list-item")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowRole(root, "button");
    await expect(args.onClick).toHaveBeenCalledTimes(0);

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }),
};

export const Link: Story = {
  args: {
    ...Button.args,
    type: "link",
    href: "#",
  },
};

export const WithIcon: Story = {
  args: {
    ...Button.args,
    leftIcon: "positive",
  },
};

export const Disabled: Story = {
  args: {
    ...Button.args,
    disabled: true,
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-list-item")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowRole(root, "button");
    await expect(args.onClick).toHaveBeenCalledTimes(0);

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.type(innerInput, "Example");
      await expect(args.onClick).toHaveBeenCalledTimes(0);
    });
  }),
};
