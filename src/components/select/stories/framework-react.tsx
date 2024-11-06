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
        <select name="select">
          <option value="value-1">Option 1</option>
          <option value="value-2">Option 2</option>
          <optgroup label="Group A">
            <option value="value-a-1">Option A-1</option>
            <option value="value-a-2" disabled>
              Option A-2
            </option>
            <option value="value-a-3">Option A-3</option>
          </optgroup>
          <optgroup label="Group B" disabled>
            <option value="value-b-1">Option B-1</option>
            <option value="value-b-2">Option B-2</option>
            <option value="value-b-3">Option B-3</option>
          </optgroup>
        </select>
      </ReactDaikinSelect>
    </div>
  ),
};
