import { DaikinTextInput } from "#package/components/text-input/daikin-text-input";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import "../../../storybook-tailwind.css";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
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
  component: ({ leftIcon, rightIcon, ...props }: DaikinTextInputStoryArgs) => {
    return (
      <div style={{ width: "340px" }}>
        <ReactDaikinTextInput {...props}>
          {leftIcon && (
            <ReactDaikinIcon
              slot="left-icon"
              icon={leftIcon}
              size="xl"
              color="current"
            />
          )}
          {rightIcon && (
            <ReactDaikinIcon
              slot="right-icon"
              icon={rightIcon}
              size="xl"
              color="current"
            />
          )}
        </ReactDaikinTextInput>
      </div>
    );
  },
};
