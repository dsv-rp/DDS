import { DaikinList } from "#package/components/list/daikin-list";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinCheckbox } from "../../checkbox/stories/framework-react";
import { ReactDaikinListItem } from "../../list-item/stories/framework-react";
import type { DaikinListStoryArgs } from "./common";

const ReactDaikinList = createComponent({
  tagName: "daikin-list",
  elementClass: DaikinList,
  react: React,
});

export const metadata: Meta<DaikinListStoryArgs> = {
  component: ({ ...props }: DaikinListStoryArgs) => (
    <div style={{ width: "256px" }}>
      <ReactDaikinList {...props}>
        <ReactDaikinListItem leftIcon="positive" rightIcon="chevron-right">
          List item label 1
        </ReactDaikinListItem>
        <ReactDaikinListItem type="link" href="#">
          List item label 2 (Link)
        </ReactDaikinListItem>
        <ReactDaikinListItem disabled>List item label 3</ReactDaikinListItem>
        <ReactDaikinListItem>
          List item label 4
          <ReactDaikinCheckbox
            label="Label"
            labelPosition="hidden"
            slot="action"
          />
        </ReactDaikinListItem>
        <ReactDaikinListItem rightIcon="chevron-right">
          Multiple lines of the list item label
        </ReactDaikinListItem>
      </ReactDaikinList>
    </div>
  ),
};
