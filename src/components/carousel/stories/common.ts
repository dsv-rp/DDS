import type { DaikinCarousel } from "#package/components/carousel/daikin-carousel";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCarouselStoryArgs
  extends Required<ElementProps<DaikinCarousel>> {
  onClick: () => void;
  onKeyDown: () => void;
  onSelect: () => void;
}

export const DAIKIN_CAROUSEL_ARG_TYPES = {
  animation: {
    control: { type: "radio" },
    options: ["slide", "manual"],
  },
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
  onClick: {
    name: "",
  },
  onKeyDown: {
    name: "",
  },
  onSelect: {
    name: "",
  },
} satisfies Meta<DaikinCarouselStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCarouselStoryArgs>;
