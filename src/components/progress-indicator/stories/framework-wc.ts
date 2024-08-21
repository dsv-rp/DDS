import "#package/components/progress-indicator-item/daikin-progress-indicator-item";
import "#package/components/progress-indicator/daikin-progress-indicator";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinProgressIndicatorStoryArgs } from "./common";

export const metadata: Meta<DaikinProgressIndicatorStoryArgs> = {
  render: ({ direction }) => html`
    <daikin-progress-indicator direction=${direction}>
      <daikin-progress-indicator-item status="unfinished">
        Title 1
        <span slot="description">Description 1</span>
      </daikin-progress-indicator-item>
      <daikin-progress-indicator-item status="progress">
        Title 2
        <span slot="description">Description 2</span>
      </daikin-progress-indicator-item>
      <daikin-progress-indicator-item status="finished">
        Title 3
        <span slot="description">Description 3</span>
      </daikin-progress-indicator-item>
      <daikin-progress-indicator-item status="error">
        Title 4
        <span slot="description">Description 4</span>
      </daikin-progress-indicator-item>
      <daikin-progress-indicator-item status="disabled">
        Title 5
        <span slot="description">Description 5</span>
      </daikin-progress-indicator-item>
    </daikin-progress-indicator>
  `,
};
