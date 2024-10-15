import "#package/components/progress-indicator-item/daikin-progress-indicator-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinProgressIndicatorItemStoryArgs } from "./common";

export const metadata: Meta<DaikinProgressIndicatorItemStoryArgs> = {
  render: ({ status }) => html`
    <daikin-progress-indicator-item status=${status}>
      Progress indicator label
      <span slot="description">Progress indicator description</span>
    </daikin-progress-indicator-item>
  `,
};
