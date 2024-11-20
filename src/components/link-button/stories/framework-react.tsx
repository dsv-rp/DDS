import { DaikinLinkButton } from "#package/components/link-button/daikin-link-button";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinLinkButtonStoryArgs } from "./common";

export const ReactDaikinLinkButton = createComponent({
  react: React,
  tagName: "daikin-link-button",
  elementClass: DaikinLinkButton,
});

export const metadata: Meta<DaikinLinkButtonStoryArgs> = {
  component: ({
    label,
    leftIcon,
    rightIcon,
    ...props
  }: DaikinLinkButtonStoryArgs) => (
    <ReactDaikinLinkButton {...props}>
      {leftIcon && (
        <ReactDaikinIcon
          slot="left-icon"
          icon={leftIcon}
          size="m"
          color="current"
        />
      )}
      {label}
      {rightIcon && (
        <ReactDaikinIcon
          slot="right-icon"
          icon={rightIcon}
          size="m"
          color="current"
        />
      )}
    </ReactDaikinLinkButton>
  ),
};
