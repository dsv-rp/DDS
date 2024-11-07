import "#package/components/progress-indicator-item/daikin-progress-indicator-item";
import "#package/components/progress-indicator/daikin-progress-indicator";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinProgressIndicatorStoryArgs } from "./common";

export const metadata: Meta<DaikinProgressIndicatorStoryArgs> = {
  render: ({ currentItem }) => html`
    <daikin-progress-indicator current-item=${ifDefined(currentItem)}>
      <daikin-progress-indicator-item status="finished">
        Finished
        <span slot="description">Finished description</span>
      </daikin-progress-indicator-item>
      <daikin-progress-indicator-item status="inprogress">
        Inprogress
        <span slot="description">Inprogress description</span>
      </daikin-progress-indicator-item>
      <daikin-progress-indicator-item status="unfinished">
        Unfinished
        <span slot="description">Unfinished description</span>
      </daikin-progress-indicator-item>
    </daikin-progress-indicator>
  `,
};
