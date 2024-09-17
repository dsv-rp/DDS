import type { DaikinListItem } from "#package/components/list-item/daikin-list-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinListItemStoryArgs
  extends Required<ElementProps<DaikinListItem>> {
  onClick: () => void;
}

export const DAIKIN_LIST_ITEM_ARG_TYPES = {
  type: {
    control: "radio",
    options: ["button", "link"],
  },
  href: {
    type: "string",
  },
  leftIcon: {
    type: "string",
  },
  disabled: {
    type: "boolean",
  },
} satisfies Meta<DaikinListItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinListItemStoryArgs>;
