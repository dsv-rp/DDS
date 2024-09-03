import "#package/components/text-input/daikin-text-input";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../storybook-tailwind.css";
import type { DaikinTextInputStoryArgs } from "./common";

export const metadata: Meta<DaikinTextInputStoryArgs> = {
  render: ({
    type,
    value,
    name,
    placeholder,
    maxlength,
    autocomplete,
    disabled,
    readonly,
    error,
    leftIcon,
    rightIcon,
    __vrtArgs__,
    onChange,
    onInput,
    onKeyDown,
  }) => {
    const additionalClassNames = {
      "": "",
      resizeLarge: "w-[800px] h-[320px]",
      resizeSmall: "w-[160px] h-[40px]",
    }[__vrtArgs__];

    return html`
      <daikin-text-input
        class=${additionalClassNames}
        type=${type}
        value=${value}
        name=${ifDefined(name)}
        placeholder=${placeholder}
        maxlength=${ifDefined(maxlength)}
        autocomplete=${ifDefined(autocomplete)}
        ?disabled=${disabled}
        ?readonly=${readonly}
        ?error=${error}
        .leftIcon=${leftIcon}
        .rightIcon=${rightIcon}
        @change=${onChange}
        @input=${onInput}
        @keydown=${onKeyDown}
      ></daikin-text-input>
    `;
  },
};
