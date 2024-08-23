import type { DaikinButton } from "#package/components/button/daikin-button";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinButtonStoryArgs
  extends Required<ElementProps<DaikinButton>> {
  /**
   * Text input for users
   */
  label: string;
  onClick: (event: Event) => void;
}

export const DAIKIN_BUTTON_ARG_TYPES = {
  variant: {
    control: { type: "radio" },
    options: ["solid", "outline", "ghost"],
  },
  color: {
    control: { type: "radio" },
    options: ["primary", "danger"],
  },
  size: {
    control: { type: "radio" },
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
    control: { type: "select" },
    options: ["button", "submit", "reset"],
  },
  role: {
    type: "string",
  },
  leftIcon: {
    description:
      "Specify the left icon to be inserted. See `daikin-icon` component for available icons.",
    type: "string",
  },
  rightIcon: {
    description:
      "Specify the right icon to be inserted. See `daikin-icon` component for available icons.",
    type: "string",
  },
} as const satisfies Meta<DaikinButtonStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinButtonStoryArgs>;
