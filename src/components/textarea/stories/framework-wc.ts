import "#package/components/textarea/daikin-textarea";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import "../../../storybook-tailwind.css";
import type { DaikinTextareaStoryArgs } from "./common";

export const metadata: Meta<DaikinTextareaStoryArgs> = {
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
    onChangeCount,
  }) => html`
    <div style="width:360px;">
      <daikin-textarea
        placeholder=${placeholder}
        name=${name}
        autocomplete=${ifDefined(autocomplete)}
        ?disabled=${disabled}
        ?readonly=${readonly}
        ?required=${required}
        ?error=${error}
        ?resizable=${resizable}
        @change=${onChange}
        @input=${onInput}
        @change-count=${onChangeCount}
      ></daikin-textarea>
    </div>
  `,
};
