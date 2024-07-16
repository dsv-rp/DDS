import { DaikinTextInput } from "#package/components/text-input/daikin-text-input";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTextInputStoryArgs } from "./common";

export const ReactDaikinTextInput = createComponent({
  tagName: "daikin-text-input",
  elementClass: DaikinTextInput,
  react: React,
  events: {
    onChange: "change",
    onInput: "input",
    onKeyDown: "keydown",
  },
});

export const metadata: Meta<DaikinTextInputStoryArgs> = {
  component: ({ ...props }: DaikinTextInputStoryArgs) => (
    <ReactDaikinTextInput {...props} />
  ),
};
