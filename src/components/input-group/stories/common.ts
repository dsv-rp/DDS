import type { DaikinInputGroup } from "#package/components/input-group/daikin-input-group";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinInputGroupStoryArgs
  extends Required<ElementProps<DaikinInputGroup>> {
  content: "Dropdown" | "RadioGroup" | "Select" | "TextField" | "TextArea";
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
    type: "string",
  },
  error: {
    type: "string",
  },
  textareaMaxCount: {
    type: "number",
  },
  content: {
    control: "radio",
    options: ["Dropdown", "RadioGroup", "Select", "TextArea", "TextField"],
    description: "Slot content to show",
  },
} satisfies Meta<DaikinInputGroupStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinInputGroupStoryArgs>;
