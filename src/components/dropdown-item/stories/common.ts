import type { DaikinDropdownItem } from "#package/components/dropdown-item/daikin-dropdown-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export type DaikinDropdownItemStoryArgs = Required<
  ElementProps<DaikinDropdownItem>
>;

export const DAIKIN_DROPDOWN_ITEM_ARG_TYPES = {
  value: {
    description: "Dropdown item value",
    type: "string",
  },
} satisfies Meta<DaikinDropdownItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinDropdownItemStoryArgs>;
