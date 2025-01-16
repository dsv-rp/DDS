import type { DaikinSlider } from "#package/components/slider/daikin-slider";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinSliderStoryArgs
  extends Required<ElementProps<DaikinSlider>> {
  onChange: (event: Event) => void;
}

export const DAIKIN_SLIDER_ARG_TYPES = {
  name: {
    type: "string",
  },
  value: {
    type: "string",
  },
  min: {
    type: "string",
  },
  max: {
    type: "string",
  },
  step: {
    type: "string",
  },
  disabled: {
    type: "boolean",
  },
  // Hide event listeners
  onChange: { name: "" },
} as const satisfies Meta<DaikinSliderStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinSliderStoryArgs>;
