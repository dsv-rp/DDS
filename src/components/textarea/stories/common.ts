import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinTextarea } from "../daikin-textarea";

export interface DaikinTextareaStoryArgs
  extends Required<ElementProps<DaikinTextarea>> {
  __vrtArgs__: "resizeSmall" | "resizeLarge" | "";
  onChange: (event: Event) => void;
  onInput: (event: Event) => void;
}

export const DAIKIN_TEXTAREA_ARG_TYPES = {
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
  maxlength: {
    type: "number",
    description: "Maximum length in field values",
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
} satisfies Meta<DaikinTextareaStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextareaStoryArgs>;
