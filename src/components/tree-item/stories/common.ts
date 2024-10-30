import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinTreeItem } from "../daikin-tree-item";

export interface DaikinTreeItemStoryArgs
  extends Required<ElementProps<DaikinTreeItem>> {
  label: string;
  onClick: () => void;
}

export const DAIKIN_TREE_ITEM_ARG_TYPES = {
  type: {
    control: "radio",
    options: ["button", "link"],
  },
  href: {
    type: "string",
  },
  selected: {
    type: "boolean",
  },
  disabled: {
    type: "boolean",
  },
  // Hide event listeners
  onClick: { name: "" },
} satisfies Meta<DaikinTreeItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTreeItemStoryArgs>;
