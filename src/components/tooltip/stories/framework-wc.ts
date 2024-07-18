import "#package/components/tooltip/daikin-tooltip";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTooltipStoryArgs } from "./common";

export const metadata: Meta<DaikinTooltipStoryArgs> = {
  render: ({
    placement,
    variant,
    arrow,
    size,
    open,
    description,
    closeOnClick,
    autoAlign,
  }) => html`
    <daikin-tooltip
      placement=${placement}
      variant=${variant}
      ?arrow=${arrow}
      size=${size}
      ?open=${open}
      description=${description}
      ?closeOnClick=${closeOnClick}
      ?autoAlign=${autoAlign}
    ></daikin-tooltip>
  `,
};
