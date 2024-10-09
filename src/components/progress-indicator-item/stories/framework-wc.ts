import "#package/components/progress-indicator-item/daikin-progress-indicator-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinProgressIndicatorItemStoryArgs } from "./common";

export const metadata: Meta<DaikinProgressIndicatorItemStoryArgs> = {
  render: ({ status, direction }) => html`
    <daikin-progress-indicator-item status=${status} direction=${direction}>
      Title
      <span slot="description">Description</span>
    </daikin-progress-indicator-item>
  `,
};
