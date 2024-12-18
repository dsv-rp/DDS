import { DaikinCard } from "#package/components/card/daikin-card";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinButton } from "../../button/stories/framework-react";
import { ReactDaikinCardFooter } from "../../card-footer/stories/framework-react";
import { ReactDaikinCardHeader } from "../../card-header/stories/framework-react";
import { ReactDaikinIcon } from "../../icon/stories/framework-react";
import type { DaikinCardStoryArgs } from "./common";

const ReactDaikinCard = createComponent({
  react: React,
  tagName: "daikin-card",
  elementClass: DaikinCard,
  events: {},
});

export const metadata: Meta<DaikinCardStoryArgs> = {
  component: ({ ...props }: DaikinCardStoryArgs) => (
    <ReactDaikinCard {...props}>
      <ReactDaikinCardHeader>
        <ReactDaikinIcon
          slot="left-icon"
          icon="alarm"
          size="xl"
          color="current"
        />
        <span>Label Title</span>
        <span slot="description">Description</span>
      </ReactDaikinCardHeader>
      {props.withBody && (
        <div style={{ height: "173px", width: "248px" }}></div>
      )}
      {props.withFooter && (
        <ReactDaikinCardFooter>
          <ReactDaikinButton size="small">Button</ReactDaikinButton>
        </ReactDaikinCardFooter>
      )}
    </ReactDaikinCard>
  ),
};
