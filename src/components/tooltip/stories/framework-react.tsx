import { ReactDaikinButton } from "#package/components/button/stories/framework-react";
import { DaikinTooltip } from "#package/components/tooltip/daikin-tooltip";
import { TOOLTIP_SLOT_TEXT } from "#package/components/tooltip/stories/framework-wc";
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
    onBeforeToggle: "beforetoggle",
    onToggle: "toggle",
  },
});

export const metadata: Meta<DaikinTooltipStoryArgs> = {
  component: ({
    hasFocusableTrigger,
    hasSlot,
    __vrtContainer__,
    ...props
  }: DaikinTooltipStoryArgs) => (
    <div
      data-testid="view-area"
      style={{
        width: 800,
        height: __vrtContainer__ ? 900 : 500,
        overflow: "auto",
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          width: 1500,
          height: __vrtContainer__ ? 1700 : 900,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ReactDaikinTooltip {...props}>
          {hasFocusableTrigger ? (
            <ReactDaikinButton>Focus me</ReactDaikinButton>
          ) : (
            <span>Hover me</span>
          )}
          {hasSlot && <span slot="description">{TOOLTIP_SLOT_TEXT}</span>}
        </ReactDaikinTooltip>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};
