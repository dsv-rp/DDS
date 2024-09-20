import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, queryByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_TREE_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tree Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_TREE_ITEM_ARG_TYPES,
  ...metadata,
};

export const Button: Story = {
  args: {
    selected: false,
    disabled: false,
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tree-item")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowRole(root, "button");
    await expect(queryByShadowRole(root, "link")).not.toBeInTheDocument();
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
    ...Button.args,
    selected: true,
  },
};

export const Link: Story = {
  args: {
    ...Button.args,
    type: "link",
    href: "#",
  },
  play: definePlay(async ({ canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-tree-item")[0];
    await expect(root).toBeInTheDocument();

    await expect(getByShadowRole(root, "link")).toBeInTheDocument();
    await expect(queryByShadowRole(root, "button")).not.toBeInTheDocument();
  }),
};

export const ButtonDisabled: Story = {
  args: {
    ...Button.args,
    disabled: true,
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tree-item")[0];
    await expect(root).toBeInTheDocument();

    const innerInput = getByShadowRole(root, "button");
    await expect(args.onClick).toHaveBeenCalledTimes(0);

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(innerInput);
      await expect(args.onClick).toHaveBeenCalledTimes(0);
    });
  }),
};

export const LinkDisabled: Story = {
  args: {
    ...Button.args,
    type: "link",
    href: "#",
    disabled: true,
  },
  play: definePlay(async ({ canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-tree-item")[0];
    await expect(root).toBeInTheDocument();

    await expect(queryByShadowRole(root, "link")).not.toBeInTheDocument();
    await expect(queryByShadowRole(root, "button")).not.toBeInTheDocument();
  }),
};
