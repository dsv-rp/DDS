import { definePlay } from "#storybook";
import { metadata } from "#storybook-framework";
import { expect, fn, userEvent } from "@storybook/test";
import {
  getAllByShadowRole,
  getByShadowRole,
  getByShadowText,
} from "shadow-dom-testing-library";
import { DAIKIN_TABLE_ARG_TYPES, type Story } from "./common";

export default {
  title: "Components/Table",
  tags: ["autodocs"],
  argTypes: DAIKIN_TABLE_ARG_TYPES,
  ...metadata,
};

export const Default: Story = {
  args: {
    headers: [
      { key: "name", label: "Name", align: "left" },
      { key: "season", label: "Season", align: "left" },
      { key: "inStock", label: "In stock", align: "left" },
      { key: "price", label: "Price", align: "right" },
    ],
    rows: [
      {
        id: "1",
        name: "Apple",
        season: "Autumn",
        inStock: "true",
        price: "$2",
      },
      {
        id: "2",
        name: "Peach",
        season: "Summer",
        inStock: "true",
        price: "$4",
      },
      {
        id: "3",
        name: "Orange",
        season: "Winter",
        inStock: "false",
        price: "$1",
      },
      {
        id: "4",
        name: "Strawberry",
        season: "Spring",
        inStock: "true",
        price: "$4",
      },
      {
        id: "5",
        name: "Blueberry",
        season: "Summer",
        inStock: "false",
        price: "$2",
      },
      {
        id: "6",
        name: "Pineapple",
        season: "Summer",
        inStock: "true",
        price: "$4",
      },
      { id: "7", name: "Plum", season: "Summer", inStock: "true", price: "$5" },
      { id: "8", name: "Kiwi", season: "Winter", inStock: "true", price: "$1" },
      {
        id: "9",
        name: "Pomegranate",
        season: "Autumn",
        inStock: "false",
        price: "$2",
      },
      {
        id: "10",
        name: "Fig",
        season: "Autumn",
        inStock: "true",
        price: "$3",
      },
      {
        id: "11",
        name: "Grape",
        season: "Autumn",
        inStock: "false",
        price: "$4",
      },
      {
        id: "12",
        name: "Mango",
        season: "Summer",
        inStock: "true",
        price: "$4",
      },
      {
        id: "13",
        name: "Lime",
        season: "Winter",
        inStock: "true",
        price: "$1",
      },
      {
        id: "14",
        name: "Grapefruit",
        season: "Spring",
        inStock: "false",
        price: "$2",
      },
      {
        id: "15",
        name: "Pear",
        season: "Autumn",
        inStock: "false",
        price: "$3",
      },
      {
        id: "16",
        name: "Persimmon",
        season: "Autumn",
        inStock: "false",
        price: "$1",
      },
    ],
    selectedRowId: "1",
    hasCheckbox: false,
    hasSort: false,
    hasSlot: false,
  },
};

export const Checkable: Story = {
  args: {
    ...Default.args,
    hasCheckbox: true,
    onChangeCheck: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-table")[0];
    await expect(root).toBeInTheDocument();

    const allItemCheckbox = getAllByShadowRole(root, "checkbox")[0];
    const checkbox1 = getAllByShadowRole(root, "checkbox")[1];
    const checkbox2 = getAllByShadowRole(root, "checkbox")[2];
    const checkbox3 = getAllByShadowRole(root, "checkbox")[3];
    const checkbox4 = getAllByShadowRole(root, "checkbox")[4];

    await expect(allItemCheckbox).not.toBeChecked();
    await expect(checkbox1).not.toBeChecked();
    await expect(checkbox2).not.toBeChecked();
    await expect(checkbox3).not.toBeChecked();
    await expect(checkbox4).not.toBeChecked();

    // should react if inner checkbox clicked
    await step("Try to click checkbox", async () => {
      await userEvent.click(allItemCheckbox);
      await expect(args.onChangeCheck).toHaveBeenCalledTimes(1);
      await expect(allItemCheckbox).toBeChecked();
      await expect(checkbox1).toBeChecked();
      await expect(checkbox2).toBeChecked();
      await expect(checkbox3).toBeChecked();
      await expect(checkbox4).toBeChecked();
    });

    // should react if inner checkbox clicked
    await step("Try to click checkbox", async () => {
      await userEvent.click(checkbox1);
      await userEvent.click(checkbox2);
      await expect(args.onChangeCheck).toHaveBeenCalledTimes(3);
      await expect(allItemCheckbox).not.toBeChecked();
      await expect(checkbox1).not.toBeChecked();
      await expect(checkbox2).not.toBeChecked();
    });

    // should react if inner checkbox clicked
    await step("Try to click checkbox", async () => {
      await userEvent.click(allItemCheckbox);
      await expect(args.onChangeCheck).toHaveBeenCalledTimes(4);
      await expect(allItemCheckbox).toBeChecked();
      await expect(checkbox1).toBeChecked();
      await expect(checkbox2).toBeChecked();
    });

    // should react if inner checkbox clicked
    await step("Try to click checkbox", async () => {
      await userEvent.click(allItemCheckbox);
      await expect(args.onChangeCheck).toHaveBeenCalledTimes(5);
      await expect(allItemCheckbox).not.toBeChecked();
      await expect(checkbox1).not.toBeChecked();
      await expect(checkbox2).not.toBeChecked();
      await expect(checkbox3).not.toBeChecked();
      await expect(checkbox4).not.toBeChecked();
    });
  }),
};

