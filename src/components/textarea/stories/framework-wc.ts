import "#package/components/textarea/daikin-textarea";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../storybook-tailwind.css";
import type { DaikinTextareaStoryArgs } from "./common";

export const metadata: Meta<DaikinTextareaStoryArgs> = {
  render: ({
    placeholder,
    maxlength,
    disabled,
    readonly,
    error,
    vrtArgs,
    onChange,
    onInput,
  }) => {
    const additionalClassNames = {
      "": "",
      resizeLarge:
        "[&>daikin-textarea]:w-[800px] [&>daikin-textarea]:h-[300px]",
      resizeSmall: "[&>daikin-textarea]:w-[100px] [&>daikin-textarea]:h-[30px]",
    }[vrtArgs ?? ""];

    return html`
      <div class=${additionalClassNames}>
        <daikin-textarea
          ?disabled=${disabled}
          ?readonly=${readonly}
          ?error=${error}
          placeholder=${placeholder}
          maxlength=${ifDefined(maxlength)}
          @change=${onChange}
          @input=${onInput}
        ></daikin-textarea>
      </div>
    `;
  },
};
