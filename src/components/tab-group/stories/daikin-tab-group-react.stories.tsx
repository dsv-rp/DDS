import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/react";
import React from "react";

import { parseTab, type DaikinTabGroupStoryArgs } from "./common";
import { ReactDaikinTab } from "../../tab/stories/react";
import { ReactDaikinTabGroup } from "./react";

const StoryTabGroup: React.FC<DaikinTabGroupStoryArgs> = ({
  tabs,
  size,
  value,
}) => {
  return (
    <ReactDaikinTabGroup
      value={value}
      onBeforeChange={action("beforechange")}
      onChange={action("change")}
      style={{ maxWidth: "600px", overflow: "auto" }}
    >
      {tabs.map((tab) => {
        const [label, value, disabled] = parseTab(tab);
        return (
          <ReactDaikinTab size={size} value={value} disabled={disabled}>
            {label}
          </ReactDaikinTab>
        );
      })}
    </ReactDaikinTabGroup>
  );
};

const meta = {
  title: "Components/TabGroup",
  tags: ["autodocs"],
  component: StoryTabGroup,
  argTypes: {
    tabs: {
      control: { type: "object" },
    },
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

export { TabGroup, TabGroupSingle, TabGroupMany } from "./common";
