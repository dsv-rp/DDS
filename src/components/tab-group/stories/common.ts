import type { StoryObj } from "@storybook/web-components";

import type { DaikinTab } from "../../tab/daikin-tab";
import type { DaikinTabGroup } from "../daikin-tab-group";

export interface DaikinTabGroupStoryArgs extends DaikinTabGroup {
  size: DaikinTab["size"];
  tabs: string[];
}

type TabGroupStory = StoryObj<DaikinTabGroupStoryArgs>;

export function parseTab(
  name: string
): [label: string, value: string, disabled: boolean] {
  return [
    name.replace(/^!/, ""),
    name.toLowerCase().replace(/\s+/, "").replace(/^!/, ""),
    name.startsWith("!"),
  ];
}

export const TabGroup: TabGroupStory = {
  args: {
    tabs: ["Foo", "!Bar", "Baz"],
    value: "foo",
    size: "default",
  },
};

export const TabGroupSingle: TabGroupStory = {
  args: {
    tabs: ["Foo"],
    value: "foo",
    size: "default",
  },
};

export const TabGroupMany: TabGroupStory = {
  args: {
    tabs: new Array(20).fill("").map((_, i) => `Tab ${i + 1}`),
    value: "tab1",
    size: "default",
  },
};
