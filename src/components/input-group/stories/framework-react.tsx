import { DaikinInputGroup } from "#package/components/input-group/daikin-input-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinSelect } from "../../select/stories/framework-react";
import { ReactDaikinTextArea } from "../../text-area/stories/framework-react";
import { ReactDaikinTextField } from "../../text-field/stories/framework-react";
import type { DaikinInputGroupStoryArgs } from "./common";

export const ReactDaikinInputGroup = createComponent({
  tagName: "daikin-input-group",
  elementClass: DaikinInputGroup,
  react: React,
});

export const metadata: Meta<DaikinInputGroupStoryArgs> = {
  component: ({ content, ...props }: DaikinInputGroupStoryArgs) => (
    <div style={{ width: "360px" }}>
      <ReactDaikinInputGroup {...props}>
        {content === "Select" && (
          <ReactDaikinSelect>
            <select name="select">
              <option value="value1">Option 1</option>
              <option value="value2">Option 2</option>
              <option value="value3">Option 3</option>
            </select>
          </ReactDaikinSelect>
        )}
        {content === "TextArea" && (
          <ReactDaikinTextArea value="Value" placeholder="Placeholder text" />
        )}
        {content === "TextField" && <ReactDaikinTextField value="Value" />}
      </ReactDaikinInputGroup>
    </div>
  ),
};
