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
});

export const metadata: Meta<DaikinCheckboxGroupStoryArgs> = {
  component: ({ ...props }: DaikinCheckboxGroupStoryArgs) => (
    <ReactDaikinCheckboxGroup {...props}>
      <ReactDaikinCheckbox
        name="name1"
        value="value1"
        label="Checkbox Item 1"
      ></ReactDaikinCheckbox>
      <ReactDaikinCheckbox
        name="name2"
        value="value2"
        label="Checkbox Item 2"
      ></ReactDaikinCheckbox>
      <ReactDaikinCheckbox
        name="name3"
        value="value3"
        label="Checkbox Item 3"
      ></ReactDaikinCheckbox>
    </ReactDaikinCheckboxGroup>
  ),
};
