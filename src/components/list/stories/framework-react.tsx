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
        <ReactDaikinListItem left-icon="positive" chevron>
          List item label 1
        </ReactDaikinListItem>
        <ReactDaikinListItem type="link" href="#" chevron>
          List item label 2
        </ReactDaikinListItem>
        <ReactDaikinListItem chevron disabled>
          List item label 3
        </ReactDaikinListItem>
        <ReactDaikinListItem chevron>
          List item label 4
          <ReactDaikinCheckbox
            label="Label"
            labelPosition="hidden"
            slot="action"
          ></ReactDaikinCheckbox>
        </ReactDaikinListItem>
      </ReactDaikinList>
    </div>
  ),
};
