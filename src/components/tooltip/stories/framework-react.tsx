import { DaikinTooltip } from "#package/components/tooltip/daikin-tooltip";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinTooltipStoryArgs } from "./common";

const ReactDaikinTooltip = createComponent({
  react: React,
  tagName: "daikin-tooltip",
  elementClass: DaikinTooltip,
  events: {
    onClick: "click",
  },
});

export const metadata: Meta<DaikinTooltipStoryArgs> = {
  component: ({ ...props }: DaikinTooltipStoryArgs) => (
    <div
      style={{
        width: 500,
        height: 500,
        overflow: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          width: 900,
          height: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ReactDaikinTooltip {...props}>
          <span slot="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            feugiat, risus quis fermentum porttitor, turpis ligula laoreet
            libero, id elementum lectus massa eu ipsum.
          </span>
          <span>hover me</span>
        </ReactDaikinTooltip>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};
