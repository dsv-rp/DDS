import { DaikinCardHeader } from "#package/components/card-header/daikin-card-header";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinCardHeaderStoryArgs } from "./common";

export const ReactDaikinCardHeader = createComponent({
  react: React,
  tagName: "daikin-card-Header",
  elementClass: DaikinCardHeader,
  events: {},
});

export const metadata: Meta<DaikinCardHeaderStoryArgs> = {
  component: ({
    label,
    description,
    leftIcon,
    ...props
  }: DaikinCardHeaderStoryArgs) => (
    <ReactDaikinCardHeader {...props}>
      {leftIcon ? (
        <ReactDaikinIcon
          slot="left-icon"
          icon={leftIcon}
          size="xl"
          color="current"
        />
      ) : null}
      <span>{label}</span>
      <span slot="description">{description}</span>
    </ReactDaikinCardHeader>
  ),
};
