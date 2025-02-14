import type { DaikinCarouselItem } from "#package/components/carousel-item/daikin-carousel-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCarouselItemStoryArgs
  extends Required<ElementProps<DaikinCarouselItem>> {
  image: string;
  title: string;
  description: string;
}

export const CAROUSEL_ITEM_STYLE =
  "flex justify-center items-center w-full h-[320px] text-ddt-color-common-text-primary bg-ddt-color-common-disabled";

export const DAIKIN_CAROUSEL_ITEM_ARG_TYPES = {
  image: {
    type: "string",
  },
  title: {
    type: "string",
  },
  description: {
    type: "string",
  },
} satisfies Meta<DaikinCarouselItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCarouselItemStoryArgs>;
