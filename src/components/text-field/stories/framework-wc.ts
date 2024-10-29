import "#package/components/icon/daikin-icon";
import "#package/components/text-field/daikin-text-field";
import type { Meta } from "@storybook/web-components";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../storybook-tailwind.css";
import type { DaikinTextFieldStoryArgs } from "./common";

export const metadata: Meta<DaikinTextFieldStoryArgs> = {
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
      <daikin-text-field
        type=${type}
        value=${value}
        name=${ifDefined(name)}
        placeholder=${placeholder}
        maxlength=${ifDefined(maxlength)}
        autocomplete=${ifDefined(autocomplete)}
        ?disabled=${disabled}
        ?readonly=${readonly}
        ?required=${required}
        ?error=${error}
        @change=${onChange}
        @input=${onInput}
        @keydown=${onKeyDown}
      >
        ${leftIcon
          ? html`<daikin-icon
              slot="left-icon"
              icon=${leftIcon}
              size="xl"
              color="current"
            ></daikin-icon>`
          : nothing}
        ${rightIcon
          ? html`<daikin-icon
              slot="right-icon"
              icon=${rightIcon}
              size="xl"
              color="current"
            ></daikin-icon>`
          : nothing}
      </daikin-text-field>
    </div>
  `,
};
