import "#package/components/carousel-item/daikin-carousel-item";
import "#package/components/carousel/daikin-carousel";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import "../../../storybook-tailwind.css";
import type { DaikinCarouselStoryArgs } from "./common";

export const metadata: Meta<DaikinCarouselStoryArgs> = {
  render: ({
    animation,
    duration,
    currentIndex,
    allowSwipe,
    controlButtonVariant,
    onClick,
    onKeyDown,
    onSelect,
  }) => html`
    <div class="w-[640px]">
      <daikin-carousel
        animation=${animation}
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
            html`<daikin-carousel-item @click=${onClick} @keydown=${onKeyDown}>
              <button
                class="flex justify-center items-center w-full h-[400px] bg-ddt-color-common-disabled"
              >
                Carousel item ${item + 1}
              </button>
            </daikin-carousel-item>`
        )}
      </daikin-carousel>
    </div>
  `,
};
