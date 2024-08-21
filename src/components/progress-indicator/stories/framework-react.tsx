import { DaikinProgressIndicator } from "#package/components/progress-indicator/daikin-progress-indicator";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinProgressIndicatorItem } from "../../progress-indicator-item/stories/framework-react";
import type { DaikinProgressIndicatorStoryArgs } from "./common";

const ReactDaikinProgressIndicator = createComponent({
  tagName: "daikin-progress-indicator",
  elementClass: DaikinProgressIndicator,
  react: React,
});

export const metadata: Meta<DaikinProgressIndicatorStoryArgs> = {
  component: ({ ...props }: DaikinProgressIndicatorStoryArgs) => (
    <ReactDaikinProgressIndicator {...props}>
      <ReactDaikinProgressIndicatorItem status="unfinished">
        <span>Title 1</span>
        <span slot="description">Description 1</span>
      </ReactDaikinProgressIndicatorItem>
      <ReactDaikinProgressIndicatorItem status="inprogress">
        <span>Title 2</span>
        <span slot="description">Description 2</span>
      </ReactDaikinProgressIndicatorItem>
      <ReactDaikinProgressIndicatorItem status="finished">
        <span>Title 3</span>
        <span slot="description">Description 3</span>
      </ReactDaikinProgressIndicatorItem>
      <ReactDaikinProgressIndicatorItem status="error">
        <span>Title 4</span>
        <span slot="description">Description 4</span>
      </ReactDaikinProgressIndicatorItem>
      <ReactDaikinProgressIndicatorItem status="disabled">
        <span>Title 5</span>
        <span slot="description">Description 5</span>
      </ReactDaikinProgressIndicatorItem>
    </ReactDaikinProgressIndicator>
  ),
};
