import "#package/components/carousel-item/daikin-carousel-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import "../../../storybook-tailwind.css";
import {
  CAROUSEL_ITEM_STYLE,
  type DaikinCarouselItemStoryArgs,
} from "./common";

export const metadata: Meta<DaikinCarouselItemStoryArgs> = {
  render: ({ label }) =>
    html`<daikin-carousel-item>
      <a href="https://dsv-rp.github.io/DDS" class=${CAROUSEL_ITEM_STYLE}>
        ${label}
      </a>
    </daikin-carousel-item>`,
};
