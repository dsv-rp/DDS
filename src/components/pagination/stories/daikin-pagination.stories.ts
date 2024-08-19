import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import {
  getByShadowRole,
  getByShadowText,
  queryByShadowText,
} from "shadow-dom-testing-library";
import type { DaikinPagination } from "../daikin-pagination";
import { DAIKIN_PAGINATION_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Pagination",
  tags: ["autodocs"],
  argTypes: DAIKIN_PAGINATION_ARG_TYPES,
  ...metadata,
};

const checkPageButton = async (
  root: DaikinPagination,
  existPages: Array<number>,
  allPages: Array<number>
) => {
  for (const number of existPages) {
    const button = getByShadowText(root, number.toString(), {
      ignore: ".hidden *",
    });
    await expect(button).toBeInTheDocument();
  }

  const disappearPages = allPages.filter(
    (value) => !existPages.includes(value)
  );
  for (const number of disappearPages) {
    const button = queryByShadowText(root, number.toString(), {
      ignore: ".hidden *",
    });
    await expect(button).toBeNull();
  }
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
  play: definePlay(async ({ args, canvasElement, step }) => {
    const allPages = Array.from({ length: args.max }, (_, i) => i + 1);

    const root = canvasElement.getElementsByTagName("daikin-pagination")[0];
    await expect(root).toBeInTheDocument();

    for (let i = 1; i < args.showPages; i++) {
      const button = getByShadowText(root, i.toString(), {
        ignore: ".hidden > *",
      });
      await expect(button).toBeInTheDocument();
    }
    // ellipsis left button should be in document
    const ellipsisRight = getByShadowRole(root, "button", {
      name: "pageDetailRight",
    });
    await expect(ellipsisRight).toBeInTheDocument();
    // last page button should be in document
    const buttonLast = getByShadowText(root, "15", {
      ignore: ".hidden > *",
    });
    await expect(buttonLast).toBeInTheDocument();
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

    // value should be +1 when click right chevron before right ellipsis button
    await step(
      "Try to click right chevron when the value is before right ellipsis button",
      async () => {
        await userEvent.click(chevronRight);
        await userEvent.click(chevronRight);
        await userEvent.click(chevronRight);
        await expect(root.value).toEqual(5);
        await userEvent.click(chevronRight);
        await expect(root.value).toEqual(6);
        await checkPageButton(root, [1, 4, 5, 6, 15], allPages);
      }
    );
    // value should be changed when click page number from dropdown menu
    await step("Try to click page number from drop down menu", async () => {
      const ellipsisButton = getByShadowRole(root, "button", {
        name: "pageDetailRight",
      });
      await expect(ellipsisButton).toBeInTheDocument();
      await userEvent.click(ellipsisButton);
      const page8 = getByShadowText(root, "8", {
        ignore: ".hidden > *",
      });
      await expect(page8).toBeInTheDocument();
      await userEvent.click(page8);
      await expect(root.value).toEqual(8);
      await checkPageButton(root, [1, 6, 7, 8, 15], allPages);
    });
    // click last page and click left chevron will hidden right ellipsis button
    await step("Try to click last page and click left chevron", async () => {
      const page15 = getByShadowText(root, "15", {
        ignore: ".hidden > *",
      });
      await expect(page15).toBeInTheDocument();
      await userEvent.click(page15);
      await expect(root.value).toEqual(15);
      await userEvent.click(chevronLeft);
      await expect(root.value).toEqual(14);
      await checkPageButton(root, [1, 11, 12, 13, 14, 15], allPages);
    });
    // click first page and click right chevron will hidden left ellipsis button
    await step("Try to click first page and click right chevron", async () => {
      const page1 = getByShadowText(root, "1", {
        ignore: ".hidden > *",
      });
      await expect(page1).toBeInTheDocument();
      await userEvent.click(page1);
      await expect(root.value).toEqual(1);
      await userEvent.click(chevronRight);
      await expect(root.value).toEqual(2);
      await checkPageButton(root, [1, 2, 3, 4, 5, 15], allPages);
    });
  }),
};
