import type { DaikinCarousel } from "#package/components/carousel/daikin-carousel";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCarouselStoryArgs
  extends Required<ElementProps<DaikinCarousel>> {
  duration: number;
  onSelect: () => void;
}

export const CAROUSEL_ITEM_STYLE =
  "flex justify-center items-center w-full h-[320px] text-ddt-color-common-text-primary bg-ddt-color-common-disabled";

export const DAIKIN_CAROUSEL_ARG_TYPES = {
  duration: {
    type: "number",
  },
  currentIndex: {
    type: "number",
  },
  onSelect: {
    name: "",
  },
} satisfies Meta<DaikinCarouselStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCarouselStoryArgs>;
