import "#package/components/input-group/daikin-input-group";
import "#package/components/text-input/daikin-text-input";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinInputGroupStoryArgs } from "./common";

export const metadata: Meta<DaikinInputGroupStoryArgs> = {
  render: ({ label, helper, error, disabled, required }) => html`
    <daikin-input-group
      label=${ifDefined(label)}
      helper=${ifDefined(helper)}
      error=${ifDefined(error)}
      ?disabled=${disabled}
      ?required=${required}
    >
      <daikin-text-input value="Value"></daikin-text-input>
    </daikin-input-group>
  `,
};
