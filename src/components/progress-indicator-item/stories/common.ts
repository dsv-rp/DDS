import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinProgressIndicatorItem } from "../daikin-progress-indicator-item";

export interface DaikinProgressIndicatorItemStoryArgs
  extends Required<ElementProps<DaikinProgressIndicatorItem>> {
  direction: "horizontal" | "vertical";
}

export const DAIKIN_PROGRESS_INDICATOR_ITEM_ARG_TYPES = {
  direction: {
    description:
      "Whether the progress indicator item is active. Normally, this is an item that is operated on the `daikin-progress-indicator` side.",
    control: { type: "radio" },
    options: ["horizontal", "vertical"],
  },
  status: {
    description: "Status of the progress indicator item",
    control: { type: "radio" },
    options: ["unfinished", "inprogress", "finished", "disabled", "error"],
  },
} satisfies Meta<DaikinProgressIndicatorItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinProgressIndicatorItemStoryArgs>;
