import { DaikinCheckbox } from "#package/components/checkbox/daikin-checkbox";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinCheckboxStoryArgs } from "./common";

const ReactDaikinCheckbox = createComponent({
  react: React,
  tagName: "daikin-checkbox",
  elementClass: DaikinCheckbox,
  events: {
    change: "onChange",
    click: "onClick",
  },
});

export const metadata: Meta<DaikinCheckboxStoryArgs> = {
  component: ({ ...props }: DaikinCheckboxStoryArgs) => (
    <ReactDaikinCheckbox {...props} />
  ),
};
