import { DaikinTextField } from "#package/components/text-field/daikin-text-field";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinTextFieldStoryArgs } from "./common";

export const ReactDaikinTextField = createComponent({
  tagName: "daikin-text-field",
  elementClass: DaikinTextField,
  react: React,
  events: {
    onChange: "change",
    onInput: "input",
    onKeyDown: "keydown",
    onSearch: "search",
    onShow: "show",
  },
});

export const metadata: Meta<DaikinTextFieldStoryArgs> = {
  component: ({ leftIcon, rightIcon, ...props }: DaikinTextFieldStoryArgs) => {
    return (
      <div style={{ width: "340px" }}>
        <ReactDaikinTextField {...props}>
          {leftIcon && (
            <ReactDaikinIcon
              slot="left-icon"
              icon={leftIcon}
              size="current"
              color="current"
            />
          )}
          {rightIcon && (
            <ReactDaikinIcon
              slot="right-icon"
              icon={rightIcon}
              size="current"
              color="current"
            />
          )}
        </ReactDaikinTextField>
      </div>
    );
  },
};
