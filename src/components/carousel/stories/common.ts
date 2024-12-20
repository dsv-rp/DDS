import type { DaikinCarousel } from "#package/components/carousel/daikin-carousel";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCarouselStoryArgs
  extends Required<ElementProps<DaikinCarousel>> {
  onSelect: () => void;
}

export const DAIKIN_CAROUSEL_ARG_TYPES = {
  duration: {
    type: "number",
  },
  currentIndex: {
    type: "number",
  },
  controlButtonVariant: {
    control: { type: "radio" },
    options: ["ghost", "fill"],
  },
  allowSwipe: {
    type: "boolean",
  },
  onSelect: {
    name: "",
  },
} satisfies Meta<DaikinCarouselStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCarouselStoryArgs>;
