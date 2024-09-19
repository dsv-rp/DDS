import { ReactDaikinTreeItem } from "#package/components/tree-item/stories/framework-react";
import { ReactDaikinTreeSection } from "#package/components/tree-section/stories/framework-react";
import { DaikinTree } from "#package/components/tree/daikin-tree";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTreeStoryArgs } from "./common";

const ReactDaikinTree = createComponent({
  tagName: "daikin-tree",
  elementClass: DaikinTree,
  react: React,
});

export const metadata: Meta<DaikinTreeStoryArgs> = {
  component: ({ ...props }: DaikinTreeStoryArgs) => (
    <div style={{ width: "400px" }}>
      <ReactDaikinTree {...props}>
        <ReactDaikinTreeSection label="Tree section 1" open>
          <ReactDaikinTreeItem>Tree item 1-1</ReactDaikinTreeItem>
        </ReactDaikinTreeSection>
        <ReactDaikinTreeSection label="Tree section 2" selected>
          <ReactDaikinTreeSection label="Tree section 2-1" open>
            <ReactDaikinTreeItem>Tree item 2-1-1</ReactDaikinTreeItem>
            <ReactDaikinTreeItem>Tree item 2-1-2</ReactDaikinTreeItem>
          </ReactDaikinTreeSection>
          <ReactDaikinTreeItem>Tree item 2-2</ReactDaikinTreeItem>
          <ReactDaikinTreeSection label="Tree section 2-3" open>
            <ReactDaikinTreeItem>Tree item 2-3-1</ReactDaikinTreeItem>
          </ReactDaikinTreeSection>
        </ReactDaikinTreeSection>
        <ReactDaikinTreeSection label="Tree section 3" disabled>
          <ReactDaikinTreeItem>Tree item 3-1</ReactDaikinTreeItem>
        </ReactDaikinTreeSection>
        <ReactDaikinTreeSection label="Tree section 4" disabled open>
          <ReactDaikinTreeItem>Tree item 4-1</ReactDaikinTreeItem>
        </ReactDaikinTreeSection>
        <ReactDaikinTreeItem>Tree item 5</ReactDaikinTreeItem>
      </ReactDaikinTree>
    </div>
  ),
};
