import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_TREE_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tree Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_TREE_ITEM_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    label: "Tree item",
    value: "value",
    selected: false,
    disabled: false,
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tree-item")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowText(root, args.label);
    await expect(args.onClick).toHaveBeenCalledTimes(0);

    // should react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerInput);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  }),
};

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tree-item")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowText(root, args.label);
    await expect(args.onClick).toHaveBeenCalledTimes(0);

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerInput);
      await expect(args.onClick).toHaveBeenCalledTimes(0);
    });
  }),
};
