import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_TREE_SECTION_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tree Section",
  tags: ["autodocs"],
  argTypes: DAIKIN_TREE_SECTION_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    label: "Tree label",
    selected: false,
    disabled: false,
    open: true,
    onClick: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tree-section")[0];
    await expect(root).toBeInTheDocument();

    await expect(root).toHaveAttribute("open");
    await expect(getByShadowText(root, "Tree item")).toBeVisible();

    const innerButton = getByShadowRole(root, "button", { name: "Tree label" });

    await expect(innerButton).toBeInTheDocument();

    await step("Try to click inner summary", async () => {
      await userEvent.click(innerButton);
      await expect(args.onClick).toHaveBeenCalledTimes(1);
      await expect(root).not.toHaveAttribute("open");
    });

    await step("Try to keyboard navigation", async () => {
      innerButton.focus();
      await userEvent.keyboard("[Space]");
      await expect(getByShadowText(root, "Tree item")).toBeVisible();
      await expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  }),
};

export const Close: Story = {
  args: {
    ...Default.args,
    open: false,
  },
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
  },
  play: definePlay(async ({ args, canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-tree-section")[0];
    await expect(root).toBeInTheDocument();

    await expect(
      getByShadowRole(root, "button", { name: "Tree label" })
    ).toHaveAttribute("disabled");
    await expect(args.onClick).toHaveBeenCalledTimes(0);
  }),
};