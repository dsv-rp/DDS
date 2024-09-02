import { DaikinDropdown } from "#package/components/dropdown/daikin-dropdown";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinDropdownItem } from "../../dropdown-item/stories/framework-react";
import type { DaikinDropdownStoryArgs } from "./common";

const ReactDaikinDropdown = createComponent({
  tagName: "daikin-dropdown",
  elementClass: DaikinDropdown,
  react: React,
  events: {
    onClick: "click",
    onChange: "change",
  },
});

export const metadata: Meta<DaikinDropdownStoryArgs> = {
  component: ({ ...props }: DaikinDropdownStoryArgs) => (
    <div
      data-testid="vrt-container"
      style={{
        width: "max-content",
        height: "240px",
      }}
    >
      <ReactDaikinDropdown {...props}>
        {props.option === "default" && (
          <>
            <ReactDaikinDropdownItem value="value1">
              Dropdown item 1
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value2">
              Dropdown item 2
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value3" disabled>
              Dropdown item 3
            </ReactDaikinDropdownItem>
          </>
        )}
        {props.option === "single" && (
          <ReactDaikinDropdownItem value="value1">
            Item 1
          </ReactDaikinDropdownItem>
        )}
        {props.option === "multiple" && (
          <>
            <ReactDaikinDropdownItem value="value1">
              Dropdown item 1
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value2">
              Dropdown item 2
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value3" disabled>
              Dropdown item 3
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value3" disabled>
              Dropdown item 4
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value5">
              Dropdown item 5
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value6">
              Dropdown item 6
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value7">
              Dropdown item 7
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value8">
              Dropdown item 8
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value9">
              Dropdown item 9
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value10">
              Dropdown item 10
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value11">
              Dropdown item 11
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value12">
              Dropdown item 12
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value13">
              Dropdown item 13
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value14">
              Dropdown item 14
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value15">
              Dropdown item 15
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value16">
              Dropdown item 16
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value17">
              Dropdown item 17
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value18">
              Dropdown item 18
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value19">
              Dropdown item 19
            </ReactDaikinDropdownItem>
            <ReactDaikinDropdownItem value="value20">
              Dropdown item 20
            </ReactDaikinDropdownItem>
          </>
        )}
      </ReactDaikinDropdown>
    </div>
  ),
};
