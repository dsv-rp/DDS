import { DaikinProgressIndicator } from "#package/components/progress-indicator/daikin-progress-indicator";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinProgressIndicatorItem } from "../../progress-indicator-item/stories/framework-react";
import { type DaikinProgressIndicatorStoryArgs } from "./common";

const ReactDaikinProgressIndicator = createComponent({
  tagName: "daikin-progress-indicator",
  elementClass: DaikinProgressIndicator,
  react: React,
});

export const metadata: Meta<DaikinProgressIndicatorStoryArgs> = {
  component: ({ ...props }: DaikinProgressIndicatorStoryArgs) => (
    <ReactDaikinProgressIndicator {...props}>
      {[...Array(3).keys()].map((index) => (
        <ReactDaikinProgressIndicatorItem key={index}>
          {`Progress indicator label ${index + 1}`}
          <span slot="description">{`Progress indicator description ${index + 1}`}</span>
        </ReactDaikinProgressIndicatorItem>
      ))}
    </ReactDaikinProgressIndicator>
  ),
};
