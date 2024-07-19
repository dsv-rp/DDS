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
    onChange: "change",
    onClick: "click",
  },
});

export const metadata: Meta<DaikinTooltipStoryArgs> = {
  component: ({ ...props }: DaikinTooltipStoryArgs) => (
    <ReactDaikinTooltip {...props}>
      <span slot="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris feugiat,
        risus quis fermentum porttitor, turpis ligula laoreet libero, id
        elementum lectus massa eu ipsum.
      </span>
      <span>hover me</span>
    </ReactDaikinTooltip>
  ),
  parameters: {
    layout: "centered",
  },
};
