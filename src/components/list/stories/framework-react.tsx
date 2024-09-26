import { ReactDaikinCheckbox } from "#package/components/checkbox/stories/framework-react";
import { DaikinList } from "#package/components/list/daikin-list";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
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
        <ReactDaikinListItem
          label="List item label 1"
          left-icon="positive"
          right-arrow
        ></ReactDaikinListItem>
        <ReactDaikinListItem
          label="List item label 2"
          type="link"
          href="#"
          right-arrow
        ></ReactDaikinListItem>
        <ReactDaikinListItem
          label="List item label 3"
          right-arrow
          disabled
        ></ReactDaikinListItem>
        <ReactDaikinListItem label="List item label 4" right-arrow>
          <ReactDaikinCheckbox
            label="Label"
            labelPosition="hidden"
          ></ReactDaikinCheckbox>
        </ReactDaikinListItem>
      </ReactDaikinList>
    </div>
  ),
};
