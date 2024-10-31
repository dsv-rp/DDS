import type { IconType } from "#package/components/icon";
import type { DaikinIconButton } from "#package/components/icon-button/daikin-icon-button";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinIconButtonStoryArgs
  extends Required<ElementProps<DaikinIconButton>> {
  label: string;
  icon: IconType | null;
  onClick: (event: MouseEvent) => void;
}

export const DAIKIN_ICON_BUTTON_ARG_TYPES = {
  variant: {
    control: "radio",
    options: ["fill", "outline", "ghost"],
  },
  color: {
    control: "radio",
    options: ["default", "danger", "neutral"],
  },
  disabled: { type: "boolean" },
  type: {
    control: "radio",
    options: ["button", "submit", "reset"],
  },
  icon: {
    type: "string",
  },
  // Hide event listeners
  onClick: { name: "" },
} as const satisfies Meta<DaikinIconButtonStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinIconButtonStoryArgs>;
