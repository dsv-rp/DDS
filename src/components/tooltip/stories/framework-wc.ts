import "#package/components/tooltip/daikin-tooltip";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTooltipStoryArgs } from "./common";

export const metadata: Meta<DaikinTooltipStoryArgs> = {
  render: ({
    placement,
    variant,
    open,
    description,
    closeOnClick,
    trigger,
    descriptionSlotText,
  }) => {
    const descriptionSlot = descriptionSlotText
      ? html`<span slot="tooltip">${descriptionSlotText}</span>`
      : null;
    return html`
      <div
        data-testid="view-area"
        style="width: 800px; height: 500px; overflow: auto; border: 1px solid #ccc"
      >
        <div
          style="width: 1500px; height: 900px; display: flex; align-items: center; justify-content: center"
        >
          <daikin-tooltip
            placement=${placement}
            variant=${variant}
            ?open=${open}
            description=${description}
            ?closeOnClick=${closeOnClick}
            trigger=${trigger}
          >
            ${descriptionSlot}
            <span>hover me</span>
          </daikin-tooltip>
        </div>
      </div>
    `;
  },
  parameters: {
    layout: "centered",
  },
};
