import type { DaikinTable } from "#package/components/table/daikin-table";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTableStoryArgs
  extends Required<ElementProps<DaikinTable>> {
  hasSlot: boolean;
  onChangeCheck: () => void;
  onChangePage: () => void;
  onChangeSort: () => void;
  onSearch: () => void;
}

export const DAIKIN_TABLE_ARG_TYPES = {
  headers: {
    control: "object",
  },
  rows: {
    control: "object",
  },
  hasCheckbox: {
    type: "boolean",
  },
  hasPagination: {
    type: "boolean",
  },
  hasSearch: {
    type: "boolean",
  },
  hasSort: {
    type: "boolean",
  },
  checkedIds: {
    control: "object",
  },
  keyword: {
    type: "string",
  },
  orderBy: {
    control: "select",
    options: ["asc", "desc"],
  },
  currentPage: {
    type: "number",
  },
  sort: {
    control: "object",
  },
  sortedKey: {
    type: "string",
  },
  ranges: {
    control: "object",
  },
  selectedRange: {
    type: "string",
  },
  selectedRowId: {
    type: "string",
  },
} satisfies Meta<DaikinTableStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTableStoryArgs>;
