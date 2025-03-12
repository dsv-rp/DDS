import "#package/components/slider/daikin-slider";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinSliderStoryArgs } from "./common";

export const metadata: Meta<DaikinSliderStoryArgs> = {
  render: ({ disabled, min, max, value, step, onChange, onInput }) => html`
    <daikin-slider
      ?disabled=${disabled}
      min=${min}
      max=${max}
      value=${value}
      step=${step}
      @change=${onChange}
      @input=${onInput}
    >
    </daikin-slider>
  `,
};
