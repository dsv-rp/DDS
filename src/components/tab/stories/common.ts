import type { StoryObj } from "@storybook/web-components";

import type { DaikinTabProps } from "../daikin-tab";
import { DaikinTabGroupProps } from "../daikin-tab-group";

export interface DaikinTabStoryArgs extends DaikinTabProps {
  /** Text input for users */
  label?: string;
}

export interface DaikinTabGroupStoryArgs extends DaikinTabGroupProps {}

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
  },
};
