import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinTextInput } from "../daikin-text-input";

export interface DaikinTextInputStoryArgs
  extends Required<ElementProps<DaikinTextInput>> {
  __vrtArgs__: "resizeSmall" | "resizeLarge" | "";
  onChange: (event: Event) => void;
  onInput: (event: Event) => void;
  onKeyDown: (event: Event) => void;
}

export const DAIKIN_TEXT_INPUT_ARG_TYPES = {
  value: {
    type: "string",
    description: "Field value",
  },
  type: {
    options: ["text", "email", "tel", "search"],
    control: "radio",
    defaultValue: "text",
    description: "Type of field",
  },
  placeholder: {
    type: "string",
    description: "Placeholder text",
  },
  disabled: {
    type: "boolean",
    defaultValue: false,
    description: "Whether the field is disabled",
  },
  readonly: {
    type: "boolean",
    defaultValue: false,
    description: "Whether the field is readonly",
  },
  name: {
    type: "string",
    defaultValue: "Example",
    description: "Name of the input field control used in the form",
  },
  maxlength: {
    type: "number",
    description: "Maximum length in field values",
  },
  autocomplete: {
    type: "string",
    description: "Specify autocomplete attribute for form",
  },
  error: {
    type: "boolean",
    defaultValue: false,
    description: "Error state. Ignored if the `disabled` is `true`.",
  },
  __vrtArgs__: {
    name: "",
    type: "string",
    control: false,
    defaultValue: "",
    description: "Custom arguments for the Visual Regression Test.",
  },
  // Hide event listeners
  onChange: { name: "" },
  onInput: { name: "" },
} satisfies Meta<DaikinTextInputStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextInputStoryArgs>;
