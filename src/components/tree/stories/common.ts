import type { DaikinTree } from "#package/components/tree/daikin-tree";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinTreeStoryArgs = Required<ElementProps<DaikinTree>>;

export const DAIKIN_TREE_ARG_TYPES = {
  selectable: {
    type: "boolean",
  },
  selectedItems: {
    control: "object",
  },
} satisfies Meta<DaikinTreeStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTreeStoryArgs>;
