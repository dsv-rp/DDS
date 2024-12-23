import type { DaikinCarouselItem } from "#package/components/carousel-item/daikin-carousel-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCarouselItemStoryArgs
  extends Required<ElementProps<DaikinCarouselItem>> {
  label: string;
}

export const DAIKIN_CAROUSEL_ITEM_ARG_TYPES = {
  label: {
    type: "string",
  },
} satisfies Meta<DaikinCarouselItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCarouselItemStoryArgs>;
