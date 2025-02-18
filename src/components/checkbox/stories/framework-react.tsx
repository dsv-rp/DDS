import { DaikinCheckbox } from "#package/components/checkbox/daikin-checkbox";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinCheckboxStoryArgs } from "./common";

export const ReactDaikinCheckbox = createComponent({
  react: React,
  tagName: "daikin-checkbox",
  elementClass: DaikinCheckbox,
  events: {
    onChange: "change",
    onClick: "click",
  },
});

export const metadata: Meta<DaikinCheckboxStoryArgs> = {
  component: ({ ...props }: DaikinCheckboxStoryArgs) => (
    <ReactDaikinCheckbox {...props}>{props.label}</ReactDaikinCheckbox>
  ),
};
