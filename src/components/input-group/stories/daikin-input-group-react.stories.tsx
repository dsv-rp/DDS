import type { Meta } from "@storybook/react";
import React from "react";

import "../../text-input";
import { ReactDaikinTextInput } from "../../text-input/stories/react";
import { ReactDaikinTextarea } from "../../textarea/stories/react";
import "../daikin-input-group";
import { DaikinInputGroupStoryArgs } from "./common";
import { ReactDaikinInputGroup } from "./react";

const InputGroup: React.FC<DaikinInputGroupStoryArgs> = ({
  input,
  label,
  helper,
  disabled,
  required,
  error,
}) => {
  return (
    <ReactDaikinInputGroup
      label={label}
      helper={helper}
      disabled={disabled}
      required={required}
      error={error}
    >
      {input === "Text Input" && <ReactDaikinTextInput value="Value" />}
      {input === "Textarea" && <ReactDaikinTextarea />}
    </ReactDaikinInputGroup>
  );
};

const meta = {
  title: "Components/Input Group",
  tags: ["autodocs"],
  component: InputGroup,
  argTypes: {
    input: {
      description:
        "[slot] Components that the Input Group is expected to take.",
      control: { type: "select" },
      options: ["Text Input", "Textarea"],
    },
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

export { Default } from "../../input-group/stories/common";
