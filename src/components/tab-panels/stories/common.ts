import type { DaikinTabPanels } from "#package/components/tab-panels/daikin-tab-panels";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTabPanelsStoryArgs
  extends Required<ElementProps<DaikinTabPanels>> {
  content: "text" | "form" | "long";
}

export const DAIKIN_TAB_PANELS_ARG_TYPES = {
  content: {
    control: "select",
    options: ["text", "form", "long"],
    description: "[slot] Content to show",
  },
  panels: {
    control: "object",
    description: "List of panels",
  },
  value: {
    type: "string",
    description: "Current panel",
  },
} satisfies Meta<DaikinTabPanelsStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTabPanelsStoryArgs>;
