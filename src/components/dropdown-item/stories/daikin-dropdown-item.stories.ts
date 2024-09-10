import type { DaikinDropdownItem } from "#package/components/dropdown-item";
import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole } from "shadow-dom-testing-library";
import { DAIKIN_DROPDOWN_ITEM_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Dropdown Item",
  tags: ["autodocs"],
  argTypes: DAIKIN_DROPDOWN_ITEM_ARG_TYPES,
  ...metadata,
};

function eventPayloadTransformer(event: Event) {
  // We need to retrieve `event.target.value` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    value: (event.target as DaikinDropdownItem).value,
  };
}

export const Default: Story = {
  args: {
    value: "value",
    disabled: false,
    onSelect: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-dropdown-item")[0];
    await expect(root).toBeInTheDocument();

    const option = getByShadowRole(root, "option", { name: "Dropdown item" });

    // should not react if inner option clicked
    await step("Try to click inner option", async () => {
      await userEvent.click(option);

      await expect(args.onSelect).toHaveBeenCalled();
      await expect(args.onSelect).toHaveLastReturnedWith({
        value: "value",
      });
    });

    option.blur();
  }),
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-dropdown-item")[0];
    await expect(root).toBeInTheDocument();

    // should not react if inner option clicked
    await step("Try to click inner option", async () => {
      await userEvent.click(
        getByShadowRole(root, "option", { name: "Dropdown item" })
      );

      await expect(args.onSelect).not.toHaveBeenCalled();
    });
  }),
};
