import type { DaikinDropdown } from "#package/components/dropdown/daikin-dropdown";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinDropdownStoryArgs
  extends Required<ElementProps<DaikinDropdown>> {
  option: "default" | "single" | "many";
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
  option: {
    control: "radio",
    options: ["default", "single", "many"],
  },
} satisfies Meta<DaikinDropdownStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinDropdownStoryArgs>;
