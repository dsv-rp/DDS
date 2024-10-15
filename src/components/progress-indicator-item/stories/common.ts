import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinProgressIndicatorItem } from "../daikin-progress-indicator-item";

export type DaikinProgressIndicatorItemStoryArgs = Required<
  ElementProps<DaikinProgressIndicatorItem>
>;

export const DAIKIN_PROGRESS_INDICATOR_ITEM_ARG_TYPES = {
  status: {
    control: "radio",
    options: ["unfinished", "inprogress", "finished"],
  },
} satisfies Meta<DaikinProgressIndicatorItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinProgressIndicatorItemStoryArgs>;
