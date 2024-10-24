import { DaikinInputGroup } from "#package/components/input-group/daikin-input-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import "../../../storybook-tailwind.css";
import { ReactDaikinSelect } from "../../select/stories/framework-react";
import { ReactDaikinTextInput } from "../../text-input/stories/framework-react";
import { ReactDaikinTextarea } from "../../textarea/stories/framework-react";
import type { DaikinInputGroupStoryArgs } from "./common";

export const ReactDaikinInputGroup = createComponent({
  tagName: "daikin-input-group",
  elementClass: DaikinInputGroup,
  react: React,
});

export const metadata: Meta<DaikinInputGroupStoryArgs> = {
  component: ({ content, ...props }: DaikinInputGroupStoryArgs) => (
    <ReactDaikinInputGroup {...props}>
      {content === "TextInput" && <ReactDaikinTextInput value="Value" />}
      {content === "Textarea" && (
        <ReactDaikinTextarea value="Value" placeholder="Placeholder text" />
      )}
      {content === "Select" && (
        <ReactDaikinSelect className="w-[360px]">
          <select name="select">
            <option value="value1">Option 1</option>
            <option value="value2">Option 2</option>
            <option value="value3">Option 3</option>
          </select>
        </ReactDaikinSelect>
      )}
    </ReactDaikinInputGroup>
  ),
};
