import "#package/components/progress-indicator-item/daikin-progress-indicator-item";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinProgressIndicatorItemStoryArgs } from "./common";

export const metadata: Meta<DaikinProgressIndicatorItemStoryArgs> = {
  render: ({ status, label, description }) => html`
    <daikin-progress-indicator-item status=${status}>
      ${label}
      <span slot="description">${description}</span>
    </daikin-progress-indicator-item>
  `,
};
