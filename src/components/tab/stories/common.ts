import type { StoryObj } from "@storybook/web-components";

import type { DaikinTab } from "../daikin-tab";
import type { DaikinTabGroup } from "../daikin-tab-group";

export interface DaikinTabStoryArgs extends DaikinTab {
  /** Text input for users */
  label: string;
}

export interface DaikinTabGroupStoryArgs extends DaikinTabGroup {
  size: DaikinTab["size"];
}

type TabStory = StoryObj<DaikinTabStoryArgs>;
type TabGroupStory = StoryObj<DaikinTabGroupStoryArgs>;

export const Tab: TabStory = {
  args: {
    size: "default",
    active: false,
    disabled: false,
    label: "Tab",
  },
};

export const TabGroup: TabGroupStory = {
  args: {
    value: "foo",
    size: "default",
  },
};
