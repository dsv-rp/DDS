import "#package/components/icon-button/daikin-icon-button";
import "#package/components/tooltip/daikin-tooltip";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import {
  cvaContainer,
  cvaViewArea,
  TOOLTIP_SLOT_TEXT,
  type DaikinTooltipStoryArgs,
} from "./common";

export const metadata: Meta<DaikinTooltipStoryArgs> = {
  render: ({
    placement,
    color,
    open,
    description,
    popoverValue,
    trigger,
    viewArea,
    hasSlot,
    onToggle,
    onBeforeToggle,
    __vrtContainer__,
  }) =>
    html`<div
      data-testid="view-area"
      class=${cvaViewArea({ viewArea, isVrt: !!__vrtContainer__ })}
    >
      <div class=${cvaContainer({ isVrt: !!__vrtContainer__ })}>
        <daikin-tooltip
          placement=${placement}
          color=${color}
          ?open=${open}
          description=${description}
          popover-value=${popoverValue}
          trigger=${trigger}
          @toggle=${onToggle}
          @beforetoggle=${onBeforeToggle}
        >
          <daikin-icon-button button-aria-label="Trigger">
            <span class="block size-6 i-daikin-status-information"></span>
          </daikin-icon-button>
          ${hasSlot
            ? html`<span slot="description">${TOOLTIP_SLOT_TEXT}</span>`
            : nothing}
        </daikin-tooltip>
      </div>
    </div>`,
  parameters: {
    layout: "centered",
  },
};
