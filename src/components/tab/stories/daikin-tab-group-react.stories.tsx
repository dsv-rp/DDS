import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/react";
import React from "react";

import type { DaikinTabGroupStoryArgs } from "./common";
import { ReactDaikinTab, ReactDaikinTabGroup } from "./react";

const StoryTabGroup: React.FC<DaikinTabGroupStoryArgs> = ({ size, value }) => {
  return (
    <ReactDaikinTabGroup
      value={value}
      onBeforeChange={action("beforechange")}
      onChange={action("change")}
    >
      <ReactDaikinTab size={size} value="foo">
        Foo
      </ReactDaikinTab>
      <ReactDaikinTab size={size} value="bar" disabled>
        Bar
      </ReactDaikinTab>
      <ReactDaikinTab size={size} value="baz">
        Baz
      </ReactDaikinTab>
    </ReactDaikinTabGroup>
  );
};

const meta = {
  title: "Components/Tab",
  tags: ["autodocs"],
  component: StoryTabGroup,
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "condensed"],
    },
    value: {
      type: "string",
    },
  },
} satisfies Meta<DaikinTabGroupStoryArgs>;

export default meta;

export { TabGroup } from "./common";
