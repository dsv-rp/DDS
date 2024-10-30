import "#package/components/dropdown-item/daikin-dropdown-item";
import "#package/components/dropdown/daikin-dropdown";
import "#package/components/input-group/daikin-input-group";
import "#package/components/text-field/daikin-text-field";
import "#package/components/textarea/daikin-textarea";
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
    textareaCounter,
    content,
  }) => html`
    <div style="width:360px;">
      <daikin-input-group
        label=${ifDefined(label)}
        helper=${ifDefined(helper)}
        required=${ifDefined(required)}
        error=${ifDefined(error)}
        ?disabled=${disabled}
        ?textareaCounter=${textareaCounter}
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
        ${content === "TextField"
          ? html`<daikin-text-field value="Value"></daikin-text-field>`
          : nothing}
        ${content === "Textarea"
          ? html`<daikin-textarea
              value="Value"
              placeholder="Placeholder text"
            ></daikin-textarea>`
          : nothing}
      </daikin-input-group>
    </div>
  `,
};
