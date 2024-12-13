import "#package/components/carousel-item/daikin-carousel-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import "../../../storybook-tailwind.css";
import type { DaikinCarouselItemStoryArgs } from "./common";

export const metadata: Meta<DaikinCarouselItemStoryArgs> = {
  render: ({ label, onCarouselClick }) =>
    html`<daikin-carousel-item
      label=${label}
      @carousel-click=${onCarouselClick}
    >
      <div
        class="flex justify-center items-center w-full h-[400px] text-ddt-color-common-text-primary bg-ddt-color-common-disabled"
      >
        ${label}
      </div>
    </daikin-carousel-item>`,
};
