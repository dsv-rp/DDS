import type { DaikinButton } from "#package/components/button/daikin-button";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinButtonStoryArgs
  extends Required<ElementProps<DaikinButton>> {
  label: string;
  onClick: (event: MouseEvent) => void;
}

export const DAIKIN_BUTTON_ARG_TYPES = {
  variant: {
    control: "radio",
    options: ["fill", "outline", "ghost"],
  },
  color: {
    control: "radio",
    options: ["default", "danger"],
  },
  size: {
    control: "radio",
    options: ["small", "medium"],
  },
  label: {
    type: "string",
  },
  disabled: { type: "boolean" },
  href: {
    type: "string",
  },
  type: {
    control: "select",
    options: ["button", "submit", "reset", "link"],
  },
  role: {
    type: "string",
  },
  leftIcon: {
    type: "string",
  },
  rightIcon: {
    type: "string",
  },
} as const satisfies Meta<DaikinButtonStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinButtonStoryArgs>;
