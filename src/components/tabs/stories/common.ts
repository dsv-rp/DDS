import type { DaikinTab } from "#package/components/tab/daikin-tab";
import type { DaikinTabs } from "#package/components/tabs/daikin-tabs";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTabsStoryArgs
  extends Required<ElementProps<DaikinTabs>> {
  tabs: string[];
  onBeforeChange: (event: CustomEvent<{ newTab: DaikinTab }>) => void;
  onChange: (event: Event) => void;
}

export const DAIKIN_TABS_ARG_TYPES = {
  tabs: {
    control: "object",
  },
  value: {
    type: "string",
  },
  onBeforeChange: {
    name: "",
  },
  onChange: {
    name: "",
  },
} satisfies Meta<DaikinTabsStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTabsStoryArgs>;

export function parseTab(
  name: string
): [label: string, value: string, disabled: boolean] {
  return [
    name.replace(/^!/, ""),
    name.toLowerCase().replace(/\s+/, "").replace(/^!/, ""),
    name.startsWith("!"),
  ];
}
