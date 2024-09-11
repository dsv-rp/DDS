import "#package/components/dropdown-item/daikin-dropdown-item";
import "#package/components/dropdown/daikin-dropdown";
import "#package/components/input-group/daikin-input-group";
import "#package/components/text-input/daikin-text-input";
import "#package/components/textarea/daikin-textarea";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
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
      ?textarea-counter=${textareaCounter}
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
    </daikin-input-group>
  `,
};
