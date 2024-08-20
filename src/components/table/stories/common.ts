import type { DaikinTable } from "#package/components/table/daikin-table";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTableStoryArgs
  extends Required<ElementProps<DaikinTable>> {
  onChangeCheck: () => void;
  onChangePage: () => void;
  onChangeSort: () => void;
  onSearch: () => void;
}

export const DAIKIN_TABLE_ARG_TYPES = {
  headers: {
    description:
      "Headers of the table. The value of `key` corresponds to the key, excluding the id of rows. As a whole array, the value of `key` must be unique. Also, only use alphanumeric characters, `$`, and `_` in the `key`.",
    control: { type: "object" },
  },
  rows: {
    description:
      "Rows of the table. An array that uses the element `key` in the column as the key and stores the corresponding value. In addition, it has an id as a unique value.",
    control: { type: "object" },
  },
  hasCheckbox: {
    description: "Whether or not to give the table the function of a checkbox",
    type: "boolean",
  },
  hasPagination: {
    description: "Whether or not to give the table the function of pagination",
    type: "boolean",
  },
  hasSearch: {
    description: "Whether or not to give the table the function of search",
    type: "boolean",
  },
  hasSort: {
    description: "Whether or not to give the table the function of sort",
    type: "boolean",
  },
  checkedIds: {
    description: "An array of `id`s for the `rows` that have been checked",
    control: { type: "object" },
  },
  keyword: {
    description: "Search keywords for the table",
    type: "string",
  },
  orderBy: {
    description: "Sort order of the table",
    control: { type: "select" },
    options: ["asc", "desc"],
  },
  currentPage: {
    description:
      "Specify which page you are viewing using the table pagination",
    type: "number",
  },
  sort: {
    description: "Sort order of lines customized by the user",
    control: { type: "object" },
  },
  sortedKey: {
    description: "The `key` of the currently sorted column",
    type: "string",
  },
  ranges: {
    description:
      "A dropdown menu on the table's pagination that allows you to select how many items are displayed at once.",
    control: { type: "object" },
  },
  selectedRange: {
    description: "",
    type: "string",
  },
} satisfies Meta<DaikinTableStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTableStoryArgs>;
