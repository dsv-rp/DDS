import type { IconType } from "#package/components/icon";
import type { DaikinIconButton } from "#package/components/icon-button/daikin-icon-button";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinIconButtonStoryArgs
  extends Required<ElementProps<DaikinIconButton>> {
  icon: IconType;
  onClick: (event: MouseEvent) => void;
}

export const DAIKIN_ICON_BUTTON_ARG_TYPES = {
  type: {
    control: "radio",
    options: ["button", "submit", "reset"],
  },
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
  buttonAriaLabel: {
    type: "string",
  },
  icon: {
    type: "string",
  },
  // Hide event listeners
  onClick: { name: "" },
} as const satisfies Meta<DaikinIconButtonStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinIconButtonStoryArgs>;