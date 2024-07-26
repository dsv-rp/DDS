import "#package/components/icon/daikin-icon";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinIconStoryArgs } from "./common";

export const metadata: Meta<DaikinIconStoryArgs> = {
  render: ({ icon, color, size }) => html`
    <div style="color:#0097e0;">
      <daikin-icon .icon=${icon} color=${color} size=${size}></daikin-icon>
    </div>
  `,
};
