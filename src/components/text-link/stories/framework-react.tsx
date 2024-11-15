import { DaikinTextLink } from "#package/components/text-link/daikin-text-link";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinTextLinkStoryArgs } from "./common";

export const ReactDaikinTextLink = createComponent({
  react: React,
  tagName: "daikin-text-link",
  elementClass: DaikinTextLink,
});

export const metadata: Meta<DaikinTextLinkStoryArgs> = {
  component: ({
    label,
    leftIcon,
    rightIcon,
    ...props
  }: DaikinTextLinkStoryArgs) => (
    <ReactDaikinTextLink {...props}>
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
    </ReactDaikinTextLink>
  ),
};
