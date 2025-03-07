import type { DaikinAvatar } from "#package/components/avatar/daikin-avatar";
import type { ElementProps } from "#storybook";
import type { Meta, StoryObj } from "@storybook/web-components";

export interface DaikinAvatarStoryArgs
  extends Required<ElementProps<DaikinAvatar>> {
  onClick: (event: MouseEvent) => void;
}

export const DAIKIN_AVATAR_ARG_TYPES = {
  size: {
    control: "radio",
    options: ["small", "large"],
  },
  type: {
    control: "radio",
    options: ["icon", "button", "link"],
  },
  href: {
    type: "string",
  },
  alt: {
    type: "string",
  },
  disabled: { type: "boolean" },
  // Hide event listeners
  onClick: { name: "" },
} as const satisfies Meta<DaikinAvatarStoryArgs>["argTypes"];

export type Story = StoryObj<DaikinAvatarStoryArgs>;
