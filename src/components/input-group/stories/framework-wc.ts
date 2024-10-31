import "#package/components/input-group/daikin-input-group";
import "#package/components/select/daikin-select";
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
        ${content === "TextField"
          ? html`<daikin-text-field value="Value"></daikin-text-field>`
          : nothing}
        ${content === "Textarea"
          ? html`<daikin-textarea
              value="Value"
              placeholder="Placeholder text"
            ></daikin-textarea>`
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
      </daikin-input-group>
    </div>
  `,
};
