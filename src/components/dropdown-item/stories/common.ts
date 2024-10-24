import type { DaikinDropdownItem } from "#package/components/dropdown-item/daikin-dropdown-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinDropdownItemStoryArgs
  extends Required<ElementProps<DaikinDropdownItem>> {
  onSelect: (event: Event) => void;
}

export const DAIKIN_DROPDOWN_ITEM_ARG_TYPES = {
  value: {
    type: "string",
  },
  disabled: {
    type: "boolean",
  },
  selected: {
    type: "boolean",
  },
} satisfies Meta<DaikinDropdownItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinDropdownItemStoryArgs>;
