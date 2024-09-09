import { DaikinTabs } from "#package/components/tabs/daikin-tabs";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import "../../../storybook-tailwind.css";
import { ReactDaikinTabPanels } from "../../tab-panels/stories/framework-react";
import { ReactDaikinTab } from "../../tab/stories/framework-react";
import { parseTab, type DaikinTabsStoryArgs } from "./common";

export const ReactDaikinTabs = createComponent({
  tagName: "daikin-tabs",
  elementClass: DaikinTabs,
  react: React,
  events: {
    onBeforeChange: "beforechange",
    onChange: "change",
  },
});

export const metadata: Meta<DaikinTabsStoryArgs> = {
  component: ({ tabs, ...props }: DaikinTabsStoryArgs) => (
    <ReactDaikinTabs
      {...props}
      className="w-[600px] h-[400px] flex flex-col items-stretch part-[tablist]:flex-none part-[tablist]:flex part-[tablist]:w-full part-[tablist]:overflow-auto"
    >
      {tabs.map((tab) => {
        const [label, value, disabled] = parseTab(tab);
        return (
          <ReactDaikinTab key={value} value={value} disabled={disabled}>
            {label}
          </ReactDaikinTab>
        );
      })}
      <ReactDaikinTabPanels slot="panels" className="flex-1 overflow-hidden">
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
      </ReactDaikinTabPanels>
    </ReactDaikinTabs>
  ),
};
