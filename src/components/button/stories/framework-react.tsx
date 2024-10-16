import { DaikinButton } from "#package/components/button/daikin-button";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinButtonStoryArgs } from "./common";

export const ReactDaikinButton = createComponent({
  react: React,
  tagName: "daikin-button",
  elementClass: DaikinButton,
  events: {
    onClick: "click",
  },
});

export const metadata: Meta<DaikinButtonStoryArgs> = {
  component: ({ label, ...props }: DaikinButtonStoryArgs) => (
    <ReactDaikinButton {...props}>{label}</ReactDaikinButton>
  ),
};
