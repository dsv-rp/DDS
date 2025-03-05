import "#package/components/loading/daikin-loading";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { type DaikinLoadingStoryArgs } from "./common";

export const metadata: Meta<DaikinLoadingStoryArgs> = {
  render: ({ size, background, isVrt }) =>
    html`<div
      data-testid="vrt-container"
      class=${isVrt
        ? "size-fit p-1 bg-ddt-color-common-neutral-default"
        : "size-fit"}
    >
      <daikin-loading size=${size} ?background=${background}></daikin-loading>
    </div>`,
};
