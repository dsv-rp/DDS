import type { Meta } from "@storybook/web-components";
import { html } from "lit";

import { ifDefined } from "lit/directives/if-defined.js";
import "../../text-input/daikin-text-input.ts";
import "../daikin-input-group.ts";
import type { DaikinInputGroupStoryArgs } from "./common.ts";

const meta = {
  title: "Components/Input Group",
  tags: ["autodocs"],
  render: (args) => html`
    <daikin-input-group
      label=${ifDefined(args.label)}
      helper=${ifDefined(args.helper)}
      ?disabled=${args.disabled}
      ?required=${args.required}
      error=${ifDefined(args.error)}
    >
      <daikin-text-input value="Value"></daikin-text-input>
    </daikin-input-group>
  `,
  argTypes: {
    label: {
      description: "Label text to place at the top of the field",
      type: "string",
    },
    helper: {
      description: "Helper text to place at the bottom of the field",
      type: "string",
    },
    disabled: {
      description:
        "Whether the field is disabled. Reflected in the `disabled` property of the input in the slot.",
      defaultValue: false,
      type: "boolean",
    },
    required: {
      description:
        "Whether the field is required. An additional star mark will be added if `true`.",
      defaultValue: false,
      type: "boolean",
    },
    error: {
      description:
        "Error text to place at the bottom of the field. If specified, sets the `error` property of the element in the slot to `true`. Ignored if the `disabled` is `true`.",
      type: "string",
    },
  },
} satisfies Meta<DaikinInputGroupStoryArgs>;

export default meta;

export { Default } from "./common.ts";
