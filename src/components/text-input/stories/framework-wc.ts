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
        value=${value}
        type=${type}
        placeholder=${placeholder}
        name=${ifDefined(name)}
        maxlength=${ifDefined(maxlength)}
        autocomplete=${ifDefined(autocomplete)}
        .leftIcon=${leftIcon}
        .rightIcon=${rightIcon}
        ?disabled=${disabled}
        ?readonly=${readonly}
        ?error=${error}
        @change=${onChange}
        @input=${onInput}
        @keydown=${onKeyDown}
      ></daikin-text-input>
    `;
  },
};
