import type { DaikinDropdown } from "#package/components/dropdown/daikin-dropdown";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinDropdownStoryArgs
  extends Required<ElementProps<DaikinDropdown>> {
  ariaLabel: string;
  onChange: () => void;
  onClick: () => void;
}

export const DAIKIN_DROPDOWN_ARG_TYPES = {
  label: {
    description: "Label text",
    type: "string",
  },
  size: {
    description: "Dropdown size",
    defaultValue: "medium",
    control: { type: "radio" },
    options: ["small", "medium"],
  },
  labelPosition: {
    description: "Where the label is located in terms of the dropdown",
    defaultValue: "top",
    control: { type: "radio" },
    options: ["top", "left"],
  },
  leftIcon: {
    description:
      "Icon to the left of the currently selected content. See `daikin-icon` component for available icons.",
    type: "string",
  },
  ariaLabel: {
    description: "Dropdown aria label",
    type: "string",
  },
  open: {
    description: "",
    type: "boolean",
  },
} satisfies Meta<DaikinDropdownStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinDropdownStoryArgs>;
