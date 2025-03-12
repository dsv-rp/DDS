import type { IconType } from "#package/components/icon/daikin-icon";
import type { DaikinTextField } from "#package/components/text-field/daikin-text-field";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTextFieldStoryArgs
  extends Required<ElementProps<DaikinTextField>> {
  leftIcon: IconType | null;
  rightIcon: IconType | null;
  onChange: (event: Event) => void;
  onInput: (event: Event) => void;
  onKeyDown: (event: Event) => void;
  onSearch: (event: Event) => void;
  onShow: (event: Event) => void;
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
    options: ["text", "password", "email", "tel", "search"],
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
  minlength: {
    type: "number",
  },
  maxlength: {
    type: "number",
  },
  pattern: {
    type: "string",
  },
  autocomplete: {
    type: "string",
  },
  error: {
    type: "boolean",
  },
  showPassword: {
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
  onKeyDown: { name: "" },
  onSearch: { name: "" },
  onShow: { name: "" },
} satisfies Meta<DaikinTextFieldStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextFieldStoryArgs>;
