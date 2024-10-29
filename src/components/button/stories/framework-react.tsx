import { DaikinButton } from "#package/components/button/daikin-button";
import { createComponent, type EventName } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinButtonStoryArgs } from "./common";

export const ReactDaikinButton = createComponent({
  react: React,
  tagName: "daikin-button",
  elementClass: DaikinButton,
  events: {
    onClick: "click" as EventName<MouseEvent>,
  },
});

export const metadata: Meta<DaikinButtonStoryArgs> = {
  component: ({
    label,
    leftIcon,
    rightIcon,
    ...props
  }: DaikinButtonStoryArgs) => (
    <ReactDaikinButton {...props}>
      {leftIcon && (
        <ReactDaikinIcon
          slot="left-icon"
          icon={leftIcon}
          size="xl"
          color="current"
        />
      )}
      {label}
      {rightIcon && (
        <ReactDaikinIcon
          slot="right-icon"
          icon={rightIcon}
          size="xl"
          color="current"
        />
      )}
    </ReactDaikinButton>
  ),
};
