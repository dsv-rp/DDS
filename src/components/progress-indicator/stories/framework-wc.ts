import "#package/components/progress-indicator-item/daikin-progress-indicator-item";
import "#package/components/progress-indicator/daikin-progress-indicator";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { type DaikinProgressIndicatorStoryArgs } from "./common";

export const metadata: Meta<DaikinProgressIndicatorStoryArgs> = {
  render: ({ currentItem }) =>
    html`<daikin-progress-indicator current-item=${currentItem}>
      ${repeat(
        [...Array(3).keys()],
        (index) => index,
        (index) =>
          html`<daikin-progress-indicator-item>
            ${`Progress indicator label ${index + 1}`}
            <span slot="description">
              ${`Progress indicator description ${index + 1}`}
            </span>
          </daikin-progress-indicator-item>`
      )}
    </daikin-progress-indicator>`,
};
