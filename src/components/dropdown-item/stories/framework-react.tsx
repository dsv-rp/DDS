import { DaikinDropdownItem } from "#package/components/dropdown-item/daikin-dropdown-item";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinDropdownItemStoryArgs } from "./common";

export const ReactDaikinDropdownItem = createComponent({
  tagName: "daikin-dropdown-item",
  elementClass: DaikinDropdownItem,
  react: React,
});

export const metadata: Meta<DaikinDropdownItemStoryArgs> = {
  component: ({ ...props }: DaikinDropdownItemStoryArgs) => (
    <ReactDaikinDropdownItem {...props}>Dropdown Item</ReactDaikinDropdownItem>
  ),
};
