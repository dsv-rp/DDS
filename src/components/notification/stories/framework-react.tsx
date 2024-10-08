import { DaikinNotification } from "#package/components/notification/daikin-notification";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinNotificationStoryArgs } from "./common";

const ReactDaikinNotification = createComponent({
  tagName: "daikin-notification",
  elementClass: DaikinNotification,
  react: React,
  events: {
    onClose: "close",
  },
});

export const metadata: Meta<DaikinNotificationStoryArgs> = {
  component: ({ ...props }: DaikinNotificationStoryArgs) => (
    <ReactDaikinNotification {...props}>
      <span slot="title">{props.slotTitle}</span>
      <span slot="description">{props.slotDescription}</span>
    </ReactDaikinNotification>
  ),
};
