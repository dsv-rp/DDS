import type { DaikinButton } from "#package/components/button/daikin-button";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinButtonStoryArgs
  extends Required<ElementProps<DaikinButton>> {
  /**
   * Text input for users
   */
  label: string;
}

export const DAIKIN_BUTTON_ARG_TYPES = {
  variant: {
    control: { type: "select" },
    options: ["primary", "secondary", "tertiary", "primaryDanger"],
  },
  disabled: { type: "boolean" },
  label: {
    type: "string",
  },
  size: {
    control: { type: "select" },
    options: ["default", "condensed"],
  },
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
      "Specify the left icon to be inserted in the icon. See `daikin-icon` component for available icons.",
    type: "string",
  },
  rightIcon: {
    description:
      "Specify the left right to be inserted in the icon. See `daikin-icon` component for available icons.",
    type: "string",
  },
} as const satisfies Meta<DaikinButtonStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinButtonStoryArgs>;
