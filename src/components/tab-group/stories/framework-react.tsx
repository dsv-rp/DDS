import { DaikinTabGroup } from "#package/components/tab-group/daikin-tab-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import "../../../storybook-tailwind.css";
import { ReactDaikinPanelSwitcher } from "../../panel-switcher/stories/framework-react";
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
      className="w-[600px] h-[400px] flex flex-col items-stretch part-[tablist]:flex-none part-[tablist]:flex part-[tablist]:w-full part-[tablist]:overflow-auto"
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
      <ReactDaikinPanelSwitcher
        slot="panels"
        className="flex-1 overflow-hidden"
      >
        {tabs.map((tab) => {
          const [label, value] = parseTab(tab);
          return (
            <div
              key={value}
              className="font-daikinSerif w-full h-full overflow-auto bg-red-500/10"
              tabIndex={0}
              slot={`panel:${value}`}
            >
              <p className="pb-[500px]">Content of tab {label}. (Scrollable)</p>
              <p>Bottom</p>
            </div>
          );
        })}
      </ReactDaikinPanelSwitcher>
    </ReactDaikinTabGroup>
  ),
};
