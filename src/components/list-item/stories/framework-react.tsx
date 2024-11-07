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
  }: DaikinListItemStoryArgs) => {
    const color = { enabled: "#414141", disabled: "#BFBFBF" }[
      props.disabled ? "disabled" : "enabled"
    ];

    const style = { display: "flex", alignItems: "center", color };

    return (
      <ReactDaikinListItem {...props}>
        {label}
        {leftIcon && (
          <span slot="left-icon" style={style}>
            <ReactDaikinIcon icon={leftIcon} size="xl" color="current" />
          </span>
        )}
        {rightIcon && (
          <span slot="right-icon" style={style}>
            <ReactDaikinIcon icon={rightIcon} size="xl" color="current" />
          </span>
        )}
        {props.action && (
          <ReactDaikinCheckbox
            slot="action"
            label="Checkbox"
            labelPosition="hidden"
            disabled={props.disabled}
          />
        )}
      </ReactDaikinListItem>
    );
  },
};
