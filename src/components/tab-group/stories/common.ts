import type { DaikinTabGroup } from "#package/components/tab-group/daikin-tab-group";
import type { DaikinTab } from "#package/components/tab/daikin-tab";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

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
