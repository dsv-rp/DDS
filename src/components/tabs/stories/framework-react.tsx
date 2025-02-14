import type { DaikinTab } from "#package/components/tab/daikin-tab";
import { DaikinTabs } from "#package/components/tabs/daikin-tabs";
import { createComponent, type EventName } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinTabPanels } from "../../tab-panels/stories/framework-react";
import { ReactDaikinTab } from "../../tab/stories/framework-react";
import { parseTab, type DaikinTabsStoryArgs } from "./common";

export const ReactDaikinTabs = createComponent({
  tagName: "daikin-tabs",
  elementClass: DaikinTabs,
  react: React,
  events: {
    onBeforeChange: "beforechange" as EventName<
      CustomEvent<{ newTab: DaikinTab }>
    >,
    onChange: "change",
  },
});

export const metadata: Meta<DaikinTabsStoryArgs> = {
  component: ({ tabs, scrollable, ...props }: DaikinTabsStoryArgs) => (
    <ReactDaikinTabs
      {...props}
      {...(scrollable && {
        class: "w-[600px] h-[400px] flex flex-col items-stretch",
      })}
    >
      {tabs.map((tab) => {
        const [label, value, disabled] = parseTab(tab);
        return (
          <ReactDaikinTab key={value} value={value} disabled={disabled}>
            {label}
          </ReactDaikinTab>
        );
      })}
      <ReactDaikinTabPanels
        slot="panels"
        className="text-ddt-color-common-text-primary flex-1 overflow-hidden"
      >
        {tabs.map((tab) => {
          const [label, value] = parseTab(tab);
          return (
            <div
              key={value}
              slot={`panel:${value}`}
              className="h-full font-daikinSerif overflow-auto"
              tabIndex={0}
            >
              {scrollable ? (
                <>
                  <p className="pb-[800px]">
                    Content of tab {label}. (Scrollable)
                  </p>
                  <p>Bottom</p>
                </>
              ) : (
                <p>Content of tab {label}.</p>
              )}
            </div>
          );
        })}
      </ReactDaikinTabPanels>
    </ReactDaikinTabs>
  ),
};
