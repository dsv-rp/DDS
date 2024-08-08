import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import { getByShadowRole, getByShadowText } from "shadow-dom-testing-library";
import { DAIKIN_PAGINATION_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Pagination",
  tags: ["autodocs"],
  argTypes: DAIKIN_PAGINATION_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    value: 1,
    max: 5,
    showPages: 5,
    onChange: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-pagination")[0];
    await expect(root).toBeInTheDocument();

    for (let i = 1; i < args.max + 1; i++) {
      const button = getByShadowText(root, i.toString());
      await expect(button).toBeInTheDocument();
    }
    // default value should be 1
    await expect(root.value).toEqual(1);

    // chevron button should be in document
    const chevronLeft = getByShadowRole(root, "button", {
      name: "leftChevron",
    });
    await expect(chevronLeft).toBeInTheDocument();
    const chevronRight = getByShadowRole(root, "button", {
      name: "rightChevron",
    });
    await expect(chevronRight).toBeInTheDocument();

    // value should be changed when click page button
    await step("Try to click page button", async () => {
      const page2 = getByShadowText(root, "2");
      await userEvent.click(page2);
      await expect(root.value).toEqual(2);
    });

    // value should be +1 when click right chevron
    await step("Try to click right chevron", async () => {
      await userEvent.click(chevronRight);
      await expect(root.value).toEqual(3);
    });
    // value should not be changed when click right chevron if max value
    await step("Try to click right chevron to max", async () => {
      await userEvent.click(chevronRight);
      await userEvent.click(chevronRight);
      await expect(root.value).toEqual(5);
      await userEvent.click(chevronRight);
      await expect(root.value).toEqual(5);
    });
    // value should be -1 when click left chevron
    await step("Try to click left chevron", async () => {
      await userEvent.click(chevronLeft);
      await expect(root.value).toEqual(4);
    });
    // value should not be changed when click left chevron if min value
    await step("Try to click right chevron to min", async () => {
      await userEvent.click(chevronLeft);
      await userEvent.click(chevronLeft);
      await userEvent.click(chevronLeft);
      await expect(root.value).toEqual(1);
      await userEvent.click(chevronLeft);
      await expect(root.value).toEqual(1);
    });
  }),
};

export const Ellipsis: Story = {
  args: {
    value: 1,
    max: 15,
    showPages: 6,
  },
};
