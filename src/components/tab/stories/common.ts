import type { DaikinTab } from "#package/components/tab/daikin-tab";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTabStoryArgs extends Required<ElementProps<DaikinTab>> {
  label: string;
  onClick: () => void;
}

export const DAIKIN_TAB_ARG_TYPES = {
  size: {
    control: { type: "select" },
    options: ["default", "condensed"],
    description: "Tab size",
  },
  active: {
    type: "boolean",
    description: "Whether the tab is active",
  },
  disabled: {
    type: "boolean",
    description: "Whether the tab is disabled",
  },
  label: {
    type: "string",
    description: "Tab text",
  },
} satisfies Meta<DaikinTabStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTabStoryArgs>;
