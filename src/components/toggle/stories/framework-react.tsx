import { DaikinToggle } from "#package/components/toggle/daikin-toggle";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinToggleStoryArgs } from "./common";

const ReactDaikinToggle = createComponent({
  react: React,
  tagName: "daikin-toggle",
  elementClass: DaikinToggle,
  events: {
    onChange: "change",
    onClick: "click",
  },
});

export const metadata: Meta<DaikinToggleStoryArgs> = {
  component: ({ ...props }: DaikinToggleStoryArgs) => (
    <ReactDaikinToggle {...props} />
  ),
};
