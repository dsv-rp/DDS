import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinTab } from "../../tab/daikin-tab";
import type { DaikinTabGroup } from "../daikin-tab-group";

export interface DaikinTabGroupStoryArgs
  extends Required<ElementProps<DaikinTabGroup>> {
  size: DaikinTab["size"];
  tabs: string[];
  onBeforeChange: (event: Event) => void;
  onChange: (event: Event) => void;
}

export const DAIKIN_TAB_GROUP_ARG_TYPES = {
  tabs: {
    control: { type: "object" },
    description: "Tabs to show",
  },
  value: {
    type: "string",
    description: "Current tab",
  },
  size: {
    control: { type: "select" },
    options: ["default", "condensed"],
    description: "Tab size",
  },
} satisfies Meta<DaikinTabGroupStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTabGroupStoryArgs>;

export function parseTab(
  name: string
): [label: string, value: string, disabled: boolean] {
  return [
    name.replace(/^!/, ""),
    name.toLowerCase().replace(/\s+/, "").replace(/^!/, ""),
    name.startsWith("!"),
  ];
}
