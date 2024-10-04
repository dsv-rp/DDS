import "#package/components/toggle/daikin-toggle";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinToggleStoryArgs } from "./common";

export const metadata: Meta<DaikinToggleStoryArgs> = {
  render: ({ name, value, checked, disabled, onChange, onClick }) => html`
    <daikin-toggle
      name=${name}
      value=${value}
      ?checked=${checked}
      ?disabled=${disabled}
      @change=${onChange}
      @click=${onClick}
    >
    </daikin-toggle>
  `,
};
