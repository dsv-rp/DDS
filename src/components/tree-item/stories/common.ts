import type { DaikinTreeItem } from "#package/components/tree-item/daikin-tree-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTreeItemStoryArgs
  extends Required<ElementProps<DaikinTreeItem>> {
  label: string;
  onClick: () => void;
}

export const DAIKIN_TREE_ITEM_ARG_TYPES = {
  label: {
    type: "string",
  },
  value: {
    type: "string",
  },
  selected: {
    type: "boolean",
  },
  disabled: {
    type: "boolean",
  },
  selectable: {
    type: "boolean",
  },
  // Hide event listeners
  onClick: { name: "" },
} satisfies Meta<DaikinTreeItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTreeItemStoryArgs>;
