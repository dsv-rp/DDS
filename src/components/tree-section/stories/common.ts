import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinTreeSection } from "../daikin-tree-section";

export interface DaikinTreeSectionStoryArgs
  extends Required<ElementProps<DaikinTreeSection>> {
  onClick: () => void;
}

export const DAIKIN_TREE_SECTION_ARG_TYPES = {
  label: {
    type: "string",
  },
  selected: {
    type: "boolean",
  },
  disabled: {
    type: "boolean",
  },
  open: {
    type: "boolean",
  },
  hierarchy: {
    type: "number",
  },
} satisfies Meta<DaikinTreeSectionStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTreeSectionStoryArgs>;