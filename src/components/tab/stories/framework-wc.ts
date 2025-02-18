import "#package/components/tab/daikin-tab";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinTabStoryArgs } from "./common";

export const metadata: Meta<DaikinTabStoryArgs> = {
  render: ({ label, sizing, active, disabled, onClick }) => html`
    <daikin-tab
      sizing=${sizing}
      ?active=${active}
      ?disabled=${disabled}
      @click=${onClick}
    >
      ${label}
    </daikin-tab>
  `,
};
