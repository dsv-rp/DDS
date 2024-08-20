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
    hasCheckbox: false,
    hasSearch: false,
    hasPagination: false,
    hasSort: false,
    selectedRange: "All",
  },
};

export const Checkbox: Story = {
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

export const Pagination: Story = {
  args: {
    ...Default.args,
    hasPagination: true,
    ranges: [5, 10, 25, "All"],
    selectedRange: 5,
    onChangePage: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-table")[0];
    await expect(root).toBeInTheDocument();

    const dropdown = getByShadowRole(root, "button", { name: "5" });
    await expect(dropdown).toBeInTheDocument();
    await expect(getAllByShadowRole(root, "row")).toHaveLength(6);

    // should react if inner dropdown clicked
    await step("Try to click dropdown", async () => {
      await userEvent.click(dropdown);
      await userEvent.click(getByShadowRole(root, "option", { name: "All" }));
      await expect(getAllByShadowRole(root, "row")).toHaveLength(17);
      await expect(args.onChangePage).toHaveBeenCalled();

      await userEvent.click(getByShadowRole(root, "button", { name: "All" }));
      await userEvent.click(getByShadowRole(root, "option", { name: "5" }));
      await expect(args.onChangePage).toHaveBeenCalled();
    });

    // should react if inner page navigation clicked
    await step("Try to click page navigation", async () => {
      await userEvent.click(getByShadowRole(root, "button", { name: "page2" }));

      const rows = getAllByShadowRole(root, "row");
      await expect(rows).toHaveLength(6);
      await expect(getByShadowText(rows[1], "Pineapple")).toBeInTheDocument();
      await expect(getByShadowText(rows[2], "Plum")).toBeInTheDocument();
      await expect(getByShadowText(rows[3], "Kiwi")).toBeInTheDocument();
      await expect(getByShadowText(rows[4], "Pomegranate")).toBeInTheDocument();
      await expect(getByShadowText(rows[5], "Fig")).toBeInTheDocument();
      await expect(args.onChangePage).toHaveBeenCalled();

      await userEvent.click(getByShadowRole(root, "button", { name: "page1" }));
    });
  }),
};

export const Search: Story = {
  args: {
    ...Default.args,
    hasSearch: true,
    onSearch: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-table")[0];
    await expect(root).toBeInTheDocument();

    const searchInput = getByShadowRole(root, "textbox");
    await expect(searchInput).toBeInTheDocument();

    // should react if inner input type and enter key typed
    await step("Try to search keyword input", async () => {
      await userEvent.type(searchInput, "ap");
      await userEvent.keyboard("[Enter]");

      await expect(args.onSearch).toHaveBeenCalledOnce();
      const rows = getAllByShadowRole(root, "row");
      await expect(rows).toHaveLength(5);
      await expect(getByShadowText(rows[1], "Apple")).toBeInTheDocument();
      await expect(getByShadowText(rows[2], "Pineapple")).toBeInTheDocument();
      await expect(getByShadowText(rows[3], "Grape")).toBeInTheDocument();
      await expect(getByShadowText(rows[4], "Grapefruit")).toBeInTheDocument();
    });

    await step("Try to search keyword delete", async () => {
      searchInput.focus();
      await userEvent.keyboard("[Backspace]");
      await userEvent.keyboard("[Backspace]");
      await userEvent.click(
        getByShadowRole(root, "button", { name: "Search" })
      );
    });
  }),
};

export const Sort: Story = {
  args: {
    ...Default.args,
    hasSort: true,
    onChangeSort: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-table")[0];
    await expect(root).toBeInTheDocument();

    const sortButton = getByShadowRole(root, "button", {
      name: "Sort of Name",
    });
    await expect(sortButton).toBeInTheDocument();

    // should react if inner sort button clicked
    await step("Try to click sort button", async () => {
      await userEvent.click(sortButton);

      const rows = getAllByShadowRole(root, "row");

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
      await expect(args.onChangeSort).toHaveBeenCalledTimes(2);
      await expect(getByShadowText(rows[1], "Strawberry")).toBeInTheDocument();
      await expect(getByShadowText(rows[2], "Pomegranate")).toBeInTheDocument();
      await expect(getByShadowText(rows[3], "Plum")).toBeInTheDocument();
      await expect(getByShadowText(rows[4], "Pineapple")).toBeInTheDocument();
    });

    await userEvent.click(sortButton);
  }),
};

export const AllFunctions: Story = {
  args: {
    ...Default.args,
    hasCheckbox: true,
    hasPagination: true,
    hasSearch: true,
    hasSort: true,
    ranges: [5, 10, 25, "All"],
    selectedRange: 5,
    onChangeCheck: fn(),
    onSearch: fn(),
    onChangeSort: fn(),
  },
  play: definePlay(async ({ args, canvasElement, step }) => {
    const root = canvasElement.getElementsByTagName("daikin-table")[0];

    await expect(root).toBeInTheDocument();

    await expect(
      getByShadowText(root, "Showing results 1 to 5 of 16 results")
    ).toBeInTheDocument();
    const searchInput = getByShadowRole(root, "textbox");
    const allItemCheckbox = getAllByShadowRole(root, "checkbox")[0];
    const priceSortButton = getByShadowRole(root, "button", {
      name: "Sort of Price",
    });
    const nameSortButton = getByShadowRole(root, "button", {
      name: "Sort of Name",
    });

    // should react if inner input type and enter key typed
    await step("Try to search keyword input", async () => {
      await userEvent.type(searchInput, "1");
      await userEvent.keyboard("[Enter]");
      await expect(args.onSearch).toHaveBeenCalledTimes(1);
      await expect(
        getByShadowText(root, "Showing results 1 to 4 of 4 results")
      ).toBeInTheDocument();
      const rows = getAllByShadowRole(root, "row");
      await expect(rows).toHaveLength(5);
    });

    // should react if inner checkbox clicked
    await step("Try to click checkbox", async () => {
      await userEvent.click(allItemCheckbox);
      await expect(args.onChangeCheck).toHaveBeenCalledTimes(1);
    });

    await step("Try to search keyword delete", async () => {
      searchInput.focus();
      await userEvent.keyboard("[Backspace]");
      await userEvent.click(
        getByShadowRole(root, "button", { name: "Search" })
      );
      await expect(
        getByShadowText(root, "Showing results 1 to 5 of 16 results")
      ).toBeInTheDocument();
      await expect(allItemCheckbox).not.toBeChecked();
    });

    // should react if inner sort button clicked
    await step("Try to click sort button", async () => {
      await userEvent.click(priceSortButton);
      const rows = getAllByShadowRole(root, "row");
      await expect(args.onChangeSort).toHaveBeenCalledTimes(1);
      await expect(getByShadowText(rows[1], "$1")).toBeInTheDocument();
      await expect(getByShadowText(rows[2], "$1")).toBeInTheDocument();
      await expect(getByShadowText(rows[3], "$1")).toBeInTheDocument();
      await expect(getByShadowText(rows[4], "$1")).toBeInTheDocument();
      await expect(getAllByShadowRole(root, "checkbox")[1]).toBeChecked();
      await expect(getAllByShadowRole(root, "checkbox")[2]).toBeChecked();
      await expect(getAllByShadowRole(root, "checkbox")[3]).toBeChecked();
      await expect(getAllByShadowRole(root, "checkbox")[4]).toBeChecked();
      await expect(getAllByShadowRole(root, "checkbox")[5]).not.toBeChecked();
    });

    await userEvent.click(allItemCheckbox);
    await userEvent.click(allItemCheckbox);
    await userEvent.click(nameSortButton);
  }),
};
