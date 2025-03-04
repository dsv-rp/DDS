import { DaikinToastNotification } from "#package/components/toast-notification/daikin-toast-notification";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinButton } from "../../button/stories/framework-react";
import { vrtDate, type DaikinToastNotificationStoryArgs } from "./common";

export const ReactDaikinToastNotification = createComponent({
  tagName: "daikin-toast-notification",
  elementClass: DaikinToastNotification,
  react: React,
  events: {
    onClose: "close",
  },
});

export const metadata: Meta<DaikinToastNotificationStoryArgs> = {
  component: ({
    slotTitle,
    slotDescription,
    slotAction,
    isVrt,
    ...props
  }: DaikinToastNotificationStoryArgs) => (
    <ReactDaikinToastNotification
      {...props}
      timestamp={isVrt ? vrtDate : props.timestamp}
      style={{ width: "480px" }}
    >
      <span slot="title">{slotTitle}</span>
      <span slot="description">{slotDescription}</span>
      {slotAction && (
        <ReactDaikinButton
          slot="action"
          style={{ flex: "none", height: "40px" }}
          size="small"
        >
          Execute
        </ReactDaikinButton>
      )}
    </ReactDaikinToastNotification>
  ),
};
