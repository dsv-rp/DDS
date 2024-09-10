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
  },
  type: {
    control: "radio",
    options: ["text", "email", "tel", "search"],
  },
  placeholder: {
    type: "string",
  },
  disabled: {
    type: "boolean",
  },
  readonly: {
    type: "boolean",
  },
  required: {
    type: "boolean",
  },
  name: {
    type: "string",
  },
  maxlength: {
    type: "number",
  },
  autocomplete: {
    type: "string",
  },
  error: {
    type: "boolean",
  },
  leftIcon: {
    type: "string",
  },
  rightIcon: {
    type: "string",
  },
  __vrtArgs__: {
    type: "string",
    control: false,
  },
} satisfies Meta<DaikinTextInputStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextInputStoryArgs>;
