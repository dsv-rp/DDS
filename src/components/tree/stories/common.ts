import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinTree } from "../daikin-tree";

export interface DaikinTreeStoryArgs
  extends Required<ElementProps<DaikinTree>> {
  onChange: () => void;
  onInput: () => void;
}

export const DAIKIN_TREE_ARG_TYPES =
  {} satisfies Meta<DaikinTreeStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTreeStoryArgs>;
