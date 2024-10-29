import { DaikinInputGroup } from "#package/components/input-group/daikin-input-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinTextField } from "../../text-field/stories/framework-react";
import { ReactDaikinTextarea } from "../../textarea/stories/framework-react";
import type { DaikinInputGroupStoryArgs } from "./common";

export const ReactDaikinInputGroup = createComponent({
  tagName: "daikin-input-group",
  elementClass: DaikinInputGroup,
  react: React,
});

export const metadata: Meta<DaikinInputGroupStoryArgs> = {
  component: ({ content, ...props }: DaikinInputGroupStoryArgs) => {
    const inputContent = {
      TextField: <ReactDaikinTextField value="Value" />,
      Textarea: (
        <ReactDaikinTextarea value="Value" placeholder="Placeholder text" />
      ),
    }[content];

    return (
      <div style={{ width: "360px" }}>
        <ReactDaikinInputGroup {...props}>{inputContent}</ReactDaikinInputGroup>
      </div>
    );
  },
};
