import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinTextarea } from "../daikin-textarea";

export interface DaikinTextareaStoryArgs
  extends Required<ElementProps<DaikinTextarea>> {
  onChange: () => void;
  onInput: () => void;
}

export const DAIKIN_TEXTAREA_ARG_TYPES = {
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
} satisfies Meta<DaikinTextareaStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextareaStoryArgs>;
