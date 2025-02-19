import "#package/components/checkbox-group/daikin-checkbox-group";
import "#package/components/checkbox/daikin-checkbox";
import "#package/components/input-group/daikin-input-group";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinCheckboxGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinCheckboxGroupStoryArgs> = {
  render: ({ orientation }) =>
    html`<daikin-checkbox-group orientation=${orientation}>
      <daikin-checkbox
        name="name1"
        value="value1"
        label="Label Text 1"
      ></daikin-checkbox>
      <daikin-checkbox
        name="name2"
        value="value2"
        label="Label Text 2"
      ></daikin-checkbox>
      <daikin-checkbox
        name="name3"
        value="value3"
        label="Label Text 3"
      ></daikin-checkbox>
    </daikin-checkbox-group>`,
};
