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
      style={{ width: "max-content", height: "240px" }}
    >
      <ReactDaikinDropdown {...props}>
        <ReactDaikinDropdownItem value="value1">Value1</ReactDaikinDropdownItem>
        <ReactDaikinDropdownItem value="value2">Value2</ReactDaikinDropdownItem>
        <ReactDaikinDropdownItem value="value3">Value3</ReactDaikinDropdownItem>
      </ReactDaikinDropdown>
    </div>
  ),
};
