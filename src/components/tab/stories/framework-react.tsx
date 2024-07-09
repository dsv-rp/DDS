import { DaikinTab } from "#package/components/tab/daikin-tab";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTabStoryArgs } from "./common";

export const ReactDaikinTab = createComponent({
  tagName: "daikin-tab",
  elementClass: DaikinTab,
  react: React,
  events: {
    onClick: "click",
    onSelect: "select",
  },
});

export const metadata: Meta<DaikinTabStoryArgs> = {
  component: ({ label, ...props }: DaikinTabStoryArgs) => (
    <ReactDaikinTab {...props}>{label}</ReactDaikinTab>
  ),
};
