import "#package/components/loading/daikin-loading";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { type DaikinLoadingStoryArgs } from "./common";

export const metadata: Meta<DaikinLoadingStoryArgs> = {
  render: ({ size, background }) =>
    html`<div data-testid="vrt-container" class="flex size-fit">
      <div class="flex justify-center items-center size-48">
        <daikin-loading size=${size} ?background=${background}></daikin-loading>
      </div>
      <div
        class="flex justify-center items-center size-48 bg-ddt-color-common-neutral-default"
      >
        <daikin-loading size=${size} ?background=${background}></daikin-loading>
      </div>
    </div>`,
};
