import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinTextarea } from "../daikin-textarea";

export interface DaikinTextareaStoryArgs
  extends Required<ElementProps<DaikinTextarea>> {
  onChange: (event: Event) => void;
  onInput: (event: Event) => void;
  onChangeCount: (event: CustomEvent<{ count: number }>) => void;
}

export const DAIKIN_TEXTAREA_ARG_TYPES = {
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
  error: {
    type: "boolean",
  },
  autocomplete: {
    type: "string",
  },
  resizable: {
    type: "boolean",
  },
} satisfies Meta<DaikinTextareaStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextareaStoryArgs>;
