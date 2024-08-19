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
  }) => html`
    <div
      style=${`--vrt-width:${
        vrtArgs === "resizeLarge"
          ? "800px"
          : vrtArgs === "resizeSmall"
            ? "160px"
            : "340px"
      }`}
      class=${"[&>daikin-text-input]:w-[--vrt-width]"}
    >
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
  `,
};
