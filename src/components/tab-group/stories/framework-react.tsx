import { DaikinTabGroup } from "#package/components/tab-group/daikin-tab-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinTab } from "../../tab/stories/framework-react";
import { parseTab, type DaikinTabGroupStoryArgs } from "./common";

export const ReactDaikinTabGroup = createComponent({
  tagName: "daikin-tab-group",
  elementClass: DaikinTabGroup,
  react: React,
  events: {
    onBeforeChange: "beforechange",
    onChange: "change",
  },
});

export const metadata: Meta<DaikinTabGroupStoryArgs> = {
  component: ({ tabs, size, ...props }: DaikinTabGroupStoryArgs) => (
    <ReactDaikinTabGroup
      {...props}
      style={{ maxWidth: "600px", overflow: "auto" }}
    >
      {tabs.map((tab) => {
        const [label, value, disabled] = parseTab(tab);
        return (
          <ReactDaikinTab
            key={value}
            size={size}
            value={value}
            disabled={disabled}
          >
            {label}
          </ReactDaikinTab>
        );
      })}
    </ReactDaikinTabGroup>
  ),
};
