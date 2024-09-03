import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";
import type { DaikinTextarea } from "../daikin-textarea";

export interface DaikinTextareaStoryArgs
  extends Required<ElementProps<DaikinTextarea>> {
  __vrtArgs__: "resizeSmall" | "resizeLarge" | "";
  onChange: (event: Event) => void;
  onInput: (event: Event) => void;
  onChangeCount: (event: Event & { detail: { valueCount: number } }) => void;
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
  error: {
    type: "boolean",
  },
  resizable: {
    type: "boolean",
  },
  __vrtArgs__: {
    type: "string",
    control: false,
  },
} satisfies Meta<DaikinTextareaStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinTextareaStoryArgs>;
