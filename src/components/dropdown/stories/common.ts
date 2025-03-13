import "#package/components/dropdown-item/daikin-dropdown-item";
import "#package/components/dropdown/daikin-dropdown";
import type { DaikinDropdown } from "#package/components/dropdown/daikin-dropdown";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinDropdownStoryArgs
  extends Required<ElementProps<DaikinDropdown>> {
  option: "default" | "single" | "many";
  __vrtMultipleValue__: "none" | "single" | "many" | null;
  onChange: (event: Event) => void;
  onClick: (event: Event) => void;
}

export const DAIKIN_DROPDOWN_ARG_TYPES = {
  value: {
    type: "string",
  },
  placeholder: {
    type: "string",
  },
  open: {
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
  multiple: {
    type: "boolean",
  },
  maxLabels: {
    type: "number",
  },
  selectedOptions: {
    control: "object",
  },
  option: {
    control: "radio",
    options: ["default", "single", "many"],
  },
  __vrtMultipleValue__: {
    name: "",
    control: "radio",
    options: ["none", "single", "many"],
  },
} satisfies Meta<DaikinDropdownStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinDropdownStoryArgs>;
