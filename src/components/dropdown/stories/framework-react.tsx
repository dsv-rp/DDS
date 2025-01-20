import { DaikinDropdown } from "#package/components/dropdown/daikin-dropdown";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinDropdownItem } from "../../dropdown-item/stories/framework-react";
import type { DaikinDropdownStoryArgs } from "./common";
import { objects, vrtMultipleValue } from "./framework-wc";

export const ReactDaikinDropdown = createComponent({
  tagName: "daikin-dropdown",
  elementClass: DaikinDropdown,
  react: React,
  events: {
    onClick: "click",
    onChange: "change",
  },
});

export const metadata: Meta<DaikinDropdownStoryArgs> = {
  component: ({
    selectedOptions,
    option,
    __vrtMultipleValue__,
    ...props
  }: DaikinDropdownStoryArgs) => (
    <div
      data-testid="vrt-container"
      style={{
        width: "480px",
        height: "256px",
      }}
    >
      <ReactDaikinDropdown
        {...props}
        selectedOptions={
          __vrtMultipleValue__
            ? vrtMultipleValue[__vrtMultipleValue__]
            : selectedOptions
        }
      >
        {[...Array(objects[option]).keys()].map((index) => (
          <ReactDaikinDropdownItem
            key={index}
            value={`value${index + 1}`}
            disabled={[2, 3].includes(index)}
          >
            {`Dropdown item ${index + 1}`}
          </ReactDaikinDropdownItem>
        ))}
      </ReactDaikinDropdown>
    </div>
  ),
};
