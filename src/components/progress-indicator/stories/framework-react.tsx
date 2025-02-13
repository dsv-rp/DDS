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
      <ReactDaikinProgressIndicatorItem>
        Finished
        <span slot="description">Finished description</span>
      </ReactDaikinProgressIndicatorItem>
      <ReactDaikinProgressIndicatorItem>
        Inprogress
        <span slot="description">Inprogress description</span>
      </ReactDaikinProgressIndicatorItem>
      <ReactDaikinProgressIndicatorItem>
        Unfinished
        <span slot="description">Unfinished description</span>
      </ReactDaikinProgressIndicatorItem>
    </ReactDaikinProgressIndicator>
  ),
};
