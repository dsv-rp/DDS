import "#package/components/carousel-item/daikin-carousel-item";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import "../../../storybook-tailwind.css";
import {
  CAROUSEL_ITEM_STYLE,
  type DaikinCarouselItemStoryArgs,
} from "./common";

export const metadata: Meta<DaikinCarouselItemStoryArgs> = {
  render: ({ image, title, description }) =>
    html`<daikin-carousel-item class="w-[544px]">
      ${image
        ? html`<div slot="image" class=${CAROUSEL_ITEM_STYLE}>${image}</div>`
        : nothing}
      ${title ? html`<span slot="title">${title}</span>` : nothing}
      ${description ? html`<span>${description}</span>` : nothing}
    </daikin-carousel-item>`,
};
