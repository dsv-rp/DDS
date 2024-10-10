import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { IconType } from "../../icon/daikin-icon";
import type { DaikinTextInput } from "../daikin-text-input";

export interface DaikinTextInputStoryArgs
  extends Required<ElementProps<DaikinTextInput>> {
  leftIcon: IconType | null;
  rightIcon: IconType | null;
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
    options: ["text", "email", "tel"],
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
} satisfies Meta<DaikinTextInputStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextInputStoryArgs>;
