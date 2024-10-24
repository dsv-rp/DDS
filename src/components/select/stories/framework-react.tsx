import { DaikinSelect } from "#package/components/select/daikin-select";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinSelectStoryArgs } from "./common";

export const ReactDaikinSelect = createComponent({
  tagName: "daikin-select",
  elementClass: DaikinSelect,
  react: React,
});

export const metadata: Meta<DaikinSelectStoryArgs> = {
  component: ({ ...props }: DaikinSelectStoryArgs) => (
    <div style={{ width: "360px" }}>
      <ReactDaikinSelect {...props}>
        <select name="select" disabled={props.disabled}>
          <option value="value1">Option 1</option>
          <option value="value2">Option 2</option>
          <option value="value3">Option 3</option>
          <option value="value4" disabled>
            Option 4
          </option>
          <option value="value5">Option 5</option>
        </select>
      </ReactDaikinSelect>
    </div>
  ),
};
