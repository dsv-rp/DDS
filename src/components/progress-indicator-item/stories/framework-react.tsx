import { DaikinProgressIndicatorItem } from "#package/components/progress-indicator-item/daikin-progress-indicator-item";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinProgressIndicatorItemStoryArgs } from "./common";

export const ReactDaikinProgressIndicatorItem = createComponent({
  tagName: "daikin-progress-indicator-item",
  elementClass: DaikinProgressIndicatorItem,
  react: React,
});

export const metadata: Meta<DaikinProgressIndicatorItemStoryArgs> = {
  component: ({
    label,
    description,
    ...props
  }: DaikinProgressIndicatorItemStoryArgs) => (
    <ReactDaikinProgressIndicatorItem {...props}>
      {label}
      <span slot="description">{description}</span>
    </ReactDaikinProgressIndicatorItem>
  ),
};
