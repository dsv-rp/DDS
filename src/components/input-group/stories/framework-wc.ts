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
    disabled,
    required,
    error,
    textareaMaxCount,
    content,
  }) => {
    const inputContent = {
      TextInput: html`<daikin-text-input
        value="Value"
        placeholder="Placeholder text"
      ></daikin-text-input>`,
      Textarea: html`<daikin-textarea
        value="Value"
        placeholder="Placeholder text"
      ></daikin-textarea>`,
    }[content];

    return html`
      <div style="width:360px;">
        <daikin-input-group
          label=${ifDefined(label)}
          helper=${ifDefined(helper)}
          ?disabled=${disabled}
          ?required=${required}
          error=${ifDefined(error)}
          textarea-max-count=${ifDefined(textareaMaxCount)}
        >
          ${inputContent}
        </daikin-input-group>
      </div>
    `;
  },
};
