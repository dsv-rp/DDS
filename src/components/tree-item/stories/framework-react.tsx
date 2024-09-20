import { DaikinTreeItem } from "#package/components/tree-item/daikin-tree-item";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTreeItemStoryArgs } from "./common";

export const ReactDaikinTreeItem = createComponent({
  tagName: "daikin-tree-item",
  elementClass: DaikinTreeItem,
  react: React,
  events: {
    onClick: "click",
  },
});

export const metadata: Meta<DaikinTreeItemStoryArgs> = {
  component: ({ ...props }: DaikinTreeItemStoryArgs) => (
    <ReactDaikinTreeItem {...props}>Tree item</ReactDaikinTreeItem>
  ),
};