export const Sortable: Story = {
  args: {
    ...Default.args,
    hasSort: true,
    onChangeSort: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-table")[0];
    await expect(root).toBeInTheDocument();

    const sortButton = getByShadowRole(root, "button", {
      name: "Name",
    });
    await expect(sortButton).toBeInTheDocument();
    await expect(sortButton).not.toHaveAttribute("aria-sort");

    // should react if inner sort button clicked
    await step("Try to click sort button", async () => {
      await userEvent.click(sortButton);

      const rows = getAllByShadowRole(root, "row");

      await expect(getAllByShadowRole(root, "columnheader")[0]).toHaveAttribute(
        "aria-sort",
        "ascending"
      );
      await expect(args.onChangeSort).toHaveBeenCalledTimes(1);
      await expect(getByShadowText(rows[1], "Apple")).toBeInTheDocument();
      await expect(getByShadowText(rows[2], "Blueberry")).toBeInTheDocument();
      await expect(getByShadowText(rows[3], "Fig")).toBeInTheDocument();
      await expect(getByShadowText(rows[4], "Grape")).toBeInTheDocument();
    });

    // should react if inner sort button click again
    await step("Try to click again sort button", async () => {
      await userEvent.click(sortButton);

      const rows = getAllByShadowRole(root, "row");

      await expect(getAllByShadowRole(root, "columnheader")[0]).toHaveAttribute(
        "aria-sort",
        "descending"
      );
      await expect(args.onChangeSort).toHaveBeenCalledTimes(2);
      await expect(getByShadowText(rows[1], "Strawberry")).toBeInTheDocument();
      await expect(getByShadowText(rows[2], "Pomegranate")).toBeInTheDocument();
      await expect(getByShadowText(rows[3], "Plum")).toBeInTheDocument();
      await expect(getByShadowText(rows[4], "Pineapple")).toBeInTheDocument();
    });

    await userEvent.click(sortButton);
  }),
};

export const UseSlot: Story = {
  args: {
    ...Default.args,
    hasSlot: true,
  },
};

export const AllFunctions: Story = {
  args: {
    ...Default.args,
    hasCheckbox: true,
    hasSort: true,
    hasSlot: true,
    onChangeCheck: fn(),
    onChangeSort: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-table")[0];

    await expect(root).toBeInTheDocument();

    const allItemCheckbox = getAllByShadowRole(root, "checkbox")[0];
    const nameSortButton = getByShadowRole(root, "button", {
      name: "Name",
    });

    // should react if inner checkbox clicked
    await step("Try to click checkbox", async () => {
      await userEvent.click(allItemCheckbox);
      await expect(args.onChangeCheck).toHaveBeenCalledTimes(1);
    });

    // should react if inner sort button clicked
    await step("Try to click sort button", async () => {
      await userEvent.click(nameSortButton);
      const rows = getAllByShadowRole(root, "row");
      await expect(args.onChangeSort).toHaveBeenCalledTimes(1);
      await expect(getByShadowText(rows[1], "Apple")).toBeInTheDocument();
      await expect(getByShadowText(rows[2], "Blueberry")).toBeInTheDocument();
      await expect(getByShadowText(rows[3], "Fig")).toBeInTheDocument();
      await expect(getByShadowText(rows[4], "Grape")).toBeInTheDocument();
    });

    await userEvent.click(allItemCheckbox);
  }),
};