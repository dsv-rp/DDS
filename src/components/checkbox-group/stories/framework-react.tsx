import { DaikinCheckboxGroup } from "#package/components/checkbox-group/daikin-checkbox-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinCheckbox } from "../../checkbox/stories/framework-react";
import type { DaikinCheckboxGroupStoryArgs } from "./common";

export const ReactDaikinCheckboxGroup = createComponent({
  tagName: "daikin-checkbox-group",
  elementClass: DaikinCheckboxGroup,
  react: React,
  events: {
    onChange: "change",
    onClick: "click",
  },
});

export const metadata: Meta<DaikinCheckboxGroupStoryArgs> = {
  component: ({ ...props }: DaikinCheckboxGroupStoryArgs) => (
    <ReactDaikinCheckboxGroup {...props}>
      <ReactDaikinCheckbox
        name="name1"
        value="value1"
        label="Label Text 1"
      ></ReactDaikinCheckbox>
      <ReactDaikinCheckbox
        name="name2"
        value="value2"
        label="Label Text 2"
      ></ReactDaikinCheckbox>
      <ReactDaikinCheckbox
        name="name3"
        value="value3"
        label="Label Text 3"
      ></ReactDaikinCheckbox>
    </ReactDaikinCheckboxGroup>
  ),
};
