import "#package/components/toggle/daikin-toggle";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinToggleStoryArgs } from "./common";

export const metadata: Meta<DaikinToggleStoryArgs> = {
  render: ({ disabled, size, toggled, onChange, onClick }) => html`
    <daikin-toggle
      ?disabled=${disabled}
      size=${size}
      ?toggled=${toggled}
      @change=${onChange}
      @click=${onClick}
    >
    </daikin-toggle>
  `,
};
