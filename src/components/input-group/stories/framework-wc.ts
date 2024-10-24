import "#package/components/input-group/daikin-input-group";
import "#package/components/select/daikin-select";
import "#package/components/text-input/daikin-text-input";
import "#package/components/textarea/daikin-textarea";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../storybook-tailwind.css";
import type { DaikinInputGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinInputGroupStoryArgs> = {
  render: ({
    content,
    label,
    helper,
    error,
    disabled,
    required,
    textareaCounter,
  }) => html`
    <daikin-input-group
      label=${ifDefined(label)}
      helper=${ifDefined(helper)}
      error=${ifDefined(error)}
      ?disabled=${disabled}
      ?required=${required}
      ?textareaCounter=${textareaCounter}
    >
      ${content === "TextInput"
        ? html`<daikin-text-input value="Value"></daikin-text-input>`
        : null}
      ${content === "Textarea"
        ? html`<daikin-textarea
            value="Value"
            placeholder="Placeholder text"
          ></daikin-textarea>`
        : null}
      ${content === "Select"
        ? html`<daikin-select class="w-[360px]">
            <select name="select">
              <option value="value1">Option 1</option>
              <option value="value2">Option 2</option>
              <option value="value3">Option 3</option>
            </select>
          </daikin-select>`
        : nothing}
    </daikin-input-group>
  `,
};
