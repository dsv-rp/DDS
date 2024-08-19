import type { DaikinDropdown } from "#package/components/dropdown/daikin-dropdown";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinDropdownStoryArgs
  extends Required<ElementProps<DaikinDropdown>> {
  option: "default" | "single" | "multiple";
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
  value: {
    description: "Value of dropdown",
    type: "string",
  },
  labelPosition: {
    description: "Where the label is located in terms of the dropdown",
    defaultValue: "top",
    control: { type: "radio" },
    options: ["top", "left", "hidden"],
  },
  leftIcon: {
    description:
      "Icon to the left of the currently selected content. See `daikin-icon` component for available icons.",
    type: "string",
  },
  open: {
    description: "Whether or not a drop-down menu is displayed",
    type: "boolean",
  },
  disabled: {
    description: "Whether the dropdown is disabled",
    type: "boolean",
  },
  option: {
    description: "Specify the number of options on the storybook",
    defaultValue: "default",
    control: { type: "radio" },
    options: ["default", "single", "multiple"],
  },
} satisfies Meta<DaikinDropdownStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinDropdownStoryArgs>;
