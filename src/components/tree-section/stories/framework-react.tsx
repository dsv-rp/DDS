import { DaikinTreeSection } from "#package/components/tree-section/daikin-tree-section";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinTreeItem } from "../../tree-item/stories/framework-react";
import type { DaikinTreeSectionStoryArgs } from "./common";

export const ReactDaikinTreeSection = createComponent({
  tagName: "daikin-tree-section",
  elementClass: DaikinTreeSection,
  react: React,
  events: {
    onToggle: "toggle",
  },
});

export const metadata: Meta<DaikinTreeSectionStoryArgs> = {
  component: ({ label, ...props }: DaikinTreeSectionStoryArgs) => (
    <ReactDaikinTreeSection {...props}>
      <span slot="label">{label}</span>
      <ReactDaikinTreeItem disabled={props.disabled}>
        Tree item
      </ReactDaikinTreeItem>
    </ReactDaikinTreeSection>
  ),
};
