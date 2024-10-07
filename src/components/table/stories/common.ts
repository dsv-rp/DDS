import type { DaikinTable } from "#package/components/table/daikin-table";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTableStoryArgs
  extends Required<ElementProps<DaikinTable>> {
  hasSlot: boolean;
  onChangeCheck: () => void;
  onChangeSort: () => void;
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
  hasSort: {
    type: "boolean",
  },
  checkedIds: {
    control: "object",
  },
  orderBy: {
    control: "radio",
    options: ["asc", "desc"],
  },
  sort: {
    control: "object",
  },
  sortedKey: {
    type: "string",
  },
  selectedRowId: {
    type: "string",
  },
} satisfies Meta<DaikinTableStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTableStoryArgs>;
