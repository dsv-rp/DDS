import { DaikinRadioGroup } from "#package/components/radio-group/daikin-radio-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinRadio } from "../../radio/stories/framework-react";
import type { DaikinRadioGroupStoryArgs } from "./common";

export const ReactDaikinRadioGroup = createComponent({
  tagName: "daikin-radio-group",
  elementClass: DaikinRadioGroup,
  react: React,
  events: {
    onChange: "change",
    onClick: "click",
  },
});

export const metadata: Meta<DaikinRadioGroupStoryArgs> = {
  component: ({ ...props }: DaikinRadioGroupStoryArgs) => (
    <ReactDaikinRadioGroup {...props}>
      <ReactDaikinRadio value="value1" label="Option1"></ReactDaikinRadio>
      <ReactDaikinRadio value="value2" label="Option2"></ReactDaikinRadio>
      <ReactDaikinRadio value="value3" label="Option3"></ReactDaikinRadio>
    </ReactDaikinRadioGroup>
  ),
};
