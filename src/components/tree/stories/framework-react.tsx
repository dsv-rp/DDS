import { DaikinTree } from "#package/components/tree/daikin-tree";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinTreeItem } from "../../tree-item/stories/framework-react";
import { ReactDaikinTreeSection } from "../../tree-section/stories/framework-react";
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
        <ReactDaikinTreeSection value="1" open>
          <span slot="label">Tree section 1</span>
          <ReactDaikinTreeItem value="1-1">Tree item 1-1</ReactDaikinTreeItem>
        </ReactDaikinTreeSection>
        <ReactDaikinTreeSection value="2">
          <span slot="label">Tree section 2</span>
          <ReactDaikinTreeSection value="2-1" open>
            <span slot="label">Tree section 2-1</span>
            <ReactDaikinTreeItem value="2-1-1">
              Tree item 2-1-1
            </ReactDaikinTreeItem>
            <ReactDaikinTreeItem value="2-1-2">
              Tree item 2-1-2
            </ReactDaikinTreeItem>
          </ReactDaikinTreeSection>
          <ReactDaikinTreeItem value="2-2">Tree item 2-2</ReactDaikinTreeItem>
          <ReactDaikinTreeSection value="2-3" open>
            <span slot="label">Tree section 2-3</span>
            <ReactDaikinTreeItem value="2-3">
              Tree item 2-3-1
            </ReactDaikinTreeItem>
          </ReactDaikinTreeSection>
        </ReactDaikinTreeSection>
        <ReactDaikinTreeSection value="3" disabled>
          <span slot="label">Tree section 3</span>
          <ReactDaikinTreeItem value="3-1" disabled>
            Tree item 3-1
          </ReactDaikinTreeItem>
        </ReactDaikinTreeSection>
        {/* 'open' is ignored when 'disabled' */}
        <ReactDaikinTreeSection value="4" disabled open>
          <span slot="label">Tree section 4</span>
          <ReactDaikinTreeItem value="4-1" disabled>
            Tree item 4-1
          </ReactDaikinTreeItem>
        </ReactDaikinTreeSection>
        <ReactDaikinTreeItem value="5">Tree item 5</ReactDaikinTreeItem>
      </ReactDaikinTree>
    </div>
  ),
};
