import "#package/components/input-group/daikin-input-group";
import "#package/components/text-field/daikin-text-field";
import "#package/components/textarea/daikin-textarea";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
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
  }) => {
    const inputContent = {
      TextField: html`<daikin-text-field
        value="Value"
        placeholder="Placeholder text"
      ></daikin-text-field>`,
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
          required=${ifDefined(required)}
          error=${ifDefined(error)}
          ?disabled=${disabled}
          textarea-max-count=${ifDefined(textareaMaxCount)}
        >
          ${inputContent}
        </daikin-input-group>
      </div>
    `;
  },
};
