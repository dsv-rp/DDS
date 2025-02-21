import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, waitFor } from "@storybook/test";
import { getByShadowRole, queryByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_TOOLTIP_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  argTypes: DAIKIN_TOOLTIP_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    placement: "bottom",
    color: "default",
    open: false,
    description:
      "This is a description using attributes.\nIt supports line breaks.",
    popoverValue: "auto",
    trigger: "hover",
    viewArea: "small",
    onToggle: fn(),
    onBeforeToggle: fn(),
    __vrtContainer__: false,
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-tooltip")[0];
    await expect(root).toBeInTheDocument();

    const trigger = getByShadowRole(root, "button", { name: "Trigger" });
    const tooltip = queryByShadowRole(root, "tooltip");

    await expect(root).not.toHaveAttribute("open");
    await expect(args.onToggle).toHaveBeenCalledTimes(0);
    await expect(tooltip).not.toBeInTheDocument();

    await step("Try to focus trigger element", async () => {
      trigger.focus();

      await waitFor(() => expect(root).toHaveAttribute("open"));
    });

    // TODO (DDS-1631): hover function is not work well when using storybook test library
    // await userEvent.hover(trigger);
    // await waitFor(() => expect(root).toHaveAttribute("open"));
    // await userEvent.click(trigger);
    // await waitFor(() => expect(root).not.toHaveAttribute("open"));
    // await userEvent.unhover(trigger);
    // await waitFor(() => expect(root).not.toHaveAttribute("open"));
    // trigger.focus();
    // await waitFor(() => expect(root).toHaveAttribute("open"));

    await step("Try to focus out trigger element", async () => {
      trigger.blur();

      await waitFor(() => expect(root).not.toHaveAttribute("open"));
    });
  }),
};

export const Inverse: Story = {
  args: {
    ...Default.args,
    color: "inverse",
  },
};

export const SlotDescription: Story = {
  args: {
    ...Default.args,
    hasSlot: true,
  },
};

export const FullSizeView: Story = {
  args: {
    ...Default.args,
    viewArea: "full",
  },
};
