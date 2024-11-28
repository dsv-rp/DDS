import type { DaikinProgressIndicatorItem } from "#package/components/progress-indicator-item/daikin-progress-indicator-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinProgressIndicatorItemStoryArgs
  extends Required<ElementProps<DaikinProgressIndicatorItem>> {
  label: string;
  description: string;
}

export const DAIKIN_PROGRESS_INDICATOR_ITEM_ARG_TYPES = {
  status: {
    control: "radio",
    options: ["unfinished", "inprogress", "finished"],
  },
  label: {
    type: "string",
  },
  description: {
    type: "string",
  },
} satisfies Meta<DaikinProgressIndicatorItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinProgressIndicatorItemStoryArgs>;
