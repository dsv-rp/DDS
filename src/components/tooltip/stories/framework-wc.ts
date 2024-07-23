import "#package/components/tooltip/daikin-tooltip";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTooltipStoryArgs } from "./common";

export const metadata: Meta<DaikinTooltipStoryArgs> = {
  render: ({ placement, variant, open, description, closeOnClick }) => html`
    <div
      class="viewArea"
      style="width: 800px; height: 500px; overflow: auto; border: 1px solid #ccc"
    >
      <div
        class="innerArea"
        style="width: 1500px; height: 900px; display: flex; align-items: center; justify-content: center"
      >
        <daikin-tooltip
          placement=${placement}
          variant=${variant}
          ?open=${open}
          description=${description}
          ?closeOnClick=${closeOnClick}
          ><span slot="description">
            Lorem ipsum dolor sit abet, consectetur advising edit. Maris
            fuegian, risus quia ferment protector, tupis ligula Laurent libero,
            id elemental cetus massa eu ipsum.
          </span>
          <span>hover me</span></daikin-tooltip
        >
      </div>
    </div>
  `,
  parameters: {
    layout: "centered",
  },
};
