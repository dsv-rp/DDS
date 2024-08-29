import "#package/components/radio/daikin-radio";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinRadioStoryArgs } from "./common";

export const metadata: Meta<DaikinRadioStoryArgs> = {
  render: ({
    name,
    value,
    label,
    labelPosition,
    checked,
    disabled,
    onChange,
    onClick,
  }) => html`
    <daikin-radio
      name=${name}
      value=${value}
      label=${label}
      label-position=${labelPosition}
      ?checked=${checked}
      ?disabled=${disabled}
      @change=${onChange}
      @click=${onClick}
    ></daikin-radio>
  `,
};
