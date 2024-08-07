import "#package/components/radio/daikin-radio";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinRadioStoryArgs } from "./common";

export const metadata: Meta<DaikinRadioStoryArgs> = {
  render: ({
    size,
    name,
    value,
    label,
    labelPosition,
    checked,
    disabled,
    readonly,
    onChange,
    onClick,
  }) => html`
    <daikin-radio
      size=${size}
      name=${name}
      value=${value}
      label=${label}
      label-position=${labelPosition}
      ?checked=${checked}
      ?disabled=${disabled}
      ?readonly=${readonly}
      @change=${onChange}
      @click=${onClick}
    ></daikin-radio>
  `,
};
