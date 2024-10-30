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
        <ReactDaikinTreeSection open>
          <span slot="label">Tree section 1</span>
          <ReactDaikinTreeItem>Tree item 1-1</ReactDaikinTreeItem>
        </ReactDaikinTreeSection>
        <ReactDaikinTreeSection selected>
          <span slot="label">Tree section 2</span>
          <ReactDaikinTreeSection open>
            <span slot="label">Tree section 2-1</span>
            <ReactDaikinTreeItem>Tree item 2-1-1</ReactDaikinTreeItem>
            <ReactDaikinTreeItem>Tree item 2-1-2</ReactDaikinTreeItem>
          </ReactDaikinTreeSection>
          <ReactDaikinTreeItem>Tree item 2-2</ReactDaikinTreeItem>
          <ReactDaikinTreeSection open>
            <span slot="label">Tree section 2-3</span>
            <ReactDaikinTreeItem>Tree item 2-3-1</ReactDaikinTreeItem>
          </ReactDaikinTreeSection>
        </ReactDaikinTreeSection>
        <ReactDaikinTreeSection disabled>
          <span slot="label">Tree section 3</span>
          <ReactDaikinTreeItem disabled>Tree item 3-1</ReactDaikinTreeItem>
        </ReactDaikinTreeSection>
        {/* 'open' is ignored when 'disabled' */}
        <ReactDaikinTreeSection disabled open>
          <span slot="label">Tree section 4</span>
          <ReactDaikinTreeItem disabled>Tree item 4-1</ReactDaikinTreeItem>
        </ReactDaikinTreeSection>
        <ReactDaikinTreeItem>Tree item 5</ReactDaikinTreeItem>
      </ReactDaikinTree>
    </div>
  ),
};
