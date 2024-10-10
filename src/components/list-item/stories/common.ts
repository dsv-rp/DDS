import type { IconType } from "#package/components/icon";
import type { DaikinListItem } from "#package/components/list-item/daikin-list-item";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinListItemStoryArgs
  extends Required<ElementProps<DaikinListItem>> {
  leftIcon: IconType | null;
  rightIcon: IconType | null;
  hasSlot: boolean;
  onClick: (event: MouseEvent) => void;
}

export const DAIKIN_LIST_ITEM_ARG_TYPES = {
  type: {
    control: "radio",
    options: ["button", "link", "text"],
  },
  href: {
    type: "string",
  },
  leftIcon: {
    type: "string",
  },
  rightIcon: {
    type: "string",
  },
  disabled: {
    type: "boolean",
  },
  hasSlot: {
    type: "boolean",
  },
} satisfies Meta<DaikinListItemStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinListItemStoryArgs>;
