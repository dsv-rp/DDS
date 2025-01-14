import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import {
  DaikinToastNotificationContainer,
  type DaikinToastManagerStoryArgs,
} from "./common";

const ReactDaikinToastNotificationContainer = createComponent({
  tagName: "daikin-toast-notification-container",
  elementClass: DaikinToastNotificationContainer,
  react: React,
  events: {
    onClose: "close",
  },
});

export const metadata: Meta<DaikinToastManagerStoryArgs> = {
  component: ({ ...props }: DaikinToastManagerStoryArgs) => (
    <ReactDaikinToastNotificationContainer {...props} />
  ),
};
