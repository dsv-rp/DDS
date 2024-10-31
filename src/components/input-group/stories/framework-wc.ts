import "#package/components/input-group/daikin-input-group";
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
        ${content === "TextField"
          ? html`<daikin-text-field
              value="Value"
              placeholder="Placeholder text"
            ></daikin-text-field>`
          : nothing}
        ${content === "TextArea"
          ? html`<daikin-text-area
              value="Value"
              placeholder="Placeholder text"
            ></daikin-text-area>`
          : nothing}
      </daikin-input-group>
    </div>
  `,
};
