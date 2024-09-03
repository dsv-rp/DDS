import "#package/components/textarea/daikin-textarea";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";
import "../../../storybook-tailwind.css";
import type { DaikinTextareaStoryArgs } from "./common";

export const metadata: Meta<DaikinTextareaStoryArgs> = {
  render: ({
    placeholder,
    disabled,
    readonly,
    error,
    resizable,
    __vrtArgs__,
    onChange,
    onInput,
    onChangeCount,
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
        ?resizable=${resizable}
        @change=${onChange}
        @input=${onInput}
        @change-count=${onChangeCount}
      ></daikin-textarea>
    `;
  },
};
