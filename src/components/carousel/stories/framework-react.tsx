import { DaikinCarousel } from "#package/components/carousel/daikin-carousel";
import { createComponent, type EventName } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import "../../../storybook-tailwind.css";
import { ReactDaikinCarouselItem } from "../../carousel-item/stories/framework-react";
import type { DaikinCarouselStoryArgs } from "./common";

const ReactDaikinCarousel = createComponent({
  tagName: "daikin-carousel",
  elementClass: DaikinCarousel,
  react: React,
  events: {
    onCarouselClick: "carousel-click",
    onSelect: "select" as EventName<
      CustomEvent<{
        beforeCurrentIndex: number;
        operation: "prev" | "next" | "indicator";
      }>
    >,
  },
});

export const metadata: Meta<DaikinCarouselStoryArgs> = {
  component: ({ onCarouselClick, ...props }: DaikinCarouselStoryArgs) => (
    <div className="w-[640px]">
      <ReactDaikinCarousel {...props}>
        {[...Array(5).keys()].map((item) => (
          <ReactDaikinCarouselItem key={item} onCarouselClick={onCarouselClick}>
            <div className="flex justify-center items-center w-full h-[400px] bg-ddt-color-common-disabled">
              Carousel item {item + 1}
            </div>
          </ReactDaikinCarouselItem>
        ))}
      </ReactDaikinCarousel>
    </div>
  ),
};
