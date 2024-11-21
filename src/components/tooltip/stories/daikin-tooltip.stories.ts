import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn } from "@storybook/test";
import {
  getByShadowRole,
  getByShadowText,
  queryByShadowRole,
} from "shadow-dom-testing-library";
import { DAIKIN_TOOLTIP_ARG_TYPES, type Story } from "./common";
import { TOOLTIP_SLOT_TEXT } from "./framework-wc";

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
  },
};

export const Inverse: Story = {
  args: {
    ...Default.args,
    color: "inverse",
  },
  play: definePlay(async ({ canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-tooltip")[0];
    await expect(root).toBeInTheDocument();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const triggerElement = root.shadowRoot!.querySelector("div")!;
    await expect(triggerElement).toBeInTheDocument();
    const tooltip = root.shadowRoot?.querySelector("span");
    await expect(tooltip).toBeInTheDocument();
    await expect(tooltip).not.toBeVisible();

    // TODO(DDS-1269): hover function is not work well when using storybook test library
    // await userEvent.hover(triggerElement);

    // await expect(tooltip).toBeVisible();
    // await userEvent.click(triggerElement);
    // await expect(tooltip).not.toBeVisible();
  }),
};

export const SlotDescription: Story = {
  args: {
    ...Default.args,
    hasSlot: true,
  },
};

export const UseFocusableTrigger: Story = {
  args: {
    ...Default.args,
    hasFocusableTrigger: true,
    hasSlot: true,
  },
  play: definePlay(async ({ step, canvasElement }) => {
    const root = canvasElement.getElementsByTagName("daikin-tooltip")[0];
    await expect(root).toBeInTheDocument();
    const trigger = getByShadowRole(root, "button", { name: "Focus me" });

    await expect(queryByShadowRole(root, "tooltip")).not.toBeInTheDocument();

    await step("Try to focus trigger element", async () => {
      trigger.focus();

      await expect(
        getByShadowText(root, TOOLTIP_SLOT_TEXT)
      ).toBeInTheDocument();

      trigger.blur();
    });
  }),
};

export const FullSizeView: Story = {
  args: {
    ...Default.args,
    viewArea: "full",
  },
};
