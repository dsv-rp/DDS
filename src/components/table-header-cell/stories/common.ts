import type { IconType } from "#package/components/icon";
import type { DaikinTableHeaderCell } from "#package/components/table-header-cell/daikin-table-header-cell";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTableHeaderCellStoryArgs
  extends Required<ElementProps<DaikinTableHeaderCell>> {
  leftIcon: IconType | null;
  onChangeSort: () => void;
}

export const DAIKIN_TABLE_HEADER_CELL_ARG_TYPES = {
  alignment: {
    control: "radio",
    options: ["left", "right", "center"],
  },
  sortable: {
    type: "boolean",
  },
  leftIcon: {
    type: "string",
  },
} satisfies Meta<DaikinTableHeaderCellStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTableHeaderCellStoryArgs>;
