import { action } from "@storybook/addon-actions";
import React from "react";

import type { Meta } from "@storybook/react";

import "../daikin-textarea";
import { DaikinTextareaStoryArgs } from "./common";
import { ReactDaikinTextarea } from "./react";

const Textarea: React.FC<DaikinTextareaStoryArgs> = ({
  placeholder,
  disabled,
  readonly,
  maxlength,
  error,
}) => {
  return (
    <ReactDaikinTextarea
      placeholder={placeholder}
      disabled={disabled}
      readonly={readonly}
      maxlength={maxlength}
      error={error}
      onChange={action("change")}
      onInput={action("input")}
      onKeydown={action("keydown")}
    />
  );
};

const meta = {
  title: "Components/Textarea",
  tags: ["autodocs"],
  component: Textarea,
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

export { Default } from "../../textarea/stories/common";
