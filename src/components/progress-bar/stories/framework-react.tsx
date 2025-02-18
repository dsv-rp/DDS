import { DaikinProgressBar } from "#package/components/progress-bar/daikin-progress-bar";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinProgressBarStoryArgs } from "./common";

const ReactDaikinProgressBar = createComponent({
  tagName: "daikin-progress-bar",
  elementClass: DaikinProgressBar,
  react: React,
});

export const metadata: Meta<DaikinProgressBarStoryArgs> = {
  component: ({ label, ...props }: DaikinProgressBarStoryArgs) => (
    <ReactDaikinProgressBar {...props}>{label}</ReactDaikinProgressBar>
  ),
};
