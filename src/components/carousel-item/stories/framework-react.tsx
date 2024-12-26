import { DaikinCarouselItem } from "#package/components/carousel-item/daikin-carousel-item";
import { createComponent } from "@lit/react";
import type { Meta } from "@storybook/react";
import React from "react";
import "../../../storybook-tailwind.css";
import {
  CAROUSEL_ITEM_STYLE,
  type DaikinCarouselItemStoryArgs,
} from "./common";

export const ReactDaikinCarouselItem = createComponent({
  tagName: "daikin-carousel-item",
  elementClass: DaikinCarouselItem,
  react: React,
});

export const metadata: Meta<DaikinCarouselItemStoryArgs> = {
  component: ({ label, ...props }: DaikinCarouselItemStoryArgs) => (
    <ReactDaikinCarouselItem {...props}>
      <a href="https://dsv-rp.github.io/DDS" className={CAROUSEL_ITEM_STYLE}>
        {label}
      </a>
    </ReactDaikinCarouselItem>
  ),
};
