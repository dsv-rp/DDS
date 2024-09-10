import type { DaikinDropdown } from "#package/components/dropdown";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { PointerEventsCheckLevel } from "@testing-library/user-event";
import { getByShadowRole } from "shadow-dom-testing-library";
import { definePlay } from "../../../storybook/define-play";
import { DAIKIN_DROPDOWN_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Dropdown",
  tags: ["autodocs"],
  argTypes: DAIKIN_DROPDOWN_ARG_TYPES,
  ...metadata,
};

function eventPayloadTransformer(event: Event) {
  // We need to retrieve `event.target.value` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    value: (event.target as DaikinDropdown).value,
  };
}

export const Default: Story = {
  args: {
    label: "Dropdown label",
    open: false,
    placeholder: "Choose an Option",
    disabled: false,
    error: false,
    option: "default",
    onClick: fn(eventPayloadTransformer),
    onChange: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-dropdown")[0];
    await expect(root).toBeInTheDocument();
    await expect(root).not.toHaveAttribute("open");

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(
        getByShadowRole(root, "button", { name: "Choose an Option" })
      );

      await expect(args.onClick).toHaveBeenCalledTimes(1);
      await expect(root).toHaveAttribute("open");
    });

    await step("Selecting a dropdown will reflect the value", async () => {
      await userEvent.click(
        getByShadowRole(root, "option", { name: "Dropdown item 2" })
      );

      await expect(args.onChange).toHaveBeenCalledTimes(1);
      await expect(args.onChange).toHaveLastReturnedWith({
        value: "value2",
      });
      await expect(root).not.toHaveAttribute("open");
      await expect(
        getByShadowRole(root, "button", { name: "Dropdown item 2" })
      ).toBeInTheDocument();
    });

    await step("Try to select the disabled option", async () => {
      await userEvent.click(
        getByShadowRole(root, "option", {
          name: "Dropdown item 3",
        }),
        {
          pointerEventsCheck: PointerEventsCheckLevel.Never,
        }
      );

      await expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    await step("Try to keyboard navigation", async () => {
      getByShadowRole(root, "button", { name: "Dropdown item 2" }).focus();

      await userEvent.keyboard("[Space]");
      await userEvent.keyboard("[ArrowDown]");
      await userEvent.keyboard("[Space]");

      await expect(
        getByShadowRole(root, "button", { name: "Dropdown item 1" })
      ).toBeInTheDocument();
      await expect(args.onChange).toHaveBeenCalledTimes(2);
      await expect(args.onChange).toHaveLastReturnedWith({
        value: "value1",
      });
    });
  }),
};

export const Unselected: Story = {
  args: {
    ...Default.args,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    onClick: fn(eventPayloadTransformer),
    onChange: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-dropdown")[0];
    await expect(root).toBeInTheDocument();
    await expect(root).not.toHaveAttribute("open");

    // should not react if inner button clicked
    await step("Try to click inner button", async () => {
      await userEvent.click(
        getByShadowRole(root, "button", { name: "Choose an Option" })
      );

      await expect(args.onClick).not.toHaveBeenCalled();
    });
  }),
};

export const Error: Story = {
  args: {
    ...Default.args,
    error: true,
  },
};

export const SingleItem: Story = {
  args: {
    ...Default.args,
    option: "single",
  },
};

export const MultipleItem: Story = {
  args: {
    ...Default.args,
    option: "multiple",
  },
};
