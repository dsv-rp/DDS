import { action } from "@storybook/addon-actions";
import type { Meta } from "@storybook/web-components";
import { html } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import "../daikin-textarea.ts";
import type { DaikinTextareaStoryArgs } from "./common.ts";

const meta = {
  title: "Components/Textarea",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-textarea
      placeholder=${args.placeholder}
      ?disabled=${args.disabled}
      ?readonly=${args.readonly}
      maxlength=${ifDefined(args.maxlength)}
      ?error=${args.error}
      @change=${action("change")}
      @input=${action("input")}
      @keydown=${action("keydown")}
    ></daikin-textarea>
  `,
  argTypes: {
    placeholder: {
      description: "Placeholder text",
      type: "string",
    },
    disabled: {
      description: "Whether the field is disabled",
      defaultValue: false,
      type: "boolean",
    },
    readonly: {
      description: "Whether the field is readonly",
      defaultValue: false,
      type: "boolean",
    },
    maxlength: {
      description: "Maximum length in field values",
      type: "number",
    },
    error: {
      description: "Error state. Ignored if the `disabled` is `true`.",
      defaultValue: false,
      type: "boolean",
    },
  },
} satisfies Meta<DaikinTextareaStoryArgs>;

export default meta;

export { Default } from "./common.ts";
