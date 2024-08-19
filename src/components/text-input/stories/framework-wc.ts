import "#package/components/text-input/daikin-text-input";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../storybook-tailwind.css";
import type { DaikinTextInputStoryArgs } from "./common";

export const metadata: Meta<DaikinTextInputStoryArgs> = {
  render: ({
    value,
    type,
    placeholder,
    name,
    maxlength,
    autocomplete,
    disabled,
    readonly,
    error,
    vrtArgs,
    onChange,
    onInput,
    onKeyDown,
  }) => {
    const additionalClassNames = {
      "": "",
      resizeLarge:
        "[&>daikin-text-input]:w-[800px] [&>daikin-text-input]:h-[300px]",
      resizeSmall:
        "[&>daikin-text-input]:w-[100px] [&>daikin-text-input]:h-[30px]",
    }[vrtArgs ?? ""];

    return html`
      <div class=${additionalClassNames}>
        <daikin-text-input
          value=${value}
          type=${type}
          placeholder=${placeholder}
          name=${ifDefined(name)}
          maxlength=${ifDefined(maxlength)}
          autocomplete=${ifDefined(autocomplete)}
          ?disabled=${disabled}
          ?readonly=${readonly}
          ?error=${error}
          @change=${onChange}
          @input=${onInput}
          @keydown=${onKeyDown}
        ></daikin-text-input>
      </div>
    `;
  },
};
