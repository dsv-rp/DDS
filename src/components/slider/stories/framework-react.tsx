import { DaikinSlider } from "#package/components/slider/daikin-slider";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import type { DaikinSliderStoryArgs } from "./common";

export const ReactDaikinSlider = createComponent({
  react: React,
  tagName: "daikin-slider",
  elementClass: DaikinSlider,
  events: {
    onChange: "change",
  },
});

export const metadata: Meta<DaikinSliderStoryArgs> = {
  component: ({ ...props }: DaikinSliderStoryArgs) => (
    <ReactDaikinSlider {...props} />
  ),
};
