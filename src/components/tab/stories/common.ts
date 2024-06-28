import type { StoryObj } from "@storybook/web-components";

import type { DaikinTab } from "../daikin-tab";

export interface DaikinTabStoryArgs extends DaikinTab {
  /** Text input for users */
  label: string;
}

type TabStory = StoryObj<DaikinTabStoryArgs>;

export const Tab: TabStory = {
  args: {
    size: "default",
    active: false,
    disabled: false,
    label: "Tab",
  },
};
