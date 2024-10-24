import type { DaikinCheckbox } from "#package/components/checkbox/daikin-checkbox";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinCheckboxStoryArgs
  extends Required<ElementProps<DaikinCheckbox>> {
  onChange: (event: Event) => void;
  onClick: (event: Event) => void;
}

export const DAIKIN_CHECKBOX_ARG_TYPES = {
  name: {
    type: "string",
  },
  value: {
    type: "string",
  },
  label: {
    type: "string",
  },
  labelPosition: {
    control: "radio",
    options: ["right", "hidden"],
  },
  checkState: {
    control: "radio",
    options: ["unchecked", "indeterminate", "checked"],
  },
  disabled: {
    type: "boolean",
  },
  onChange: {
    name: "",
  },
  onClick: {
    name: "",
  },
} as const satisfies Meta<DaikinCheckboxStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinCheckboxStoryArgs>;
