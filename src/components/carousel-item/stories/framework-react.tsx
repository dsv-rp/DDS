import { DaikinCarouselItem } from "#package/components/carousel-item/daikin-carousel-item";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import "../../../storybook-tailwind.css";
import type { DaikinCarouselItemStoryArgs } from "./common";

export const ReactDaikinCarouselItem = createComponent({
  tagName: "daikin-carousel-item",
  elementClass: DaikinCarouselItem,
  react: React,
  events: {
    onCarouselClick: "carousel-click",
  },
});

export const metadata: Meta<DaikinCarouselItemStoryArgs> = {
  component: ({ ...props }: DaikinCarouselItemStoryArgs) => (
    <ReactDaikinCarouselItem {...props}>
      <div className="flex justify-center items-center w-full h-[400px] text-system-element-text-primary bg-system-state-disabled">
        Carousel item
      </div>
    </ReactDaikinCarouselItem>
  ),
};
