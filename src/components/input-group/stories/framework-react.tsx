import { DaikinInputGroup } from "#package/components/input-group/daikin-input-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinTextInput } from "../../text-input/stories/framework-react";
import { ReactDaikinTextarea } from "../../textarea/stories/framework-react";
import type { DaikinInputGroupStoryArgs } from "./common";

export const ReactDaikinInputGroup = createComponent({
  tagName: "daikin-input-group",
  elementClass: DaikinInputGroup,
  react: React,
});

export const metadata: Meta<DaikinInputGroupStoryArgs> = {
  component: ({ content, ...props }: DaikinInputGroupStoryArgs) => (
    <ReactDaikinInputGroup {...props}>
      {content === "TextInput" && <ReactDaikinTextInput value="Value" />}
      {content === "Textarea" && (
        <ReactDaikinTextarea placeholder="Placeholder text" />
      )}
    </ReactDaikinInputGroup>
  ),
};
