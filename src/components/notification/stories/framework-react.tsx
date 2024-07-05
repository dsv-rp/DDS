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
    close: "onClose",
  },
});

export const metadata: Meta<DaikinNotificationStoryArgs> = {
  component: ({ ...props }: DaikinNotificationStoryArgs) => (
    <ReactDaikinNotification {...props} />
  ),
};
