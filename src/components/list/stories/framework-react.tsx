import { DaikinList } from "#package/components/list/daikin-list";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinCheckbox } from "../../checkbox/stories/framework-react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import { ReactDaikinListItem } from "../../list-item/stories/framework-react";
import type { DaikinListStoryArgs } from "./common";

const style = { display: "flex", alignItems: "center", color: "#414141" };

const ReactDaikinList = createComponent({
  tagName: "daikin-list",
  elementClass: DaikinList,
  react: React,
});

export const metadata: Meta<DaikinListStoryArgs> = {
  component: ({ ...props }: DaikinListStoryArgs) => (
    <div style={{ width: "360px" }}>
      <ReactDaikinList {...props}>
        <ReactDaikinListItem>
          List item label 1
          <span slot="left-icon" style={style}>
            <ReactDaikinIcon icon="positive" size="xl" color="current" />
          </span>
          <span slot="right-icon" style={style}>
            <ReactDaikinIcon icon="chevron-right" size="xl" color="current" />
          </span>
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
      </ReactDaikinList>
    </div>
  ),
};
