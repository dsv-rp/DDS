import { DaikinTextarea } from "#package/components/textarea/daikin-textarea";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTextareaStoryArgs } from "./common";

export const ReactDaikinTextarea = createComponent({
  tagName: "daikin-textarea",
  elementClass: DaikinTextarea,
  react: React,
  events: {
    onChange: "change",
    onInput: "input",
  },
});

export const metadata: Meta<DaikinTextareaStoryArgs> = {
  component: ({ ...props }: DaikinTextareaStoryArgs) => (
    <ReactDaikinTextarea {...props} />
  ),
};
