import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/react";
import React from "react";

import type { DaikinTabGroupStoryArgs } from "./common";
import { ReactDaikinTab, ReactDaikinTabGroup } from "./react";

const StoryTabGroup: React.FC<DaikinTabGroupStoryArgs> = ({ value }) => {
  return (
    <ReactDaikinTabGroup
      value={value}
      onBeforeChange={action("beforechange")}
      onChange={action("change")}
    >
      <ReactDaikinTab value="foo">Foo</ReactDaikinTab>
      <ReactDaikinTab value="bar">Bar</ReactDaikinTab>
      <ReactDaikinTab value="baz">Baz</ReactDaikinTab>
    </ReactDaikinTabGroup>
  );
};

const meta = {
  title: "Components/Tab",
  tags: ["autodocs"],
  component: StoryTabGroup,
  argTypes: {
    value: {
      type: "string",
    },
  },
} satisfies Meta<DaikinTabGroupStoryArgs>;

export default meta;

export { TabGroup } from "./common";
