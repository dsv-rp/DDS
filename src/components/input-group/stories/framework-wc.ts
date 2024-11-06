import "#package/components/dropdown-item/daikin-dropdown-item";
import "#package/components/dropdown/daikin-dropdown";
import "#package/components/input-group/daikin-input-group";
import "#package/components/select/daikin-select";
import "#package/components/text-area/daikin-text-area";
import "#package/components/text-field/daikin-text-field";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinInputGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinInputGroupStoryArgs> = {
  render: ({
    label,
    helper,
    required,
    error,
    disabled,
    textareaMaxCount,
    content,
  }) => html`
    <div style="width:360px;">
      <daikin-input-group
        label=${ifDefined(label)}
        helper=${ifDefined(helper)}
        required=${ifDefined(required)}
        error=${ifDefined(error)}
        ?disabled=${disabled}
        textarea-max-count=${ifDefined(textareaMaxCount)}
      >
        ${content === "Dropdown"
          ? html`<daikin-dropdown placeholder="Choose an Option">
              <daikin-dropdown-item value="value1">
                Dropdown item 1
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value2">
                Dropdown item 2
              </daikin-dropdown-item>
              <daikin-dropdown-item value="value3">
                Dropdown item 3
              </daikin-dropdown-item>
            </daikin-dropdown>`
          : nothing}
        ${content === "Select"
          ? html`<daikin-select>
              <select name="select">
                <option value="value1">Option 1</option>
                <option value="value2">Option 2</option>
                <option value="value3">Option 3</option>
              </select>
            </daikin-select>`
          : nothing}
        ${content === "TextArea"
          ? html`<daikin-text-area
              value="Value"
              placeholder="Placeholder text"
            ></daikin-text-area>`
          : nothing}
        ${content === "TextField"
          ? html`<daikin-text-field
              value="Value"
              placeholder="Placeholder text"
            ></daikin-text-field>`
          : nothing}
      </daikin-input-group>
    </div>
  `,
};
