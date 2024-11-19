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

export const Light: Story = {
  args: {
    placement: "bottom",
    variant: "light",
    open: false,
    description:
      "This is a description using attributes.\nIt supports line breaks.",
    popoverValue: "auto",
    trigger: "hover",
    viewArea: "small",
    onToggle: fn(),
    onBeforeToggle: fn(),
  },
  play: definePlay(async ({ canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-tooltip")[0];
    await expect(root).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const trigger = root.shadowRoot!.getElementById("trigger")!;
    await expect(trigger).toBeInTheDocument();

    const tooltip = root.shadowRoot?.querySelector("#tooltip");
    await expect(tooltip).toBeInTheDocument();
    await expect(tooltip).not.toBeVisible();

    // TODO (DDS-1269): hover function is not work well when using storybook test library
    // await userEvent.hover(trigger);
    // await expect(tooltip).toBeVisible();

    // await userEvent.click(trigger);
    // await expect(tooltip).not.toBeVisible();

    // await userEvent.hover(trigger);
    // await expect(tooltip).toBeVisible();

    // await userEvent.unhover(trigger);
    // await expect(tooltip).not.toBeVisible();
  }),
};

export const Dark: Story = {
  args: {
    ...Light.args,
    variant: "dark",
  },
};

export const SlotDescription: Story = {
  args: {
    ...Light.args,
    hasSlot: true,
  },
};

export const UseFocusableTrigger: Story = {
  args: {
    ...Light.args,
    hasFocusableTrigger: true,
    hasSlot: true,
  },
  play: definePlay(async ({ args, step, canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-tooltip")[0];
    await expect(root).toBeInTheDocument();
    const trigger = getByShadowRole(root, "button", { name: "Focus me" });
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

export const FullSizeView: Story = {
  args: {
    ...Light.args,
    viewArea: "full",
  },
};
