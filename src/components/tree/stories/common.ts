import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinTree } from "../daikin-tree";

export type DaikinTreeStoryArgs = Required<ElementProps<DaikinTree>>;

export const DAIKIN_TREE_ARG_TYPES =
  {} satisfies Meta<DaikinTreeStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTreeStoryArgs>;