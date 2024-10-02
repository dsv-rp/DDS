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
    leftIcon,
    rightIcon,
    disabled,
    readonly,
    required,
    error,
    onChange,
    onInput,
    onKeyDown,
  }) => html`
    <div style="width:340px;">
      <daikin-text-input
        type=${type}
        value=${value}
        name=${ifDefined(name)}
        placeholder=${placeholder}
        maxlength=${ifDefined(maxlength)}
        autocomplete=${ifDefined(autocomplete)}
        left-icon=${ifDefined(leftIcon)}
        right-icon=${ifDefined(rightIcon)}
        ?disabled=${disabled}
        ?readonly=${readonly}
        ?required=${required}
        ?error=${error}
        @change=${onChange}
        @input=${onInput}
        @keydown=${onKeyDown}
      ></daikin-text-input>
    </div>
  `,
};
