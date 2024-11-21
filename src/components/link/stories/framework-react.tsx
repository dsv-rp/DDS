import { DaikinLink } from "#package/components/link/daikin-link";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinLinkStoryArgs } from "./common";

export const ReactDaikinLink = createComponent({
  react: React,
  tagName: "daikin-link",
  elementClass: DaikinLink,
});

export const metadata: Meta<DaikinLinkStoryArgs> = {
  component: ({
    label,
    leftIcon,
    rightIcon,
    ...props
  }: DaikinLinkStoryArgs) => (
    <ReactDaikinLink {...props}>
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
    </ReactDaikinLink>
  ),
};
