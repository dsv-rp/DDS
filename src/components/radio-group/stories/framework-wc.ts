import "#package/components/radio-group/daikin-radio-group";
import "#package/components/radio/daikin-radio";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinRadioGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinRadioGroupStoryArgs> = {
  render: ({
    orientation,
    name,
    value,
    label,
    labelPosition,
    disabled,
    onChange,
    onClick,
  }) => html`
    <daikin-radio-group
      orientation=${orientation}
      name=${name}
      value=${value}
      label=${label}
      label-position=${labelPosition}
      ?disabled=${disabled}
      @change=${onChange}
      @click=${onClick}
    >
      <daikin-radio name="name1" value="value1"></daikin-radio>
      <daikin-radio name="name2" value="value2"></daikin-radio>
      <daikin-radio name="name3" value="value3"></daikin-radio>
    </daikin-radio-group>
  `,
};
