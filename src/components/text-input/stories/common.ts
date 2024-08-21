import type { DaikinTextInput } from "#package/components/text-input/daikin-text-input";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTextInputStoryArgs
  extends Required<ElementProps<DaikinTextInput>> {
  onChange: () => void;
  onInput: () => void;
  onKeyDown: () => void;
}

export const DAIKIN_TEXT_INPUT_ARG_TYPES = {
  value: {
    description: "Field value",
    type: "string",
  },
  type: {
    description: "Type of field",
    defaultValue: "text",
    control: { type: "radio" },
    options: ["text", "email", "tel", "search"],
  },
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
  name: {
    description: "Name of the input field control used in the form",
    defaultValue: "Example",
    type: "string",
  },
  maxlength: {
    description: "Maximum length in field values",
    type: "number",
  },
  autocomplete: {
    description: "Specify autocomplete attribute for form",
    type: "string",
  },
  error: {
    description: "Error state. Ignored if the `disabled` is `true`.",
    defaultValue: false,
    type: "boolean",
  },
} satisfies Meta<DaikinTextInputStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextInputStoryArgs>;
