import "#package/components/select/daikin-select";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import type { DaikinSelectStoryArgs } from "./common";

export const metadata: Meta<DaikinSelectStoryArgs> = {
  render: ({ error, required, disabled }) =>
    html`<div style="width:360px;">
      <daikin-select
        ?error=${error}
        ?required=${required}
        ?disabled=${disabled}
      >
        <select name="select">
          <option value="value-1">Option 1</option>
          <option value="value-2">Option 2</option>
          <optgroup label="Group A">
            <option value="value-a-1">Option A-1</option>
            <option value="value-a-2" disabled>Option A-2</option>
            <option value="value-a-3">Option A-3</option>
          </optgroup>
          <optgroup label="Group B" disabled>
            <option value="value-b-1">Option B-1</option>
            <option value="value-b-2">Option B-2</option>
            <option value="value-b-3">Option B-3</option>
          </optgroup>
        </select>
      </daikin-select>
    </div>`,
};
