import { DaikinListItem } from "#package/components/list-item/daikin-list-item";
import { createComponent, type EventName } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinCheckbox } from "../../checkbox/stories/framework-react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinListItemStoryArgs } from "./common";

export const ReactDaikinListItem = createComponent({
  tagName: "daikin-list-item",
  elementClass: DaikinListItem,
  react: React,
  events: {
    onClick: "click" as EventName<MouseEvent>,
  },
});

export const metadata: Meta<DaikinListItemStoryArgs> = {
  component: ({
    label,
    leftIcon,
    rightIcon,
    ...props
  }: DaikinListItemStoryArgs) => (
    <ReactDaikinListItem {...props}>
      {label}
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
      {props.action && (
        <ReactDaikinCheckbox
          label="Checkbox"
          labelPosition="hidden"
          slot="action"
        />
      )}
    </ReactDaikinListItem>
  ),
};
