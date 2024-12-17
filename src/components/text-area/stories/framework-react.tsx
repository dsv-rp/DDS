import { DaikinTextArea } from "#package/components/text-area/daikin-text-area";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTextAreaStoryArgs } from "./common";

export const ReactDaikinTextArea = createComponent({
  tagName: "daikin-text-area",
  elementClass: DaikinTextArea,
  react: React,
  events: {
    onChange: "change",
    onInput: "input",
  },
});

export const metadata: Meta<DaikinTextAreaStoryArgs> = {
  component: ({ ...props }: DaikinTextAreaStoryArgs) => (
    <div style={{ width: "360px" }}>
      <ReactDaikinTextArea {...props} />
    </div>
  ),
};
