import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinInputGroup } from "../daikin-input-group";

export interface DaikinInputGroupStoryArgs
  extends Required<ElementProps<DaikinInputGroup>> {
  __vrtContent__: "TextInput" | "Textarea";
  onChange: () => void;
  onInput: () => void;
  onKeyDown: () => void;
}

export const DAIKIN_INPUT_GROUP_ARG_TYPES = {
  label: {
    type: "string",
  },
  helper: {
    type: "string",
  },
  disabled: {
    type: "boolean",
  },
  required: {
    type: "boolean",
  },
  error: {
    type: "string",
  },
  textareaCounter: {
    type: "boolean",
  },
  __vrtContent__: {
    control: "select",
    options: ["TextInput", "Textarea"],
  },
} satisfies Meta<DaikinInputGroupStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinInputGroupStoryArgs>;
