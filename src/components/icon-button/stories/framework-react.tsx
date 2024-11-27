import { DaikinIconButton } from "#package/components/icon-button/daikin-icon-button";
import { createComponent, type EventName } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinIconButtonStoryArgs } from "./common";

export const ReactDaikinIconButton = createComponent({
  react: React,
  tagName: "daikin-icon-button",
  elementClass: DaikinIconButton,
  events: {
    onClick: "click" as EventName<MouseEvent>,
  },
});

export const metadata: Meta<DaikinIconButtonStoryArgs> = {
  component: ({ icon, ...props }: DaikinIconButtonStoryArgs) => (
    <ReactDaikinIconButton {...props}>
      <ReactDaikinIcon icon={icon} size="current" color="current" />
    </ReactDaikinIconButton>
  ),
};
