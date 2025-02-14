import "#package/components/progress-indicator-item/daikin-progress-indicator-item";
import "#package/components/progress-indicator/daikin-progress-indicator";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import {
  progressIndicatorLabel,
  type DaikinProgressIndicatorStoryArgs,
} from "./common";

export const metadata: Meta<DaikinProgressIndicatorStoryArgs> = {
  render: ({ currentItem }) =>
    html`<daikin-progress-indicator current-item=${currentItem}>
      ${repeat(
        [...Array(3).keys()],
        (index) => index,
        (index) => {
          const label = progressIndicatorLabel(currentItem, index);

          return html`<daikin-progress-indicator-item>
            ${label}
            <span slot="description">${`${label} description`}</span>
          </daikin-progress-indicator-item>`;
        }
      )}
    </daikin-progress-indicator>`,
};
