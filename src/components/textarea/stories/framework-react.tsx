import { DaikinTextarea } from "#package/components/textarea/daikin-textarea";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import "../../../storybook-tailwind.css";
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
  component: ({ ...props }: DaikinTextareaStoryArgs) => {
    const additionalClassNames = {
      "": "",
      resizeLarge:
        "[&>daikin-textarea]:w-[800px] [&>daikin-textarea]:h-[320px]",
      resizeSmall: "[&>daikin-textarea]:w-[160px] [&>daikin-textarea]:h-[40px]",
    }[props.vrtArgs ?? ""];

    return (
      <div className={additionalClassNames}>
        <ReactDaikinTextarea {...props} />
      </div>
    );
  },
};
