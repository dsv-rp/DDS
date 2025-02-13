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
});

export const metadata: Meta<DaikinCardStoryArgs> = {
  component: ({ withBody, withFooter, ...props }: DaikinCardStoryArgs) => (
    <ReactDaikinCard
      {...props}
      style={{ width: "max-content", height: "max-content" }}
    >
      <ReactDaikinCardHeader>
        <ReactDaikinIcon
          slot="left-icon"
          icon="alarm"
          size="current"
          color="current"
        />
        <span>Card title</span>
        <span slot="description">Card description</span>
      </ReactDaikinCardHeader>
      {withBody && <div style={{ width: "248px", height: "173px" }}></div>}
      {withFooter && (
        <ReactDaikinCardFooter>
          <ReactDaikinButton size="small">Button</ReactDaikinButton>
        </ReactDaikinCardFooter>
      )}
    </ReactDaikinCard>
  ),
};
