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
  component: ({ ...props }: DaikinCarouselStoryArgs) => (
    <div className="w-[640px]">
      <ReactDaikinCarousel {...props}>
        {[...Array(5).keys()].map((item) => (
          <ReactDaikinCarouselItem key={item}>
            <a
              href="https://dsv-rp.github.io/DDS"
              className={CAROUSEL_ITEM_STYLE}
            >
              Carousel item {item + 1}
            </a>
          </ReactDaikinCarouselItem>
        ))}
      </ReactDaikinCarousel>
    </div>
  ),
};
