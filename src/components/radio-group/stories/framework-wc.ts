import "#package/components/input-group/daikin-input-group";
import "#package/components/radio-group/daikin-radio-group";
import "#package/components/radio/daikin-radio";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinRadioGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinRadioGroupStoryArgs> = {
  render: ({ orientation, name, value, onChange, onClick }) => html`
    <daikin-input-group
      label="Label text"
      helper="Helper text"
      required="required"
    >
      <daikin-radio-group
        orientation=${orientation}
        name=${name}
        value=${value}
        @change=${onChange}
        @click=${onClick}
      >
        <daikin-radio value="value1" label="Option1"></daikin-radio>
        <daikin-radio value="value2" label="Option2"></daikin-radio>
        <daikin-radio value="value3" label="Option3"></daikin-radio>
      </daikin-radio-group>
    </daikin-input-group>
  `,
};