import "#package/components/tooltip/daikin-tooltip";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTooltipStoryArgs } from "./common";

export const metadata: Meta<DaikinTooltipStoryArgs> = {
  render: ({ placement, variant, open, description, closeOnClick }) => html`
    <daikin-tooltip
      placement=${placement}
      variant=${variant}
      ?open=${open}
      description=${description}
      ?closeOnClick=${closeOnClick}
    ></daikin-tooltip>
  `,
};
