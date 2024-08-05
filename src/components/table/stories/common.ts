import type { DaikinTable } from "#package/components/table/daikin-table";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinTableStoryArgs = Required<ElementProps<DaikinTable>>;

export const DAIKIN_TABLE_ARG_TYPES = {
  headers: {
    description:
      "Columns of the table. The value of `key` corresponds to the key, excluding the id of rows. As a whole array, the value of `key` must be unique.",
    control: { type: "object" },
  },
  rows: {
    description:
      "Rows of the table. An array that uses the element `key` in the column as the key and stores the corresponding value. In addition, it has an id as a unique value.",
    control: { type: "object" },
  },
} satisfies Meta<DaikinTableStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTableStoryArgs>;
