import "#package/components/carousel-item/daikin-carousel-item";
import "#package/components/carousel/daikin-carousel";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import "../../../storybook-tailwind.css";
import { CAROUSEL_ITEM_STYLE, type DaikinCarouselStoryArgs } from "./common";

export const metadata: Meta<DaikinCarouselStoryArgs> = {
  render: ({
    duration,
    currentIndex,
    allowSwipe,
    controlButtonVariant,
    onSelect,
  }) => html`
    <div class="w-[640px]">
      <daikin-carousel
        duration=${duration}
        current-index=${currentIndex}
        control-button-variant=${controlButtonVariant}
        ?allow-swipe=${allowSwipe}
        @select=${onSelect}
      >
        ${repeat(
          [...Array(5).keys()],
          (item) => item,
          (item) =>
            html`<daikin-carousel-item>
              <a
                href="https://dsv-rp.github.io/DDS"
                class=${CAROUSEL_ITEM_STYLE}
              >
                Carousel item ${item + 1}
              </a>
            </daikin-carousel-item>`
        )}
      </daikin-carousel>
    </div>
  `,
};
