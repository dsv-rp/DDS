import type { DaikinTableCell } from "#package/components/table-cell/daikin-table-cell";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTableCellStoryArgs
  extends Required<ElementProps<DaikinTableCell>> {
  label: string;
  subtitle: string;
}

export const DAIKIN_TABLE_CELL_ARG_TYPES = {
  alignment: {
    control: "radio",
    options: ["left", "right", "center"],
  },
  label: {
    type: "string",
  },
  subtitle: {
    type: "string",
  },
} satisfies Meta<DaikinTableCellStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTableCellStoryArgs>;
