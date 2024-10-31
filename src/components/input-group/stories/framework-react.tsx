import { DaikinInputGroup } from "#package/components/input-group/daikin-input-group";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinTextArea } from "../../text-area/stories/framework-react";
import { ReactDaikinTextField } from "../../text-field/stories/framework-react";
import type { DaikinInputGroupStoryArgs } from "./common";

export const ReactDaikinInputGroup = createComponent({
  tagName: "daikin-input-group",
  elementClass: DaikinInputGroup,
  react: React,
});

export const metadata: Meta<DaikinInputGroupStoryArgs> = {
  component: ({ content, ...props }: DaikinInputGroupStoryArgs) => (
    <div style={{ width: "360px" }}>
      <ReactDaikinInputGroup {...props}>
        {content === "TextField" && <ReactDaikinTextField value="Value" />}
        {content === "TextArea" && (
          <ReactDaikinTextArea value="Value" placeholder="Placeholder text" />
        )}
      </ReactDaikinInputGroup>
    </div>
  ),
};
