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
      data-testid="view-area"
      style={{
        width: 800,
        height: 500,
        overflow: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          width: 1500,
          height: 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ReactDaikinTooltip {...props}>
          {props.descriptionSlotText ? (
            <span slot="tooltip">{props.descriptionSlotText}</span>
          ) : null}
          <span>hover me</span>
        </ReactDaikinTooltip>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};
