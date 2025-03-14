import { DaikinInputGroup } from "#package/components/input-group/daikin-input-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinCheckboxGroup } from "../../checkbox-group/stories/framework-react";
import { ReactDaikinCheckbox } from "../../checkbox/stories/framework-react";
import { ReactDaikinDropdownItem } from "../../dropdown-item/stories/framework-react";
import { ReactDaikinDropdown } from "../../dropdown/stories/framework-react";
import { ReactDaikinRadioGroup } from "../../radio-group/stories/framework-react";
import { ReactDaikinRadio } from "../../radio/stories/framework-react";
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
        {content === "RadioGroup" && (
          <ReactDaikinRadioGroup value="value1">
            <ReactDaikinRadio value="value1" label="Option1"></ReactDaikinRadio>
            <ReactDaikinRadio value="value2" label="Option2"></ReactDaikinRadio>
            <ReactDaikinRadio value="value3" label="Option3"></ReactDaikinRadio>
          </ReactDaikinRadioGroup>
        )}
        {content === "CheckboxGroup" && (
          <ReactDaikinCheckboxGroup>
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
        )}
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
