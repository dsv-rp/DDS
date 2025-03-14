import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent, waitFor } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_MENU_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Menu",
  tags: ["autodocs"],
  argTypes: DAIKIN_MENU_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    placement: "bottom",
    color: "default",
    open: false,
    popoverValue: "auto",
    trigger: "click",
    viewArea: "small",
    onToggle: fn(),
    onBeforeToggle: fn(),
    __vrtContainer__: false,
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-menu")[0];
    await expect(root).toBeInTheDocument();

    const trigger = getByShadowRole(root, "button", { name: "Menu" });
    await expect(trigger).toBeInTheDocument();

    await expect(args.onToggle).toHaveBeenCalledTimes(0);

    await expect(root).not.toHaveAttribute("open");

    const list = getByShadowRole(root, "list");
    await expect(list).toBeInTheDocument();

    const listItem1 = getByShadowText(root, "List item label 1");
    await expect(listItem1).toBeInTheDocument();
    const listItem2 = getByShadowText(root, "List item label 2");
    await expect(listItem2).toBeInTheDocument();
    const listItem3 = getByShadowText(root, "List item label 3");
    await expect(listItem3).toBeInTheDocument();

    await step("Try to click trigger element by mouse", async () => {
      await userEvent.click(trigger);
      await waitFor(() => expect(root).toHaveAttribute("open"));
      await expect(args.onToggle).toHaveBeenCalledTimes(1);

      // Click trigger again to close menu.
      await userEvent.click(trigger);
      await waitFor(() => expect(root).not.toHaveAttribute("open"));
      await expect(args.onToggle).toHaveBeenCalledTimes(2);

      // Click trigger and click the active list item.
      await userEvent.click(trigger);
      await waitFor(() => expect(root).toHaveAttribute("open"));
      await expect(args.onToggle).toHaveBeenCalledTimes(3);
      await userEvent.click(listItem1);
      await waitFor(() => expect(root).not.toHaveAttribute("open"));
      await expect(args.onToggle).toHaveBeenCalledTimes(4);
    });

    await step(
      "Try to click trigger element by keyboard and move the focus",
      async () => {
        trigger.focus();
        await userEvent.keyboard("[Space]");
        await waitFor(() => expect(root).toHaveAttribute("open"));
        await expect(args.onToggle).toHaveBeenCalledTimes(5);
        // When open menu with keyboard, focus the first active item.
        await expect(listItem1).toHaveFocus();

        await userEvent.keyboard("[ArrowDown]");
        await expect(listItem2).toHaveFocus();

        await userEvent.keyboard("[ArrowDown]");
        await expect(listItem3).toHaveFocus();

        await userEvent.keyboard("[ArrowDown]");
        await expect(listItem1).toHaveFocus();

        await userEvent.keyboard("[ArrowUp]");
        await expect(listItem3).toHaveFocus();

        await userEvent.keyboard("[ArrowUp]");
        await expect(listItem2).toHaveFocus();

        await userEvent.keyboard("[End]");
        await expect(listItem3).toHaveFocus();

        await userEvent.keyboard("[Home]");
        await expect(listItem1).toHaveFocus();

        await waitFor(() => expect(root).not.toHaveAttribute(""));
      }
    );
  }),
};

export const FullSizeView: Story = {
  args: {
    ...Default.args,
    viewArea: "full",
  },
};
