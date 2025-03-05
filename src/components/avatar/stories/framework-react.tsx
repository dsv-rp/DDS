import { DaikinAvatar } from "#package/components/avatar/daikin-avatar";
import { createComponent, type EventName } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinAvatarStoryArgs } from "./common";

export const ReactDaikinAvatar = createComponent({
  react: React,
  tagName: "daikin-avatar",
  elementClass: DaikinAvatar,
  events: {
    onClick: "click" as EventName<MouseEvent>,
  },
});

export const metadata: Meta<DaikinAvatarStoryArgs> = {
  component: ({ ...props }: DaikinAvatarStoryArgs) => (
    <ReactDaikinAvatar {...props}></ReactDaikinAvatar>
  ),
};
