import { DaikinInputGroup } from "#package/components/input-group/daikin-input-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinDropdownItem } from "../../dropdown-item/stories/framework-react";
import { ReactDaikinDropdown } from "../../dropdown/stories/framework-react";
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
    <div style={{ width: "340px" }}>
      <ReactDaikinInputGroup {...props}>
        {content === "TextInput" && <ReactDaikinTextInput value="Value" />}
        {content === "Textarea" && (
          <ReactDaikinTextarea value="Value" placeholder="Placeholder text" />
        )}
        {content === "Dropdown" && (
          <ReactDaikinDropdown placeholder="Choose an Option">
            <ReactDaikinDropdownItem value="value1">
              Dropdown item 1
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value2">
              Dropdown item 2
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value3">
              Dropdown item 3
            </ReactDaikinDropdownItem>
          </ReactDaikinDropdown>
        )}
      </ReactDaikinInputGroup>
    </div>
  ),
};
