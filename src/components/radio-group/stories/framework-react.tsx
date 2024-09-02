import { DaikinRadioGroup } from "#package/components/radio-group/daikin-radio-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinRadio } from "../../radio/stories/framework-react";
import type { DaikinRadioGroupStoryArgs } from "./common";

const ReactDaikinRadioGroup = createComponent({
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
      <ReactDaikinRadio name="name1" value="value1" />
      <ReactDaikinRadio name="name2" value="value2" />
      <ReactDaikinRadio name="name3" value="value3" />
    </ReactDaikinRadioGroup>
  ),
};
