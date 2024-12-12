import "#package/components/carousel-item/daikin-carousel-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import "../../../storybook-tailwind.css";
import type { DaikinCarouselItemStoryArgs } from "./common";

export const metadata: Meta<DaikinCarouselItemStoryArgs> = {
  render: ({ onCarouselClick }) =>
    html`<daikin-carousel-item @carousel-click=${onCarouselClick}>
      <div
        class="flex justify-center items-center w-full h-[400px] text-system-element-text-primary bg-system-state-disabled"
      >
        Carousel item
      </div>
    </daikin-carousel-item>`,
};
