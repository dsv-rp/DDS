import type { DaikinTab } from "#package/components/tab/daikin-tab";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTabStoryArgs extends Required<ElementProps<DaikinTab>> {
  label: string;
  onClick: (event: Event) => void;
}

export const DAIKIN_TAB_ARG_TYPES = {
  active: {
    type: "boolean",
  },
  disabled: {
    type: "boolean",
  },
} satisfies Meta<DaikinTabStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTabStoryArgs>;
