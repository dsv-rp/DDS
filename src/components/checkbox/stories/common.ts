import type { DaikinCheckbox } from "#package/components/checkbox/daikin-checkbox";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinCheckboxStoryArgs = Required<ElementProps<DaikinCheckbox>>;

export const DAIKIN_CHECKBOX_ARG_TYPES = {
  size: {
    control: { type: "select" },
    options: ["small", "large"],
  },
  checkState: {
    control: { type: "select" },
    options: ["unchecked", "indeterminate", "checked"],
  },
  disabled: { type: "boolean" },
  labelPosition: { type: "string" },
  readonly: { type: "boolean" },
  label: {
    type: "string",
  },
  name: { type: "string" },
  value: { type: "string" },
} as const satisfies Meta<DaikinCheckboxStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCheckboxStoryArgs>;
