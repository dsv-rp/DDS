import "#package/components/checkbox-group/daikin-checkbox-group";
import "#package/components/checkbox/daikin-checkbox";
import "#package/components/input-group/daikin-input-group";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinCheckboxGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinCheckboxGroupStoryArgs> = {
  render: ({ orientation, disabled }) =>
    html`<daikin-checkbox-group
      orientation=${orientation}
      ?disabled=${disabled}
    >
      <daikin-checkbox
        name="name1"
        value="value1"
        label="Checkbox Item 1"
      ></daikin-checkbox>
      <daikin-checkbox
        name="name2"
        value="value2"
        label="Checkbox Item 2"
      ></daikin-checkbox>
      <daikin-checkbox
        name="name3"
        value="value3"
        label="Checkbox Item 3"
      ></daikin-checkbox>
    </daikin-checkbox-group>`,
};
