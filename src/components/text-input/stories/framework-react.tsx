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
  component: ({ ...props }: DaikinTextInputStoryArgs) => {
    const additionalClassNames = {
      "": "",
      resizeLarge:
        "[&>daikin-text-input]:w-[800px] [&>daikin-text-input]:h-[320px]",
      resizeSmall:
        "[&>daikin-text-input]:w-[160px] [&>daikin-text-input]:h-[40px]",
    }[props.vrtArgs ?? ""];

    return (
      <div className={additionalClassNames}>
        <ReactDaikinTextInput {...props} />
      </div>
    );
  },
};
