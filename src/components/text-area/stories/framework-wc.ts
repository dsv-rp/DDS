import "#package/components/text-area/daikin-text-area";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../storybook-tailwind.css";
import type { DaikinTextAreaStoryArgs } from "./common";

export const metadata: Meta<DaikinTextAreaStoryArgs> = {
  render: ({
    placeholder,
    name,
    autocomplete,
    disabled,
    readonly,
    required,
    error,
    resizable,
    onChange,
    onInput,
  }) => html`
    <div style="width:360px;">
      <daikin-text-area
        name=${name}
        placeholder=${ifDefined(placeholder)}
        autocomplete=${ifDefined(autocomplete)}
        ?disabled=${disabled}
        ?readonly=${readonly}
        ?required=${required}
        ?error=${error}
        ?resizable=${resizable}
        @change=${onChange}
        @input=${onInput}
      ></daikin-text-area>
    </div>
  `,
};
