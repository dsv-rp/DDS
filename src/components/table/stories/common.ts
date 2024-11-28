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
  selectable: {
    type: "boolean",
  },
  sortable: {
    type: "boolean",
  },
  selection: {
    control: "object",
  },
  order: {
    control: "radio",
    options: ["asc", "desc"],
  },
  sort: {
    control: "object",
  },
  sortFunction: {
    type: "string",
  },
  hasSlot: {
    type: "boolean",
  },
} satisfies Meta<DaikinTableStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTableStoryArgs>;
