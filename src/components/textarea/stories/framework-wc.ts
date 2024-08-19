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
  }) => html`
    <div
      style=${`--vrt-width:${
        vrtArgs === "resizeLarge"
          ? "800px"
          : vrtArgs === "resizeSmall"
            ? "160px"
            : "340px"
      }`}
      class=${`[&>daikin-textarea]:w-[--vrt-width]`}
    >
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
  `,
};
