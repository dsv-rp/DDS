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
    __vrtArgs__,
    onChange,
    onInput,
  }) => {
    const additionalClassNames = {
      "": "",
      resizeLarge: "w-[800px] h-[320px]",
      resizeSmall: "w-[160px] h-[40px]",
    }[__vrtArgs__];

    return html`
      <daikin-textarea
        class=${additionalClassNames}
        ?disabled=${disabled}
        ?readonly=${readonly}
        ?error=${error}
        placeholder=${placeholder}
        maxlength=${ifDefined(maxlength)}
        @change=${onChange}
        @input=${onInput}
      ></daikin-textarea>
    `;
  },
};
