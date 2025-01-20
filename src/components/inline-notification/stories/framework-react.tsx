import { DaikinInlineNotification } from "#package/components/inline-notification/daikin-inline-notification";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinButton } from "../../button/stories/framework-react";
import type { DaikinInlineNotificationStoryArgs } from "./common";

const ReactDaikinInlineNotification = createComponent({
  tagName: "daikin-inline-notification",
  elementClass: DaikinInlineNotification,
  react: React,
  events: {
    onClose: "close",
  },
});

export const metadata: Meta<DaikinInlineNotificationStoryArgs> = {
  component: ({
    slotTitle,
    slotDescription,
    slotAction,
    ...props
  }: DaikinInlineNotificationStoryArgs) => (
    <ReactDaikinInlineNotification {...props}>
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
    </ReactDaikinInlineNotification>
  ),
};
