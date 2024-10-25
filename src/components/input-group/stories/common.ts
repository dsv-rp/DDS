import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinInputGroup } from "../daikin-input-group";

export interface DaikinInputGroupStoryArgs
  extends Required<ElementProps<DaikinInputGroup>> {
  content: "TextInput" | "Textarea" | "Dropdown";
  onChange: () => void;
  onInput: () => void;
  onKeyDown: () => void;
}

export const DAIKIN_INPUT_GROUP_ARG_TYPES = {
  content: {
    description: "Slot content to show",
    control: "radio",
    options: ["TextInput", "Textarea", "Dropdown"],
  },
  label: {
    description: "Label text to place at the top of the field",
    type: "string",
  },
  helper: {
    description: "Helper text to place at the bottom of the field",
    type: "string",
  },
  disabled: {
    description:
      "Whether the field is disabled. Reflected in the `disabled` property of the input in the slot.",
    defaultValue: false,
    type: "boolean",
  },
  required: {
    description:
      "Whether the field is required. An additional star mark will be added if `true`.",
    defaultValue: false,
    type: "boolean",
  },
  error: {
    description:
      "Error text to place at the bottom of the field. If specified, sets the `error` property of the element in the slot to `true`. Ignored if the `disabled` is `true`.",
    type: "string",
  },
  textareaCounter: {
    description: "Whether to display the counter in the Textarea",
    defaultValue: false,
    type: "boolean",
  },
} satisfies Meta<DaikinInputGroupStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinInputGroupStoryArgs>;
