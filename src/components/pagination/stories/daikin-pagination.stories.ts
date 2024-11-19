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
    (current) => !existPages.includes(current)
  );
  for (const number of disappearPages) {
    const button = queryByShadowText(root, number.toString(), {
      ignore: ".hidden *",
    });
    await expect(button).toBeNull();
  }
};

function eventPayloadTransformer(event: Event) {
  // We need to retrieve `event.target.checked` inside the event listeners not to miss problems caused by the timing of acquisition.
  return {
    current: (event.target as DaikinPagination).current,
  };
}

export const Default: Story = {
  args: {
    current: 1,
    total: 5,
    window: 5,
    onChange: fn(eventPayloadTransformer),
    onClick: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-pagination")[0];
    await expect(root).toBeInTheDocument();

    for (let i = 1; i < args.total + 1; i++) {
      const button = getByShadowText(root, i.toString());
      await expect(button).toBeInTheDocument();
    }
    // default current should be 1
    await expect(root.current).toEqual(1);

    // chevron button should be in document
    const chevronLeft = getByShadowRole(root, "button", {
      name: "Go to the previous page.",
    });
    await expect(chevronLeft).toBeInTheDocument();
    const chevronRight = getByShadowRole(root, "button", {
      name: "Go to the next page.",
    });
    await expect(chevronRight).toBeInTheDocument();

    // current should be changed when click page button
    await step("Try to click page button", async () => {
      const page2 = getByShadowText(root, "2");
      await userEvent.click(page2);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 2 });
      await expect(root.current).toEqual(2);
    });

    // current should be +1 when click right chevron
    await step("Try to click right chevron", async () => {
      await userEvent.click(chevronRight);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 3 });
      await expect(root.current).toEqual(3);
    });
    // current should not be changed when click right chevron if max current
    await step("Try to click right chevron to max", async () => {
      await userEvent.click(chevronRight);
      await userEvent.click(chevronRight);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 5 });
      await expect(root.current).toEqual(5);
      await userEvent.click(chevronRight);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 5 });
      await expect(root.current).toEqual(5);
    });
    // current should be -1 when click left chevron
    await step("Try to click left chevron", async () => {
      await userEvent.click(chevronLeft);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 4 });
      await expect(root.current).toEqual(4);
    });
    // current should not be changed when click left chevron if min current
    await step("Try to click right chevron to min", async () => {
      await userEvent.click(chevronLeft);
      await userEvent.click(chevronLeft);
      await userEvent.click(chevronLeft);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 1 });
      await expect(root.current).toEqual(1);
      await userEvent.click(chevronLeft);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 1 });
      await expect(root.current).toEqual(1);
    });
  }),
};

export const Ellipsis: Story = {
  args: {
    current: 1,
    total: 15,
    window: 7,
    onChange: fn(eventPayloadTransformer),
    onClick: fn(eventPayloadTransformer),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const allPages = Array.from({ length: args.total }, (_, i) => i + 1);

    const root = canvasElement.getElementsByTagName("daikin-pagination")[0];
    await expect(root).toBeInTheDocument();

    for (let i = 1; i < args.window - 1; i++) {
      const button = getByShadowText(root, i.toString(), {
        ignore: ".hidden > *",
      });
      await expect(button).toBeInTheDocument();
    }

    // last page button should be in document
    const buttonLast = getByShadowText(root, "15", {
      ignore: ".hidden > *",
    });
    await expect(buttonLast).toBeInTheDocument();
    // default current should be 1
    await expect(root.current).toEqual(1);

    // chevron button should be in document
    const chevronLeft = getByShadowRole(root, "button", {
      name: "Go to the previous page.",
    });
    await expect(chevronLeft).toBeInTheDocument();
    const chevronRight = getByShadowRole(root, "button", {
      name: "Go to the next page.",
    });
    await expect(chevronRight).toBeInTheDocument();

    // current should be changed when click page button
    await step("Try to click page button", async () => {
      const page2 = getByShadowText(root, "2");
      await userEvent.click(page2);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 2 });
      await expect(root.current).toEqual(2);
    });

    // current should be +1 when click right chevron before right ellipsis button
    await step(
      "Try to click right chevron when the current is before right ellipsis button",
      async () => {
        await userEvent.click(chevronRight);
        await userEvent.click(chevronRight);
        await userEvent.click(chevronRight);
        await expect(args.onChange).toHaveLastReturnedWith({ current: 5 });
        await expect(root.current).toEqual(5);
        await checkPageButton(root, [1, 4, 5, 6, 15], allPages);
        await userEvent.click(chevronRight);
        await expect(args.onChange).toHaveLastReturnedWith({ current: 6 });
        await expect(root.current).toEqual(6);
        await checkPageButton(root, [1, 5, 6, 7, 15], allPages);
      }
    );
    // click last page and click left chevron will hidden right ellipsis button
    await step("Try to click last page and click left chevron", async () => {
      const page15 = getByShadowText(root, "15", {
        ignore: ".hidden > *",
      });
      await expect(page15).toBeInTheDocument();
      await userEvent.click(page15);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 15 });
      await expect(root.current).toEqual(15);
      await checkPageButton(root, [1, 11, 12, 13, 14, 15], allPages);
      await userEvent.click(chevronLeft);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 14 });
      await expect(root.current).toEqual(14);
      await checkPageButton(root, [1, 11, 12, 13, 14, 15], allPages);
      await userEvent.click(chevronLeft);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 13 });
      await expect(root.current).toEqual(13);
      await checkPageButton(root, [1, 11, 12, 13, 14, 15], allPages);
      await userEvent.click(chevronLeft);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 12 });
      await expect(root.current).toEqual(12);
      await checkPageButton(root, [1, 11, 12, 13, 14, 15], allPages);
      await userEvent.click(chevronLeft);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 11 });
      await expect(root.current).toEqual(11);
      await checkPageButton(root, [1, 10, 11, 12, 15], allPages);
    });
    // click first page and click right chevron will hidden left ellipsis button
    await step("Try to click first page and click right chevron", async () => {
      const page1 = getByShadowText(root, "1", {
        ignore: ".hidden > *",
      });
      await expect(page1).toBeInTheDocument();
      await userEvent.click(page1);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 1 });
      await checkPageButton(root, [1, 2, 3, 4, 5, 15], allPages);
      await expect(root.current).toEqual(1);
      await userEvent.click(chevronRight);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 2 });
      await expect(root.current).toEqual(2);
      await checkPageButton(root, [1, 2, 3, 4, 5, 15], allPages);
      await userEvent.click(chevronRight);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 3 });
      await expect(root.current).toEqual(3);
      await checkPageButton(root, [1, 2, 3, 4, 5, 15], allPages);
      await userEvent.click(chevronRight);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 4 });
      await expect(root.current).toEqual(4);
      await checkPageButton(root, [1, 2, 3, 4, 5, 15], allPages);
      await userEvent.click(chevronRight);
      await expect(args.onChange).toHaveLastReturnedWith({ current: 5 });
      await expect(root.current).toEqual(5);
      await checkPageButton(root, [1, 4, 5, 6, 15], allPages);
    });
  }),
};
