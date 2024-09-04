import { DaikinTextarea } from "#package/components/textarea/daikin-textarea";
import { createComponent, type EventName } from "@lit/react";
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
    onChangeCount: "change-count" as EventName<
      Event & { detail: { count: number } }
    >,
  },
});

export const metadata: Meta<DaikinTextareaStoryArgs> = {
  component: ({ ...props }: DaikinTextareaStoryArgs) => {
    const additionalClassNames = {
      "": "",
      resizeLarge: "w-[800px] h-[320px]",
      resizeSmall: "w-[160px] h-[40px]",
    }[props.__vrtArgs__];

    return <ReactDaikinTextarea {...props} className={additionalClassNames} />;
  },
};
