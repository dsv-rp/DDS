import "#package/components/icon/daikin-icon";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinIconStoryArgs } from "./common";

export const metadata: Meta<DaikinIconStoryArgs> = {
  render: ({ icon, color, size }) => html`
    <div style="color:#0097e0; width:240px; height:240px;">
      <daikin-icon
        icon=${ifDefined(icon ?? undefined)}
        color=${color}
        size=${size}
      ></daikin-icon>
    </div>
  `,
};
