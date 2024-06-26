import type { StoryObj } from "@storybook/web-components";
import type { DaikinButtonProps } from "../daikin-button";

export interface DaikinButtonStoryArgs extends Required<DaikinButtonProps> {
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
} as const;

type Story = StoryObj<DaikinButtonStoryArgs>;

export const Primary: Story = {
  args: {
    variant: "primary",
    disabled: false,
    label: "button",
    size: "default",
    type: "button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    disabled: false,
    label: "button",
    size: "default",
    type: "button",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    disabled: false,
    label: "button",
    size: "default",
    type: "button",
  },
};

export const PrimaryDanger: Story = {
  args: {
    variant: "primaryDanger",
    disabled: false,
    label: "button",
    size: "default",
    type: "button",
  },
};
