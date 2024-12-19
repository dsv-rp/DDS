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
});

export const metadata: Meta<DaikinCarouselItemStoryArgs> = {
  component: ({ ...props }: DaikinCarouselItemStoryArgs) => (
    <ReactDaikinCarouselItem {...props}>
      <div className="flex justify-center items-center w-full h-[400px] text-ddt-color-common-text-primary bg-ddt-color-common-disabled">
        {props.label}
      </div>
    </ReactDaikinCarouselItem>
  ),
};
