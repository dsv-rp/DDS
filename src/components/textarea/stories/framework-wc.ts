import "#package/components/textarea/daikin-textarea";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { DaikinTextareaStoryArgs } from "./common";

export const metadata: Meta<DaikinTextareaStoryArgs> = {
  render: ({
    placeholder,
    maxlength,
    disabled,
    readonly,
    error,
    onChange,
    onInput,
  }) => html`
    <daikin-textarea
      ?disabled=${disabled}
      ?readonly=${readonly}
      ?error=${error}
      placeholder=${placeholder}
      maxlength=${ifDefined(maxlength)}
      @change=${onChange}
      @input=${onInput}
    ></daikin-textarea>
  `,
};
