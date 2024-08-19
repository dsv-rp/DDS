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
  component: ({ ...props }: DaikinTextareaStoryArgs) => (
    <div
      style={{
        ["--vrt-width" as string]:
          props.vrtArgs === "resizeLarge"
            ? "800px"
            : props.vrtArgs === "resizeSmall"
              ? "160px"
              : "340px",
      }}
      className="[&>daikin-textarea]:w-[--vrt-width]"
    >
      <ReactDaikinTextarea {...props} />
    </div>
  ),
};
