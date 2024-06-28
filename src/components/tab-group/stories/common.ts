import type { StoryObj } from "@storybook/web-components";

import type { DaikinTabGroup } from "../daikin-tab-group";

export interface DaikinTabGroupStoryArgs extends DaikinTabGroup {
  size: DaikinTab["size"];
}

type TabGroupStory = StoryObj<DaikinTabGroupStoryArgs>;

export const TabGroup: TabGroupStory = {
  args: {
    value: "foo",
    size: "default",
  },
};
