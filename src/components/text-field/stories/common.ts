import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { IconType } from "../../icon/daikin-icon";
import type { DaikinTextField } from "../daikin-text-field";

export interface DaikinTextFieldStoryArgs
  extends Required<ElementProps<DaikinTextField>> {
  leftIcon: IconType | null;
  rightIcon: IconType | null;
  onChange: (event: Event) => void;
  onInput: (event: Event) => void;
  onKeyDown: (event: Event) => void;
}

export const DAIKIN_TEXT_FIELD_ARG_TYPES = {
  value: {
    type: "string",
  },
  name: {
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
  // Hide event listeners
  onChange: { name: "" },
  onInput: { name: "" },
} satisfies Meta<DaikinTextFieldStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextFieldStoryArgs>;
