import { DaikinTextInput } from "#package/components/text-input/daikin-text-input";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import "../../../storybook-tailwind.css";
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
    <div
      style={{
        ["--vrt-width" as string]:
          props.vrtArgs === "resizeLarge"
            ? "800px"
            : props.vrtArgs === "resizeSmall"
              ? "160px"
              : "340px",
      }}
      className="[&>daikin-text-input]:w-[--vrt-width]"
    >
      <ReactDaikinTextInput {...props} />
    </div>
  ),
};
