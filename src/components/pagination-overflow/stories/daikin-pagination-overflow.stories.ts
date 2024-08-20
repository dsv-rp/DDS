import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_PAGINATION_OVERFLOW_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Pagination Overflow",
  tags: ["autodocs"],
  argTypes: DAIKIN_PAGINATION_OVERFLOW_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    value: 1,
    max: 5,
    totalItems: 15,
    onChange: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName(
      "daikin-pagination-overflow"
    )[0];
    await expect(root).toBeInTheDocument();
    await expect(root.value).toEqual(1);
    await expect(args.onChange).toHaveBeenCalledOnce();

    // arrow button should be in document
    const arrow = getByShadowRole(root, "button", {
      name: "arrow",
    });
    await expect(arrow).toBeInTheDocument();
    await userEvent.click(arrow);
    const page2 = getByShadowText(root, "2", {
      ignore: ".hidden *",
    });
    await expect(page2).toBeInTheDocument();
    // value should be changed when click page number from dropdown menu
    await step("Try to click page number from dropdown menu", async () => {
      await userEvent.click(page2);
      await expect(root.value).toEqual(2);
      await expect(args.onChange).toHaveBeenCalledTimes(2);
    });
    // chevronRight button should be in document
    const chevronRight = getByShadowRole(root, "button", {
      name: "chevronRight",
    });
    await expect(chevronRight).toBeInTheDocument();
    // value should be +1 when click chevronRight button
    await step("Try to click chevronRight button", async () => {
      await userEvent.click(chevronRight);
      await expect(root.value).toEqual(3);
      await expect(args.onChange).toHaveBeenCalledTimes(3);
      // value will not be +1 if value is the last page number
      await userEvent.click(chevronRight);
      await expect(root.value).toEqual(3);
      await expect(args.onChange).toHaveBeenCalledTimes(3);
    });
    // chevronLeft button should be in document
    const chevronLeft = getByShadowRole(root, "button", {
      name: "chevronLeft",
    });
    await expect(chevronLeft).toBeInTheDocument();
    // value should be -1 when click chevronLeft button
    await step("Try to click chevronLeft button", async () => {
      await userEvent.click(chevronLeft);
      await expect(root.value).toEqual(2);
      await expect(args.onChange).toHaveBeenCalledTimes(4);
      // value will not be -1 if value is the first page number
      await userEvent.click(chevronLeft);
      await expect(root.value).toEqual(1);
      await expect(args.onChange).toHaveBeenCalledTimes(5);
      await userEvent.click(chevronLeft);
      await expect(root.value).toEqual(1);
      await expect(args.onChange).toHaveBeenCalledTimes(5);
    });
  }),
};
