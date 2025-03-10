import { DaikinTooltip } from "#package/components/tooltip/daikin-tooltip";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import { ReactDaikinIconButton } from "../../icon-button/stories/framework-react";
import {
  cvaContainer,
  cvaViewArea,
  TOOLTIP_SLOT_TEXT,
  type DaikinTooltipStoryArgs,
} from "./common";

const ReactDaikinTooltip = createComponent({
  react: React,
  tagName: "daikin-tooltip",
  elementClass: DaikinTooltip,
  events: {
    onBeforeToggle: "beforetoggle",
    onClick: "click",
    onToggle: "toggle",
  },
});

export const metadata: Meta<DaikinTooltipStoryArgs> = {
  component: ({
    hasSlot,
    __vrtContainer__,
    ...props
  }: DaikinTooltipStoryArgs) => (
    <div
      data-testid="view-area"
      className={cvaViewArea({ viewArea: "small", isVrt: !!__vrtContainer__ })}
    >
      <div className={cvaContainer({ isVrt: __vrtContainer__ })}>
        <ReactDaikinTooltip {...props}>
          <ReactDaikinIconButton button-aria-label="Trigger">
            <span className="block size-6 i-daikin-status-information" />
          </ReactDaikinIconButton>
          {hasSlot && <span slot="description">{TOOLTIP_SLOT_TEXT}</span>}
        </ReactDaikinTooltip>
      </div>
    </div>
  ),
  parameters: {
    layout: "centered",
  },
};
