import type { DaikinList } from "#package/components/list/daikin-list";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinListStoryArgs = Required<ElementProps<DaikinList>>;

export const DAIKIN_LIST_ARG_TYPES =
  {} satisfies Meta<DaikinListStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinListStoryArgs>;
