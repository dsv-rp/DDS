import type { DaikinDatePicker } from "#package/components/date-picker/daikin-date-picker";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinDatePickerStoryArgs
  extends Required<ElementProps<DaikinDatePicker>> {
  onSelect: () => void;
  isVrtSelected: boolean;
}

export const DAIKIN_DATE_PICKER_ARG_TYPES = {
  value: {
    type: "string",
  },
  name: {
    type: "string",
  },
  placeholder: {
    type: "string",
  },
  min: {
    type: "string",
  },
  max: {
    type: "string",
  },
  defaultValue: {
    type: "string",
  },
  readonly: {
    type: "boolean",
  },
  disabled: {
    type: "boolean",
  },
  required: {
    type: "boolean",
  },
  error: {
    type: "boolean",
  },
  open: {
    type: "boolean",
  },
  onSelect: {
    name: "",
  },
  isVrtSelected: {
    name: "",
    type: "boolean",
  },
} as const satisfies Meta<DaikinDatePickerStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinDatePickerStoryArgs>;
