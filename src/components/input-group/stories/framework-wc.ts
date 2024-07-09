import "#package/components/input-group/daikin-input-group";
import "#package/components/text-input/daikin-text-input";
import "#package/components/textarea/daikin-textarea";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
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
      ?textareaCounter=${textareaCounter}
    >
      ${content === "TextInput"
        ? html`<daikin-text-input value="Value"></daikin-text-input>`
        : null}
      ${content === "Textarea"
        ? html`<daikin-textarea
            placeholder="Placeholder text"
          ></daikin-textarea>`
        : null}
    </daikin-input-group>
  `,
};
