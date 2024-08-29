import "#package/components/input-group/daikin-input-group";
import "#package/components/text-input/daikin-text-input";
import "#package/components/textarea/daikin-textarea";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinInputGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinInputGroupStoryArgs> = {
  render: ({
    label,
    helper,
    error,
    disabled,
    required,
    textareaCounter,
    __vrtContent__,
  }) => html`
    <daikin-input-group
      label=${ifDefined(label)}
      helper=${ifDefined(helper)}
      error=${ifDefined(error)}
      ?disabled=${disabled}
      ?required=${required}
      ?textareaCounter=${textareaCounter}
    >
      <!-- value="Value" -->
      ${__vrtContent__ === "TextInput"
        ? html`<daikin-text-input
            placeholder="Placeholder text"
          ></daikin-text-input>`
        : null}
      ${__vrtContent__ === "Textarea"
        ? html`<daikin-textarea
            value="Value"
            placeholder="Placeholder text"
          ></daikin-textarea>`
        : null}
    </daikin-input-group>
  `,
};
