import { DaikinRadio } from "#package/components/radio/daikin-radio";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinRadioStoryArgs } from "./common";

export const ReactDaikinRadio = createComponent({
  tagName: "daikin-radio",
  elementClass: DaikinRadio,
  react: React,
  events: {
    onChange: "change",
    onClick: "click",
  },
});

export const metadata: Meta<DaikinRadioStoryArgs> = {
  component: ({ ...props }: DaikinRadioStoryArgs) => (
    <ReactDaikinRadio {...props}>{props.label}</ReactDaikinRadio>
  ),
};
