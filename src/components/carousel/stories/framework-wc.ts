import "#package/components/carousel-item/daikin-carousel-item";
import "#package/components/carousel/daikin-carousel";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { repeat } from "lit/directives/repeat.js";
import "../../../storybook-tailwind.css";
import { CAROUSEL_ITEM_STYLE, type DaikinCarouselStoryArgs } from "./common";

export const metadata: Meta<DaikinCarouselStoryArgs> = {
  render: ({ duration, currentIndex, onSelect }) => html`
    <div class="w-[640px]">
      <daikin-carousel
        current-index=${currentIndex}
        @select=${onSelect}
        style=${ifDefined(
          (duration as number | null) != null
            ? `--ddc-transition-duration:${duration}ms`
            : undefined
        )}
      >
        ${repeat(
          [...Array(5).keys()],
          (item) => item,
          (item) =>
            html`<daikin-carousel-item>
              <div slot="image" class=${CAROUSEL_ITEM_STYLE}>
                Carousel image ${item + 1}
              </div>
              <span slot="title">Carousel title ${item + 1}</span>
              <span>Carousel description ${item + 1}</span>
            </daikin-carousel-item>`
        )}
      </daikin-carousel>
    </div>
  `,
};
