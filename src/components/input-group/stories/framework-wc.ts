import "#package/components/input-group/daikin-input-group";
import "#package/components/text-input/daikin-text-input";
import "#package/components/textarea/daikin-textarea";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinInputGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinInputGroupStoryArgs> = {
  render: ({
    label,
    helper,
    disabled,
    required,
    error,
    textareaCounter,
    __vrtContent__,
  }) => html`
    <daikin-input-group
      label=${ifDefined(label)}
      helper=${ifDefined(helper)}
      ?disabled=${disabled}
      ?required=${required}
      error=${ifDefined(error)}
      ?textareaCounter=${textareaCounter}
    >
      <!-- value="Value" -->
      ${__vrtContent__ === "TextInput"
        ? html`<daikin-text-input
            value="Value"
            placeholder="Placeholder text"
          ></daikin-text-input>`
        : nothing}
      ${__vrtContent__ === "Textarea"
        ? html`<daikin-textarea
            value="Value"
            placeholder="Placeholder text"
          ></daikin-textarea>`
        : nothing}
    </daikin-input-group>
  `,
};
