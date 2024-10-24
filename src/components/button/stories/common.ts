import type { DaikinButton } from "#package/components/button/daikin-button";
import type { IconType } from "#package/components/icon";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinButtonStoryArgs
  extends Required<ElementProps<DaikinButton>> {
  label: string;
  leftIcon: IconType | null;
  rightIcon: IconType | null;
  onClick: (event: MouseEvent) => void;
}

export const DAIKIN_BUTTON_ARG_TYPES = {
  variant: {
    control: "radio",
    options: ["fill", "outline", "ghost"],
  },
  size: {
    control: "radio",
    options: ["small", "medium"],
  },
  color: {
    control: "radio",
    options: ["default", "danger"],
  },
  label: {
    type: "string",
  },
  disabled: { type: "boolean" },
  href: {
    type: "string",
  },
  type: {
    control: "radio",
    options: ["button", "submit", "reset", "link"],
  },
  buttonRole: {
    type: "string",
  },
  leftIcon: {
    type: "string",
  },
  rightIcon: {
    type: "string",
  },
  onClick: {
    name: "",
  },
} as const satisfies Meta<DaikinButtonStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinButtonStoryArgs>;
