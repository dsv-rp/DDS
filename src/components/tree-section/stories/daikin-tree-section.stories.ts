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
    selectable: false,
    selected: false,
    disabled: false,
    open: true,
    onToggle: fn(),
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
      await expect(args.onToggle).toHaveBeenCalledTimes(1);
      await expect(root).not.toHaveAttribute("open");
    });

    await step("Try to keyboard navigation", async () => {
      innerButton.focus();
      await userEvent.keyboard("[Space]");
      await expect(getByShadowText(root, "Tree item")).toBeVisible();
      await expect(args.onToggle).toHaveBeenCalledTimes(2);
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
  },
  play: definePlay(async ({ args, canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-tree-section")[0];
    await expect(root).toBeInTheDocument();

    await expect(
      getByShadowRole(root, "button", { name: "Tree label" })
    ).toHaveAttribute("disabled");
    await expect(args.onToggle).toHaveBeenCalledTimes(0);
  }),
};

export const CancelToggleEvent: Story = {
  args: {
    ...Default.args,
    onToggle: fn((event: Event): void => {
      event.preventDefault();
    }),
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
      await expect(args.onToggle).toHaveBeenCalledTimes(1);
      await expect(root).toHaveAttribute("open");
    });

    await step("Try to keyboard navigation", async () => {
      innerButton.focus();
      await userEvent.keyboard("[Space]");
      await expect(args.onToggle).toHaveBeenCalledTimes(2);
      await expect(root).toHaveAttribute("open");
    });
  }),
};
