import "#package/components/button/daikin-button";
import "#package/components/tooltip/daikin-tooltip";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import type { DaikinTooltipStoryArgs } from "./common";

export const TOOLTIP_SLOT_TEXT =
  "This is a description using a slot. It also supports content other than character strings.";

export const metadata: Meta<DaikinTooltipStoryArgs> = {
  render: ({
    placement,
    variant,
    open,
    description,
    popoverValue,
    trigger,
    viewArea,
    hasSlot,
    hasFocusableTrigger,
    onToggle,
    onBeforeToggle,
    __vrtContainer__,
  }) => {
    return html`
      <div
        data-testid="view-area"
        style=${`width: ${viewArea === "full" ? "100vw" : "800px"}; height: ${__vrtContainer__ ? "900px" : "500px"}; overflow: auto; border: 1px solid #ccc`}
      >
        <div
          style=${`width: ${viewArea === "full" ? "200%" : "1500px"}; height: ${__vrtContainer__ ? "1700px" : "900px"}; display: flex; align-items: center; justify-content: center`}
        >
          <daikin-tooltip
            placement=${placement}
            variant=${variant}
            ?open=${open}
            description=${description}
            popover-value=${popoverValue}
            trigger=${trigger}
            @toggle=${onToggle}
            @beforetoggle=${onBeforeToggle}
          >
            ${hasFocusableTrigger
              ? html`<daikin-button>Focus me</daikin-button>`
              : html`<span>Hover me</span>`}
            ${hasSlot
              ? html`<span slot="description">${TOOLTIP_SLOT_TEXT}</span>`
              : nothing}
          </daikin-tooltip>
        </div>
      </div>
    `;
  },
  parameters: {
    layout: "centered",
  },
};
