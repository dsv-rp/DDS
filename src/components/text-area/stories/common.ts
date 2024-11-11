import type { DaikinTextArea } from "#package/components/text-area/daikin-text-area";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinTextAreaStoryArgs
  extends Required<ElementProps<DaikinTextArea>> {
  onChange: (event: Event) => void;
  onInput: (event: Event) => void;
}

export const DAIKIN_TEXT_AREA_ARG_TYPES = {
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
  // Hide event listeners
  onChange: { name: "" },
  onInput: { name: "" },
} satisfies Meta<DaikinTextAreaStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextAreaStoryArgs>;
