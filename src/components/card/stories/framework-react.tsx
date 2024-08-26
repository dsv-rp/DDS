import { DaikinCardTitle } from "#package/components/card-title/daikin-card-title";
import { DaikinCard } from "#package/components/card/daikin-card";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinCardStoryArgs } from "./common";

const ReactDaikinCard = createComponent({
  react: React,
  tagName: "daikin-card",
  elementClass: DaikinCard,
  events: {},
});

const ReactDaikinCardTitle = createComponent({
  react: React,
  tagName: "daikin-card-title",
  elementClass: DaikinCardTitle,
  events: {},
});

export const metadata: Meta<DaikinCardStoryArgs> = {
  component: ({ ...props }: DaikinCardStoryArgs) => (
    <ReactDaikinCard {...props}>
      {props.withHeader ? (
        <ReactDaikinCardTitle slot="header" underLine={true}>
          <span slot="label">Card Header</span>
        </ReactDaikinCardTitle>
      ) : null}
      <div style={{ height: 307, width: 437 }}></div>
    </ReactDaikinCard>
  ),
};
