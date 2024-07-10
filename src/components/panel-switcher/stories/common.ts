import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinPanelSwitcher } from "../daikin-panel-switcher";

export interface DaikinPanelSwitcherStoryArgs
  extends Required<ElementProps<DaikinPanelSwitcher>> {
  content: "text" | "form" | "long";
}

export const DAIKIN_PANEL_SWITCHER_ARG_TYPES = {
  content: {
    control: { type: "select" },
    options: ["text", "form", "long"],
    description: "[slot] Content to show",
  },
  panels: {
    control: { type: "object" },
    description: "List of panels",
  },
  value: {
    type: "string",
    description: "Current panel",
  },
} satisfies Meta<DaikinPanelSwitcherStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinPanelSwitcherStoryArgs>;
