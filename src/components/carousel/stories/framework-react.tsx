import { DaikinCarousel } from "#package/components/carousel/daikin-carousel";
import { createComponent, type EventName } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import "../../../storybook-tailwind.css";
import { ReactDaikinCarouselItem } from "../../carousel-item/stories/framework-react";
import { CAROUSEL_ITEM_STYLE, type DaikinCarouselStoryArgs } from "./common";

const ReactDaikinCarousel = createComponent({
  tagName: "daikin-carousel",
  elementClass: DaikinCarousel,
  react: React,
  events: {
    onSelect: "select" as EventName<
      CustomEvent<{
        beforeCurrentIndex: number;
        operation: "prev" | "next" | "indicator";
      }>
    >,
  },
});

export const metadata: Meta<DaikinCarouselStoryArgs> = {
  component: ({ duration, ...props }: DaikinCarouselStoryArgs) => (
    <div className="w-[640px]">
      <ReactDaikinCarousel
        {...props}
        {...((duration as number | null) != null && {
          style: {
            ["--ddc-transition-duration" as string]: `${duration}ms`,
          },
        })}
      >
        {[...Array(5).keys()].map((item) => (
          <ReactDaikinCarouselItem key={item}>
            <div slot="image" className={CAROUSEL_ITEM_STYLE}>
              Carousel image {item + 1}
            </div>
            <span slot="title">Carousel title {item + 1}</span>
            <span>Carousel description {item + 1}</span>
          </ReactDaikinCarouselItem>
        ))}
      </ReactDaikinCarousel>
    </div>
  ),
};
