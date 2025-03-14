import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import {
  getByShadowPlaceholderText,
  getByShadowRole,
} from "shadow-dom-testing-library";
import { DAIKIN_DATE_PICKER_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Date Picker",
  tags: ["autodocs"],
  argTypes: DAIKIN_DATE_PICKER_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    placeholder: "Select a date",
    readonly: false,
    disabled: false,
    required: false,
    error: false,
    open: false,
    onSelect: fn(),
  },
  play: definePlay(async ({ canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-date-picker")[0];
    await expect(root).toBeInTheDocument();

    const input = getByShadowPlaceholderText(root, "Select a date");
    const selection = window.getSelection();
    await expect(input).toHaveProperty("value", "");

    await step(
      "Should move the focus when the arrow right key press",
      async () => {
        input.focus();
        await expect(selection?.toString()).toBe("MM");
        await userEvent.keyboard("[ArrowRight]");
        await expect(selection?.toString()).toBe("DD");
        await userEvent.keyboard("[ArrowRight]");
        await expect(selection?.toString()).toBe("YYYY");
        await userEvent.keyboard("[ArrowRight]");
        await expect(selection?.toString()).toBe("YYYY");
      }
    );

    await step(
      "Should move the focus when the arrow left key press",
      async () => {
        await userEvent.keyboard("[ArrowLeft]");
        await expect(selection?.toString()).toBe("DD");
        await userEvent.keyboard("[ArrowLeft]");
        await expect(selection?.toString()).toBe("MM");
        await userEvent.keyboard("[ArrowLeft]");
        await expect(selection?.toString()).toBe("MM");
      }
    );
  }),
};

export const HasValue: Story = {
  args: {
    ...Default.args,
    defaultValue: "2020-01-01",
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-date-picker")[0];
    await expect(root).toBeInTheDocument();

    const input = getByShadowPlaceholderText(root, "Select a date");
    const button = getByShadowRole(root, "button", {
      name: "Open the date picker",
    });
    await expect(input).toHaveProperty("value", "");

    await step(
      "Should open the calendar component when the icon button click",
      async () => {
        await expect(root).not.toHaveAttribute("open");
        await userEvent.click(button);
        await expect(root).toHaveAttribute("open");
      }
    );

    await step(
      "Should close the calendar component and update root value when the date button click",
      async () => {
        await userEvent.click(getByShadowRole(root, "button", { name: "10" }));
        await expect(root).not.toHaveAttribute("open");
        await expect(
          new Date(root.value ?? "").toLocaleDateString("en-US")
        ).toBe("1/10/2020");
        await expect(input).toHaveProperty("value", "1/10/2020");
        await expect(args.onSelect).toBeCalledTimes(1);
      }
    );
  }),
};
