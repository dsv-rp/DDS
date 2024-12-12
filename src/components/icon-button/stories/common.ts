import type { DaikinIconButton } from "#package/components/icon-button/daikin-icon-button";
import { iconList, type IconType } from "#package/components/icon/daikin-icon";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinIconButtonStoryArgs
  extends Required<ElementProps<DaikinIconButton>> {
  icon: IconType;
  onClick: (event: MouseEvent) => void;
}

export const DAIKIN_ICON_BUTTON_ARG_TYPES = {
  variant: {
    control: "radio",
    options: ["fill", "outline", "ghost"],
  },
  color: {
    control: "radio",
    options: ["default", "neutral", "danger"],
  },
  disabled: {
    type: "boolean",
  },
  href: {
    type: "string",
  },
  type: {
    control: "radio",
    options: ["button", "submit", "reset", "link"],
  },
  buttonAriaLabel: {
    type: "string",
  },
  buttonRole: {
    type: "string",
  },
  icon: {
    control: "select",
    options: iconList,
  },
  // Hide event listeners
  onClick: { name: "" },
} as const satisfies Meta<DaikinIconButtonStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinIconButtonStoryArgs>;
