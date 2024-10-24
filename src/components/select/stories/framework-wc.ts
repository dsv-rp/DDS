import "#package/components/select/daikin-select";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinSelectStoryArgs } from "./common";

export const metadata: Meta<DaikinSelectStoryArgs> = {
  render: ({ error, disabled }) =>
    html`<div style="width:360px;">
      <daikin-select ?error=${error} ?disabled=${disabled}>
        <select name="select" ?disabled=${disabled}>
          <option value="value1">Option 1</option>
          <option value="value2">Option 2</option>
          <option value="value3">Option 3</option>
          <option value="value4" disabled>Option 4</option>
          <option value="value5">Option 5</option>
        </select>
      </daikin-select>
    </div>`,
};
