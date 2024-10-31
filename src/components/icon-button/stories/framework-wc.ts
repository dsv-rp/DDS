import "#package/components/icon-button/daikin-icon-button";
import "#package/components/icon/daikin-icon";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinIconButtonStoryArgs } from "./common";

export const metadata: Meta<DaikinIconButtonStoryArgs> = {
  render: ({ variant, color, disabled, type, icon, onClick }) => html`
    <daikin-icon-button
      variant=${variant}
      color=${color}
      type=${type}
      ?disabled=${disabled}
      @click=${onClick}
    >
      <daikin-icon icon=${icon} size="xl" color="current"></daikin-icon>
    </daikin-icon-button>
  `,
};
